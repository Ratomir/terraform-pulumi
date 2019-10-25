data "azurerm_client_config" "current" {}

data "azurerm_subscription" "current" {}

data "azurerm_cosmosdb_account" "blog" {
  name                = "blog-cosmos-db"
  resource_group_name = "${var.rg_name}"
}

data "azurerm_application_insights" "blog-api-ai" {
  name                = "blog-api-ai"
  resource_group_name = "${azurerm_resource_group.blog.name}"
}

data "azurerm_azuread_service_principal" "blog_app" {
  display_name = "blog-app"
}
