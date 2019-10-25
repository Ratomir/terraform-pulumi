##############################################
############ Azure Cosmos DB #################
##############################################

resource "azurerm_cosmosdb_account" "blog" {
  name                = "blog-cosmos-db"
  location            = "${azurerm_resource_group.blog.location}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  offer_type          = "Standard"
  kind                = "MongoDB"

  enable_automatic_failover = false

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = "North Europe"
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_mongo_database" "blog" {
  name                = "${var.mongodb_db_name}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  account_name        = "${azurerm_cosmosdb_account.blog.name}"
}
