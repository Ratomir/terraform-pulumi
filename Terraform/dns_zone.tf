resource "azurerm_dns_zone" "blog" {
  name                = "ratomirvukadin.com"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  # zone_type           = "Public"
}

resource "azurerm_dns_mx_record" "blog" {
  name                = "@"
  zone_name           = "${azurerm_dns_zone.blog.name}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  ttl                 = 1

  record {
    preference = 10
    exchange   = "mx1.privateemail.com"
  }

  record {
    preference = 10
    exchange   = "mx1.privateemail.com"
  }

}

resource "azurerm_dns_txt_record" "blog" {
  name                = "@"
  zone_name           = "${azurerm_dns_zone.blog.name}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  ttl                 = 1

  record {
    value = "v=spf1 include:spf.privateemail.com ~all"
  }
}

resource "azurerm_dns_cname_record" "blog" {
  name                = "www"
  zone_name           = "${azurerm_dns_zone.blog.name}"
  resource_group_name = "${azurerm_resource_group.blog.name}"
  ttl                 = 1
  record              = "${azurerm_app_service.blog-frontend.name}.azurewebsites.net"
}
