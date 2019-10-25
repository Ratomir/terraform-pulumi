resource "azurerm_key_vault_access_policy" "blog_terraform" {
  key_vault_id = "${azurerm_key_vault.blog.id}"

  tenant_id = "${data.azurerm_client_config.current.tenant_id}"
  object_id = "${data.azurerm_client_config.current.service_principal_object_id}"
  #   application_id = "${var.client_id}"

  certificate_permissions = [
    "create",
    "delete",
    "deleteissuers",
    "get",
    "getissuers",
    "import",
    "list",
    "listissuers",
    "managecontacts",
    "manageissuers",
    "setissuers",
    "update",
  ]

  key_permissions = [
    "create",
    "get",
  ]

  secret_permissions = [
    "get",
    "list",
    "set",
    "delete"
  ]
}

resource "azurerm_key_vault_access_policy" "blog_ratomir" {
  key_vault_id = "${azurerm_key_vault.blog.id}"

  tenant_id = "${data.azurerm_client_config.current.tenant_id}"
  object_id = "${var.user_admin}"

  certificate_permissions = [
    "create",
    "delete",
    "deleteissuers",
    "get",
    "getissuers",
    "import",
    "list",
    "listissuers",
    "managecontacts",
    "manageissuers",
    "setissuers",
    "update",
  ]

  key_permissions = [
    "create",
    "get",
  ]

  secret_permissions = [
    "get",
    "list",
    "set",
    "delete"
  ]
}

resource "azurerm_key_vault_access_policy" "blog_app_service" {
  key_vault_id = "${azurerm_key_vault.blog.id}"

  tenant_id = "${data.azurerm_client_config.current.tenant_id}"
  object_id = "${data.azurerm_azuread_service_principal.blog_app.object_id}"

  certificate_permissions = [
    "get",
    "getissuers",
    "list",
    "listissuers",
  ]

  key_permissions = [
    "get",
    "list",
  ]

  secret_permissions = [
    "get",
    "list",
  ]
}
