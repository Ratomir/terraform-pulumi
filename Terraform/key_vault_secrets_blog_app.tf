
resource "azurerm_key_vault_secret" "blog-app-instance" {
  name         = "blog-app-instance"
  value        = "https://login.microsoftonline.com/"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog-app-app-id" {
  name         = "blog-app-app-id"
  value        = "${data.azurerm_azuread_service_principal.blog_app.application_id}"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog-app-tenant-id" {
  name         = "blog-app-tenant-id"
  value        = "${var.tenant_id}"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog-app-secret" {
  name         = "blog-app-secret"
  value        = "XXXX"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}