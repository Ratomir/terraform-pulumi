variable "subscription_id" {
  type        = "string"
  default     = "XXX"
  description = "Azure subscription Id."
}

# tenant
variable "tenant_id" {
  type        = "string"
  default     = "XXX"
  description = "Azure tenant Id."
}

# appId
variable "client_id" {
  type        = "string"
  default     = "XXX"
  description = "Azure service principal application Id"
}

# password
variable "client_secret" {
  type        = "string"
  default     = "XXX"
  description = "Azure service principal application Secret"
}

variable "rg_name" {
  type        = "string"
  default     = "XXX"
  description = "Resource group name"
}

variable "sql_database_username" {
  type    = "string"
  default = "XXX"
}

variable "sql_database_password" {
  type    = "string"
  default = "XXX"
}

variable "user_admin" {
  type    = "string"
  default = "XXXX"
}

variable "mongodb_db_name" {
  type    = "string"
  default = "XXX"
}

variable "ratomirip" {
  type    = "string"
  default = "XXX"
}

variable "adminemail" {
  type    = "string"
  default = "XXX"
}

