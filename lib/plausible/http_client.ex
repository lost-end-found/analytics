defmodule Plausible.HTTPClient.Non200Error do
  defstruct reason: nil

  @type t :: %__MODULE__{reason: Finch.Response.t()}

  @spec new(Finch.Response.t()) :: t()
  def new(%Finch.Response{status: status} = response)
      when is_integer(status) and (status < 200 or status >= 300) do
    %__MODULE__{reason: response}
  end
end

defmodule Plausible.HTTPClient.Interface do
  @type url() :: Finch.Request.url()
  @type headers() :: Finch.Request.headers()
  @type params() :: Finch.Request.body() | map()
  @type response() ::
          {:ok, Finch.Response.t()}
          | {:error, Mint.Types.error() | Finch.Error.t() | Plausible.HTTPClient.Non200Error.t()}

  @callback get(url(), headers()) :: response()
  @callback get(url()) :: response()
  @callback post(url(), headers(), params()) :: response()
end

defmodule Plausible.HTTPClient do
  @moduledoc """
  HTTP Client built on top of Finch.

  By default, request parameters are json-encoded.

  If a raw binary value is supplied, no encoding is performed.
  If x-www-form-urlencoded content-type is set in headers,
  URL encoding is invoked.
  """

  @doc """
  Make a POST request
  """
  @behaviour Plausible.HTTPClient.Interface

  @impl Plausible.HTTPClient.Interface
  def post(url, headers \\ [], params \\ nil) do
    call(:post, url, headers, params)
  end

  @doc """
  Make a GET request
  """
  @impl Plausible.HTTPClient.Interface
  def get(url, headers \\ []) do
    call(:get, url, headers, nil)
  end

  # TODO: Is it possible to tell the type checker that we're returning a module that conforms to the
  # Plausible.HTTPClient.Interface behaviour?
  @spec impl() :: Plausible.HTTPClient
  def impl() do
    Application.get_env(:plausible, :http_impl, __MODULE__)
  end

  defp call(method, url, headers, params) do
    {params, headers} = maybe_encode_params(params, headers)

    method
    |> build_request(url, headers, params)
    |> do_request()
    |> maybe_decode_body()
    |> tag_error()
  end

  defp build_request(method, url, headers, params) do
    Finch.build(method, url, headers, params)
  end

  defp do_request(request) do
    Finch.request(request, Plausible.Finch)
  end

  defp maybe_decode_body({:ok, %{headers: headers, body: body} = resp})
       when is_binary(body) and body != "" do
    if json?(headers) do
      {:ok, update_in(resp.body, &Jason.decode!/1)}
    else
      {:ok, resp}
    end
  end

  defp maybe_decode_body(response), do: response

  defp maybe_encode_params(params, headers) when is_binary(params) or is_nil(params) do
    {params, headers}
  end

  defp maybe_encode_params(params, headers) when is_map(params) do
    content_type =
      Enum.find_value(headers, "", fn {k, v} ->
        if String.downcase(k) == "content-type" do
          v
        end
      end)

    case String.downcase(content_type) do
      "application/x-www-form-urlencoded" ->
        {URI.encode_query(params), headers}

      "application/json" ->
        {Jason.encode!(params), headers}

      _ ->
        {Jason.encode!(params), [{"content-type", "application/json"} | headers]}
    end
  end

  defp tag_error({:ok, %Finch.Response{status: status}} = ok)
       when is_integer(status) and status >= 200 and status < 300 do
    ok
  end

  defp tag_error({:ok, %Finch.Response{status: _} = response}) do
    {:error, Plausible.HTTPClient.Non200Error.new(response)}
  end

  defp tag_error({:error, _} = error) do
    error
  end

  defp json?(headers) do
    found =
      Enum.find(headers, fn
        {"content-type", "application/json" <> _} ->
          true

        _ ->
          false
      end)

    is_tuple(found)
  end
end
