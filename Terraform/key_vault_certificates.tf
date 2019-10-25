resource "azurerm_key_vault_certificate" "blog" {
  # depends_on = [azurerm_key_vault_access_policy.blog_terraform]
  name         = "ratomirvukadin-cert"
  key_vault_id = "${azurerm_key_vault.blog.id}"

  certificate {
    contents = "${filebase64("XXX.pfx")}"
    password = "XXX"
  }

  certificate_policy {
    issuer_parameters {
      name = "Self"
    }

    key_properties {
      exportable = true
      key_size   = 2048
      key_type   = "RSA"
      reuse_key  = false
    }

    secret_properties {
      content_type = "application/x-pkcs12"
    }
  }
}