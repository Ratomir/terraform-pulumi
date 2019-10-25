resource "azurerm_key_vault" "blog" {
  name                            = "blog-rvs-kv"
  location                        = "${azurerm_resource_group.blog.location}"
  resource_group_name             = "${azurerm_resource_group.blog.name}"
  enabled_for_deployment          = true
  enabled_for_template_deployment = true
  enabled_for_disk_encryption     = true
  tenant_id                       = "${data.azurerm_client_config.current.tenant_id}"
  sku_name                        = "standard"

  network_acls {
    default_action = "Allow"
    bypass         = "AzureServices"
  }

  tags = {
    environment = "Dev"
  }
}
