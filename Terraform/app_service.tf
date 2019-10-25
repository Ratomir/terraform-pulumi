##############################################
############ App Service App/Plan ############
##############################################

resource "azurerm_app_service_plan" "blog" {
  name                = "blog-api-asp"
  location            = "${azurerm_resource_group.blog.location}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "blog-api" {
  name                = "blog-api-rvs"
  location            = "${azurerm_resource_group.blog.location}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  app_service_plan_id = "${azurerm_app_service_plan.blog.id}"

  https_only = true

  site_config {
    always_on       = true
    min_tls_version = "1.2"
  }

}

resource "azurerm_app_service" "blog-frontend" {
  name                = "blog-frontend-rvs"
  location            = "${azurerm_resource_group.blog.location}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  app_service_plan_id = "${azurerm_app_service_plan.blog.id}"

  https_only = true

  site_config {
    always_on       = true
    min_tls_version = "1.2"
  }
}

resource "azurerm_app_service_custom_hostname_binding" "blog" {
  hostname            = "www.ratomirvukadin.com"
  app_service_name    = "${azurerm_app_service.blog-frontend.name}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
}

resource "azurerm_app_service_certificate" "blog" {
  name                = "www.ratomirvukadin.com"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  location            = "${azurerm_resource_group.blog.location}"
  pfx_blob            = "${filebase64("XXX.pfx")}"
  password            = "XXX"
  # key_vault_id        = "${azurerm_key_vault.blog.id}"
  # key_vault_secret_id = "${azurerm_key_vault_certificate.blog.id}"
}
