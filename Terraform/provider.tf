#Set the Provider
provider "azurerm" {
  version         = ">= 1.34.0" #Use the last version tested through an Azure DevOps pipeline here : https://dev.azure.com/jamesdld23/vpc_lab/_build
  subscription_id = "${var.subscription_id}"
  client_id       = "${var.client_id}"
  client_secret   = "${var.client_secret}"
  tenant_id       = "${var.tenant_id}"
}
