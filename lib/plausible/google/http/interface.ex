defmodule Plausible.Google.HTTP.Interface do
  @callback get_report(Plausible.Google.ReportRequest.t()) ::
              {:ok, {[map()], String.t() | nil}} | {:error, any()}

  @callback list_sites(String.t()) ::
              {:ok, map()} | Plausible.HTTPClient.error()

  @callback fetch_access_token(String.t()) :: {:ok, map()}

  @callback list_views_for_user(String.t()) :: {:ok, map()} | Plausible.HTTPClient.error()

  @callback list_stats(String.t(), String.t(), Date.Range.t(), pos_integer(), map() | nil) ::
              {:ok, map()} | Plausible.HTTPClient.error()

  @callback refresh_auth_token(String.t()) ::
              {:ok, map()} | {:error, String.t()} | {:error, :unknown}

  @callback get_analytics_start_date(String.t(), String.t()) ::
              {:ok, NaiveDateTime.t()} | {:error, any()}
end
