defmodule Plausible.Google.HTTP do
  require Logger
  alias Plausible.HTTPClient

  @spec get_report(module(), Plausible.Google.ReportRequest.t()) ::
          {:ok, {[map()], String.t() | nil}} | {:error, any()}
  def get_report(http_client, %Plausible.Google.ReportRequest{} = report_request) do
    params =
      Jason.encode!(%{
        reportRequests: [
          %{
            viewId: report_request.view_id,
            dateRanges: [
              %{
                startDate: report_request.date_range.first,
                endDate: report_request.date_range.last
              }
            ],
            dimensions: Enum.map(report_request.dimensions, &%{name: &1, histogramBuckets: []}),
            metrics: Enum.map(report_request.metrics, &%{expression: &1}),
            hideTotals: true,
            hideValueRanges: true,
            orderBys: [%{fieldName: "ga:date", sortOrder: "DESCENDING"}],
            pageSize: report_request.page_size,
            pageToken: report_request.page_token
          }
        ]
      })

    response =
      :post
      |> Finch.build(
        "#{reporting_api_url()}/v4/reports:batchGet",
        [{"Authorization", "Bearer #{report_request.access_token}"}],
        params
      )
      |> http_client.request(Plausible.Finch, receive_timeout: 60_000)

    with {:ok, %{status: 200, body: body}} <- response,
         {:ok, report} <- parse_report_from_response(body),
         token <- Map.get(report, "nextPageToken"),
         {:ok, report} <- convert_to_maps(report) do
      {:ok, {report, token}}
    else
      {:ok, %{status: _non_http_200, body: body}} ->
        Sentry.Context.set_extra_context(%{google_analytics_response: body})
        {:error, :request_failed}

      {:error, cause} ->
        {:error, cause}
    end
  end

  defp parse_report_from_response(raw_body) do
    with {:ok, map} <- Jason.decode(raw_body),
         %{"reports" => [report | _]} <- map do
      {:ok, report}
    else
      {:error, cause} ->
        Logger.error("Google Analytics: Failed to parse JSON. Reason: #{inspect(cause)}")
        Sentry.Context.set_extra_context(%{google_analytics_response: raw_body})
        {:error, cause}

      %{} = response ->
        Logger.error(
          "Google Analytics: Failed to find report in response. Reason: #{inspect(response)}"
        )

        Sentry.Context.set_extra_context(%{google_analytics_response: response})
        {:error, {:invalid_response, response}}
    end
  end

  defp convert_to_maps(%{
         "data" => %{} = data,
         "columnHeader" => %{
           "dimensions" => dimension_headers,
           "metricHeader" => %{"metricHeaderEntries" => metric_headers}
         }
       }) do
    metric_headers = Enum.map(metric_headers, & &1["name"])
    rows = Map.get(data, "rows", [])

    report =
      Enum.map(rows, fn %{"dimensions" => dimensions, "metrics" => [%{"values" => metrics}]} ->
        metrics = Enum.zip(metric_headers, metrics)
        dimensions = Enum.zip(dimension_headers, dimensions)
        %{metrics: Map.new(metrics), dimensions: Map.new(dimensions)}
      end)

    {:ok, report}
  end

  defp convert_to_maps(response) do
    Logger.error(
      "Google Analytics: Failed to read report in response. Reason: #{inspect(response)}"
    )

    Sentry.Context.set_extra_context(%{google_analytics_response: response})
    {:error, {:invalid_response, response}}
  end

  def list_sites(access_token) do
    url = "#{api_url()}/webmasters/v3/sites"
    headers = [{"Content-Type", "application/json"}, {"Authorization", "Bearer #{access_token}"}]

    case HTTPClient.get(url, headers) do
      {:ok, %{body: body}} ->
        {:ok, body}

      {:error, %{reason: %{status: s}}} when s in [401, 403] ->
        {:error, "integration_error"}

      {:error, %{reason: %{body: %{"error" => error}}}} ->
        {:error, error}

      {:error, reason} = e ->
        Logger.error("Google Analytics: failed to list sites: #{inspect(reason)}")
        e
    end
  end

  def fetch_access_token(code) do
    url = "#{api_url()}/oauth2/v4/token"
    headers = [{"Content-Type", "application/x-www-form-urlencoded"}]

    params = %{
      client_id: client_id(),
      client_secret: client_secret(),
      code: code,
      grant_type: :authorization_code,
      redirect_uri: redirect_uri()
    }

    {:ok, response} = HTTPClient.post(url, headers, params)

    response.body
  end

  def list_views_for_user(access_token) do
    url = "#{api_url()}/analytics/v3/management/accounts/~all/webproperties/~all/profiles"

    headers = [{"Authorization", "Bearer #{access_token}"}]

    case HTTPClient.get(url, headers) do
      {:ok, %Finch.Response{body: body, status: 200}} ->
        {:ok, body}

      {:error, %{reason: %Finch.Response{body: body}}} ->
        Sentry.capture_message("Error fetching Google view ID", extra: %{body: inspect(body)})
        {:error, body}

      {:error, %{reason: reason} = e} ->
        Sentry.capture_message("Error fetching Google view ID", extra: %{error: inspect(e)})
        {:error, reason}
    end
  end

  def list_stats(access_token, property, date_range, limit, page \\ nil) do
    property = URI.encode_www_form(property)

    filter_groups =
      if page do
        url = property_base_url(property)
        [%{filters: [%{dimension: "page", expression: "https://#{url}#{page}"}]}]
      else
        %{}
      end

    params = %{
      startDate: Date.to_iso8601(date_range.first),
      endDate: Date.to_iso8601(date_range.last),
      dimensions: ["query"],
      rowLimit: limit,
      dimensionFilterGroups: filter_groups
    }

    url = "#{api_url()}/webmasters/v3/sites/#{property}/searchAnalytics/query"
    headers = [{"Authorization", "Bearer #{access_token}"}]

    case HTTPClient.post(url, headers, params) do
      {:ok, %Finch.Response{body: body, status: 200}} ->
        {:ok, body}

      {:error, %{reason: %Finch.Response{body: _body, status: status}}}
      when status in [401, 403] ->
        {:error,
         """
         Your Search Console account hasn't been connected successfully. 
         Please click below to connect your Search Console account.
         """}

      {:error, _} ->
        {:error,
         """
         We cannot show the search terms as Search Console is temporarily unavailable. Please try again in a few minutes.
         """}
    end
  end

  defp property_base_url("sc-domain:" <> domain), do: "https://" <> domain
  defp property_base_url(url), do: url

  def refresh_auth_token(refresh_token) do
    url = "#{api_url()}/oauth2/v4/token"
    headers = [{"content-type", "application/x-www-form-urlencoded"}]

    params = %{
      client_id: client_id(),
      client_secret: client_secret(),
      refresh_token: refresh_token,
      grant_type: :refresh_token,
      redirect_uri: redirect_uri()
    }

    case HTTPClient.post(url, headers, params) do
      {:ok, %Finch.Response{body: body, status: 200}} ->
        {:ok, body}

      {:error, %{reason: %Finch.Response{body: %{"error" => error}, status: _non_http_200}}} ->
        {:error, error}

      {:error, %{reason: _} = e} ->
        Sentry.capture_message("Error fetching Google queries", extra: %{error: inspect(e)})
        {:error, :unknown_error}
    end
  end

  @earliest_valid_date "2005-01-01"
  def get_analytics_start_date(view_id, access_token) do
    params = %{
      reportRequests: [
        %{
          viewId: view_id,
          dateRanges: [
            %{startDate: @earliest_valid_date, endDate: Date.to_iso8601(Timex.today())}
          ],
          dimensions: [%{name: "ga:date", histogramBuckets: []}],
          metrics: [%{expression: "ga:pageviews"}],
          hideTotals: true,
          hideValueRanges: true,
          orderBys: [%{fieldName: "ga:date", sortOrder: "ASCENDING"}],
          pageSize: 1
        }
      ]
    }

    url = "#{reporting_api_url()}/v4/reports:batchGet"
    headers = [{"Authorization", "Bearer #{access_token}"}]

    case HTTPClient.post(url, headers, params) do
      {:ok, %Finch.Response{body: body, status: 200}} ->
        report = List.first(body["reports"])

        date =
          case report["data"]["rows"] do
            [%{"dimensions" => [date_str]}] ->
              Timex.parse!(date_str, "%Y%m%d", :strftime) |> NaiveDateTime.to_date()

            _ ->
              nil
          end

        {:ok, date}

      {:error, %{reason: %Finch.Response{body: body}}} ->
        Sentry.capture_message("Error fetching Google view ID", extra: %{body: inspect(body)})
        {:error, body}

      {:error, %{reason: reason} = e} ->
        Sentry.capture_message("Error fetching Google view ID", extra: %{error: inspect(e)})
        {:error, reason}
    end
  end

  defp config, do: Application.get_env(:plausible, :google)
  defp client_id, do: Keyword.fetch!(config(), :client_id)
  defp client_secret, do: Keyword.fetch!(config(), :client_secret)
  defp reporting_api_url, do: Keyword.fetch!(config(), :reporting_api_url)
  defp api_url, do: Keyword.fetch!(config(), :api_url)
  defp redirect_uri, do: PlausibleWeb.Endpoint.url() <> "/auth/google/callback"
end
