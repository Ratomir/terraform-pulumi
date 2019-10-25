resource "azurerm_key_vault_secret" "blog_mongodb" {
  name         = "mongodb"
  value        = "mongodb://${azurerm_cosmosdb_account.blog.name}:${data.azurerm_cosmosdb_account.blog.primary_master_key}@${azurerm_cosmosdb_account.blog.name}.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog_ai" {
  name         = "apiai"
  value        = "${data.azurerm_application_insights.blog-api-ai.instrumentation_key}"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog_sql_db_identity" {
  name         = "sqldbidentity"
  value        = "Server=tcp:blog-rvs-sql-server.database.windows.net,1433;Initial Catalog=IdentityDatabase;Persist Security Info=False;User ID=${var.sql_database_username};Password=${var.sql_database_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog_google_secret" {
  name         = "googlesecret"
  value        = "XXXX"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog_signing_key" {
  name         = "signingkey"
  value        = "XXX"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

resource "azurerm_key_vault_secret" "blog_mongodb_name" {
  name         = "mongodbname"
  value        = "${var.mongodb_db_name}"
  key_vault_id = "${azurerm_key_vault.blog.id}"
}

