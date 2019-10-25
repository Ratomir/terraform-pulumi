resource "azurerm_container_registry" "blog" {
  name                = "rvscontainerregistry"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  location            = "${azurerm_resource_group.blog.location}"
  sku                 = "Basic"
  admin_enabled       = false
}
