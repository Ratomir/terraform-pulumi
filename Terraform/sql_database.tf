##############################################
######### Azure SQL Server/Database ##########
##############################################

resource "azurerm_sql_server" "blog" {
  name                         = "blog-rvs-sql-server"
  resource_group_name          = "${azurerm_resource_group.blog.name}"
  location                     = "${azurerm_resource_group.blog.location}"
  version                      = "12.0"
  administrator_login          = "${var.sql_database_username}"
  administrator_login_password = "${var.sql_database_password}"
}

resource "azurerm_sql_database" "blog" {
  name                = "IdentityDatabase"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  location            = "${azurerm_resource_group.blog.location}"
  server_name         = "${azurerm_sql_server.blog.name}"
  create_mode         = "Default"
  edition             = "Basic"
}

resource "azurerm_sql_firewall_rule" "blog" {
  name                = "Ratomir ip address"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  server_name         = "${azurerm_sql_server.blog.name}"
  start_ip_address    = "${var.ratomirip}"
  end_ip_address      = "${var.ratomirip}"
}

# resource "azurerm_sql_firewall_rule" "blog_allow_access_azservices" {
#   name                = "Ratomir ip address"
#   resource_group_name = "${azurerm_resource_group.blog.name}"
#   server_name         = "${azurerm_sql_server.blog.name}"
#   start_ip_address    = "0.0.0.0"
#   end_ip_address      = "0.0.0.0"
# }

resource "azurerm_sql_active_directory_administrator" "blog" {
  server_name         = "${azurerm_sql_server.blog.name}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  login               = "${var.adminemail}"
  tenant_id           = "${data.azurerm_client_config.current.tenant_id}"
  object_id           = "${var.user_admin}"
}
