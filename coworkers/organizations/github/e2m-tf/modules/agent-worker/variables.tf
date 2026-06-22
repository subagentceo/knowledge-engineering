variable "account_id" {
  type = string
}

variable "name" {
  type = string
}

variable "script_file" {
  description = "Path to the Worker module script (.js)."
  type        = string
}

variable "kv_binding" {
  description = "Optional KV binding name; empty string = no KV."
  type        = string
  default     = ""
}

variable "compatibility_date" {
  type    = string
  default = "2025-06-01"
}

variable "compatibility_flags" {
  type    = list(string)
  default = ["nodejs_compat"]
}
