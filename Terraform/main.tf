resource "azurerm_resource_group" "blog" {
  name     = "${var.rg_name}"
  location = "West Europe"
}

