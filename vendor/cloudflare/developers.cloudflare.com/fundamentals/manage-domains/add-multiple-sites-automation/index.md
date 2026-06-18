---
title: Add multiple sites via automation
description: To add multiple sites to Cloudflare at once and more efficiently, you can do so via the Cloudflare API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add multiple sites via automation

**Last reviewed:**  5 months ago 

To add multiple sites to Cloudflare at once and more efficiently, you can do so via the Cloudflare API.

Adding multiple sites can be useful when you:

* Have multiple domains mapping back to a single, canonical domain (common for domains in different countries - such as `.com.au`, `.co.uk` \- that you want protected by Cloudflare).
* Are a [partner ↗](https://www.cloudflare.com/partners/), agency, or IT consultancy, and manage multiple domains on behalf of your customers.
* Are moving an existing set of sites over to Cloudflare.

Using the API will allow you to add multiple sites quickly and efficiently, especially if you are already familiar with [how to change your nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) or [add a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

This tutorial assumes domains will be added using a [primary DNS setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/).

---

## Prerequisites

To add multiple sites to Cloudflare via automation, you need:

* An existing [Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/).
* Command line with `curl`
* A Cloudflare [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with one of the following permissions:  
   * Zone-level `Administrator`  
   * Zone-level `Zone: Edit` and `DNS: Edit`  
   * Account-level `Domain Administrator`
* To have disabled [DNSSEC](https://developers.cloudflare.com/dns/concepts/#dnssec) for each domain at your registrar (where you bought your domain name).  
Provider-specific DNSSEC instructions  
This is not an exhaustive list, but the following links may be helpful:  
   * [DNSimple ↗](https://support.dnsimple.com/articles/cloudflare-ds-record/)  
   * [Domaindiscount24 ↗](https://support.domaindiscount24.com/hc/articles/4409759478161)  
   * [DreamHost ↗](https://help.dreamhost.com/hc/en-us/articles/219539467)  
   * [Dynadot ↗](https://www.dynadot.com/help/question/set-DNSSEC)  
   * [Enom ↗](https://support.enom.com/support/solutions/articles/201000065386)  
   * [Gandi ↗](https://docs.gandi.net/en/domain%5Fnames/advanced%5Fusers/dnssec.html)  
   * [GoDaddy ↗](https://www.godaddy.com/help/add-a-ds-record-23865)  
   * [Hostinger ↗](https://www.hostinger.com/support/3667267-how-to-use-dnssec-records-at-hostinger/)  
   * [Hover ↗](https://support.hover.com/support/solutions/articles/201000064716)  
   * [Infomaniak ↗](https://faq.infomaniak.com/2187)  
   * [InMotion Hosting ↗](https://www.inmotionhosting.com/support/edu/cpanel/enable-dnssec-cloudflare/)  
   * [INWX ↗](https://kb.inwx.com/en-us/3-nameserver/131)  
   * [Joker.com ↗](https://joker.com/faq/books/jokercom-faq-en/page/dnssec)  
   * [Name.com ↗](https://www.name.com/support/articles/205439058-managing-dnssec)  
   * [Namecheap ↗](https://www.namecheap.com/support/knowledgebase/article.aspx/9722/2232/managing-dnssec-for-domains-pointed-to-custom-dns/)  
   * [NameISP ↗](https://support.nameisp.com/knowledgebase/dns)  
   * [Namesilo ↗](https://www.namesilo.com/support/v2/articles/domain-manager/ds-records)  
   * [OVH ↗](https://help.ovhcloud.com/csm/en-dns-secure-domain-dnssec?id=kb%5Farticle%5Fview&sysparm%5Farticle=KB0051637)  
   * [Squarespace ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-dnssec)  
   * [Registro.br ↗](https://registro.br/tecnologia/dnssec/?secao=tutoriais-dns)  
   * [Porkbun ↗](https://kb.porkbun.com/article/93-how-to-install-dnssec) (do not fill out **keyData**)  
   * [TransIP ↗](https://www.transip.eu/knowledgebase/150-secure-domains-custom-nameservers-dnssec/)  
Note  
If your previous provider allows you to add DNSKEY records on the zone apex and use these records in responses to DNS queries, refer to this [migration tutorial](https://developers.cloudflare.com/dns/dnssec/dnssec-active-migration/) to learn how to migrate a zone with DNSSEC enabled.

---

## 1\. Add domains

1. Create a list of domains you want to add, each on a separate line (newline separated), stored in a file such as `domains.txt`.
2. Create a bash script `add-multiple-zones.sh` and add the following. Add `domains.txt` to the same directory or update its path accordingly.

Terminal window

```

  for domain in $(cat domains.txt); do

    printf "Adding ${domain}:\n"


    curl https://api.cloudflare.com/client/v4/zones \

    --header "Authorization: Bearer <API_TOKEN>" \

    --header "Content-Type: application/json" \

    --data '{

      "account": {

        "id":"<ACCOUNT_ID>"

      },

      "name": "'"$domain"'",

      "type": "full"

    }'


    printf "\n\n"

  done


```

1. Open the command line and run:

Terminal window

```

bash add-multiple-zones.sh


```

Warning

There are limitations on the number of domains you can add at a time. Refer to [limitations](#limitations) for details.

After adding a domain, it will be in a [Pending Nameserver Update](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) state.

### Additional options

#### jq

[jq ↗](https://jqlang.github.io/jq/) is a command-line tool that parses and beautifies JSON outputs.

This tool is a requirement to complete any additional option steps in this tutorial.

Terminal window

```

echo '{"foo":{"bar":"foo","testing":"hello"}}' | jq .


```

Refer to `jq` [documentation ↗](https://jqlang.github.io/jq/manual/#basic-filters) for more information.

#### Quick scan

Cloudflare offers a [quick scan](https://developers.cloudflare.com/dns/zone-setups/reference/dns-quick-scan/) that helps populate a zone's DNS records. This scan is a best effort attempt based on a predefined list of commonly used record names and types.

This API call requires the domain ID. This can be found in the following locations:

* [Create Zone](https://developers.cloudflare.com/api/resources/zones/methods/create/#Request)
* [List Zones](https://developers.cloudflare.com/api/resources/zones/methods/list/)

Using `jq` with the first option above, modify your script `add-multiple-zones.sh` to extract the domain ID and run a subsequent API call to quick scan DNS records.

JavaScript

```

  for domain in $(cat domains.txt); do

    printf "Adding ${domain}:\n"


    add_output=`curl https://api.cloudflare.com/client/v4/zones \

      --header "Authorization: Bearer <API_TOKEN>" \

      --header "Content-Type: application/json" \

      --data '{

        "account": {

          "id":"<ACCOUNT_ID>"

        },

        "name": "'"$domain"'",

        "type": "full"

      }'`


    echo $add_output | jq .


    domain_id=`echo $add_output | jq -r .result.id`


    printf "\n\n"

    printf "DNS quick scanning ${domain}:\n"


    scan_output=`curl --request POST https://api.cloudflare.com/client/v4/zones/$domain_id/dns_records/scan \

      --header "X-Auth-Email: <EMAIL>" \

      --header "X-Auth-Key: <API_KEY>"`


    echo $scan_output | jq .


  done


```

## 2\. Update nameservers

For each domain to become active on Cloudflare, it must be activated in either [Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) or [Partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/). The following script will output a list containing the nameservers associated with each domain.

You can find your zones nameservers in the following locations:

* [Create Zone](https://developers.cloudflare.com/api/resources/zones/methods/create/#Request)
* [Zone Details](https://developers.cloudflare.com/api/resources/zones/methods/get/)
1. Modify your script `add-multiple-zones.sh` to print a CSV with data from the `Create Zone` JSON response.

JavaScript

```

  for domain in $(cat domains.txt); do

    printf "Adding ${domain}:\n"


    add_output=`curl https://api.cloudflare.com/client/v4/zones \

      --header "Authorization: Bearer <API_TOKEN>" \

      --header "Content-Type: application/json" \

      --data '{

        "account": {

          "id": "<ACCOUNT_ID>"

        },

        "name": "'"$domain"'",

        "type": "full"

      }'`


    # Create csv of nameservers

    echo $add_output | jq -r '[.result.name,.result.id,.result.name_servers[]] | @csv' >> /tmp/domain_nameservers.csv


    domain_id=`echo $add_output | jq -r .result.id`


    printf "\n\n"

    printf "DNS quick scanning ${domain}:\n"


    scan_output=`curl --request POST https://api.cloudflare.com/client/v4/zones/$domain_id/dns_records/scan \

      --header "X-Auth-Email: <EMAIL>" \

      --header "X-Auth-Key: <API_KEY>"`


    echo $scan_output | jq .


  done


  printf "name_servers are saved in /tmp/domain_nameservers"

  cat /tmp/domain_nameservers.csv


```

| ID         | ZONE        | NAME SERVERS                                  |
| ---------- | ----------- | --------------------------------------------- |
| <ZONE\_ID> | example.com | arya.ns.cloudflare.com, tim.ns.cloudflare.com |

1. Use the values in the **NAME SERVERS** column to [update the nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#34-update-your-registrar) at the registrar of each domain.

---

## Limitations

There are limitations on the number of domains you can add at a time - specifically, you can only sign up a maximum of 25 domains every 10 minutes.

In addition, if you have over 50 domains and, of those domains, more are pending than active, you will be blocked from adding more. We recommend waiting until your pending sites have been activated before adding more.

## Common issues

If any errors were returned in this process, the domain may not be registered (or only just registered), be a subdomain, or be otherwise invalid. For more details, refer to [Cannot add domain](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/cannot-add-domain/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/add-multiple-sites-automation/#page","headline":"Add multiple sites via automation · Cloudflare Fundamentals docs","description":"To add multiple sites to Cloudflare at once and more efficiently, you can do so via the Cloudflare API.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/add-multiple-sites-automation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/add-multiple-sites-automation/","name":"Add multiple sites via automation"}}]}
```
