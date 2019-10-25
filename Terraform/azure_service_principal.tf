resource "azurerm_azuread_application" "blog_service_app" {
  name                       = "blog-app"
  homepage                   = "https://homepage"
  identifier_uris            = ["http://localhost:21509/"]
  reply_urls                 = ["http://localhost:21509/signin-oidc"]
  available_to_other_tenants = false
  oauth2_allow_implicit_flow = true
}

resource "azurerm_azuread_service_principal" "blog_service_principal" {
  application_id = "${azurerm_azuread_application.blog_service_app.application_id}"
}

resource "azurerm_azuread_service_principal_password" "blog_service_app_password" {
  service_principal_id = "${azurerm_azuread_service_principal.blog_service_principal.id}"
  value                = "A-sB?zd9Apu_M1_rScSDXo15tRwGJm/:"
  end_date             = "2021-10-04T01:02:03Z"
}
