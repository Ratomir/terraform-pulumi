resource "azurerm_application_insights" "blog" {
  name                = "blog-api-ai"
  location            = "${azurerm_resource_group.blog.location}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  application_type    = "web"
}