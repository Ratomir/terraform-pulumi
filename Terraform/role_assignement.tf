resource "azurerm_role_assignment" "blog_terraform_api" {
  scope                = "/subscriptions/${var.subscription_id}/resourcegroups/${var.rg_name}/providers/microsoft.keyvault/vaults/${azurerm_key_vault.blog.name}"
  role_definition_name = "Contributor"
  principal_id         = "${data.azurerm_client_config.current.service_principal_object_id}"
}

resource "azurerm_role_assignment" "blog_app" {
  scope                = "/subscriptions/${var.subscription_id}/resourcegroups/${var.rg_name}/providers/microsoft.keyvault/vaults/${azurerm_key_vault.blog.name}"
  role_definition_name = "Contributor"
  principal_id         = "${data.azurerm_azuread_service_principal.blog_app.object_id}"
}