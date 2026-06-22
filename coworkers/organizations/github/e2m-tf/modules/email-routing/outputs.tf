output "addresses" {
  value = [for r in var.roles : "${r}@${var.domain}"]
}
