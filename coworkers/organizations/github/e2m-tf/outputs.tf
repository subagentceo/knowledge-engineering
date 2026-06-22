output "role_addresses" {
  description = "The live inbox addresses."
  value       = module.role_email.addresses
}

output "inbox_kv_namespace_id" {
  description = "KV namespace backing the inbound queue."
  value       = module.agent_inbox.kv_namespace_id
}
