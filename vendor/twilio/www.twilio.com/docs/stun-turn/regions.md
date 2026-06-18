# STUN-TURN IP Addresses & Ports

Twilio STUN and TURN servers originate and terminate from specific ranges of static IP addresses across the Twilio regions/edge locations. To let your network communicate with Twilio or to apply Quality of Service routing rules, allow the IP ranges for your geographic location.

## Open IP ranges in Twilio regions/edge locations

### Australia `sydney` IP ranges

| CIDR block         | IP lower bound  | IP upper bound   | Addresses |
| ------------------ | --------------- | ---------------- | --------- |
| `3.25.42.128/25`   | `3.25.42.128`   | `3.25.42.255`    | 128       |
| `13.210.2.128/27`  | `13.210.2.128`  | `13.210.2.159`   | 32        |
| `54.252.254.64/26` | `54.252.254.64` | `54.252.254.127` | 64        |

### Brazil `sao-paulo` IP ranges

| CIDR block          | IP lower bound   | IP upper bound   | Addresses |
| ------------------- | ---------------- | ---------------- | --------- |
| `18.230.125.0/25`   | `18.230.125.0`   | `18.230.125.127` | 128       |
| `18.231.105.32/27`  | `18.231.105.32`  | `18.231.105.63`  | 32        |
| `177.71.206.192/26` | `177.71.206.192` | `177.71.206.255` | 64        |

### Germany `frankfurt` IP ranges

| CIDR block         | IP lower bound  | IP upper bound  | Addresses |
| ------------------ | --------------- | --------------- | --------- |
| `18.156.18.128/25` | `18.156.18.128` | `18.156.18.255` | 128       |
| `18.195.48.224/27` | `18.195.48.224` | `18.195.48.255` | 32        |
| `52.59.186.0/27`   | `52.59.186.0`   | `52.59.186.31`  | 32        |

### India `mumbai` IP ranges

| CIDR block        | IP lower bound | IP upper bound  | Addresses |
| ----------------- | -------------- | --------------- | --------- |
| `3.7.35.128/25`   | `3.7.35.128`   | `3.7.35.255`    | 128       |
| `52.66.193.96/27` | `52.66.193.96` | `52.66.193.127` | 32        |
| `52.66.194.0/26`  | `52.66.194.0`  | `52.66.194.63`  | 64        |

### Ireland `dublin` IP ranges

| CIDR block          | IP lower bound   | IP upper bound   | Addresses |
| ------------------- | ---------------- | ---------------- | --------- |
| `3.249.63.128/25`   | `3.249.63.128`   | `3.249.63.255`   | 128       |
| `54.171.127.192/26` | `54.171.127.192` | `54.171.127.255` | 64        |
| `52.215.127.0/24`   | `52.215.127.0`   | `52.215.127.255` | 256       |
| `52.215.253.0/26`   | `52.215.253.0`   | `52.215.253.63`  | 64        |

### Japan `tokyo` IP ranges

| CIDR block          | IP lower bound   | IP upper bound   | Addresses |
| ------------------- | ---------------- | ---------------- | --------- |
| `13.115.244.0/27`   | `13.115.244.0`   | `13.115.244.31`  | 32        |
| `18.180.220.128/25` | `18.180.220.128` | `18.180.220.255` | 128       |
| `54.65.63.192/26`   | `54.65.63.192`   | `54.65.63.255`   | 64        |

### Singapore `singapore` IP ranges

| CIDR block          | IP lower bound   | IP upper bound   | Addresses |
| ------------------- | ---------------- | ---------------- | --------- |
| `13.229.255.0/27`   | `13.229.255.0`   | `13.229.255.31`  | 32        |
| `18.141.157.128/25` | `18.141.157.128` | `18.141.157.255` | 128       |
| `54.169.127.128/26` | `54.169.127.128` | `54.169.127.191` | 64        |

### US East Coast (Virginia) `ashburn` IP ranges

| CIDR block         | IP lower bound  | IP upper bound   | Addresses |
| ------------------ | --------------- | ---------------- | --------- |
| `3.235.111.128/25` | `3.235.111.128` | `3.235.111.255`  | 128       |
| `34.203.250.0/23`  | `34.203.250.0`  | `34.203.251.255` | 512       |
| `34.203.254.0/24`  | `34.203.254.0`  | `34.203.254.255` | 256       |
| `54.172.60.0/23`   | `54.172.60.0`   | `54.172.61.255`  | 512       |

### US West Coast (Oregon) `umatilla` IP ranges

| CIDR block          | IP lower bound   | IP upper bound   | Addresses |
| ------------------- | ---------------- | ---------------- | --------- |
| `34.216.110.128/27` | `34.216.110.128` | `34.216.110.159` | 32        |
| `44.234.69.0/25`    | `44.234.69.0`    | `44.234.69.127`  | 128       |
| `54.244.51.0/24`    | `54.244.51.0`    | `54.244.51.255`  | 256       |

## Open ports

To allow connections to and from these IP address ranges, configure the following ports in your network infrastructure:

| Port | Protocol | Purpose | TLS? |
| ---- | -------- | ------- | ---- |
| 443  | TCP      | TURN    | Yes  |
| 3478 | TCP, UDP | TURN    | No   |
| 5349 | TCP      | TURN    | Yes  |

Twilio TURN servers allocate ephemeral peer relay ports in a range of UDP ports between `10000` and `60000`.
