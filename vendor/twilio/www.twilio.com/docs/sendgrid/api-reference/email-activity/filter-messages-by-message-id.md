# Filter messages by message ID

## API Overview

* To gain access to the Email Activity Feed API, purchase additional email activity history.
  * To purchase additional history, go to **Account Details** > [**Your Products**][products] > **Add-ons** in the Twilio SendGrid console.
* To query all of your stored messages, query individual messages, and download a CSV with data about the stored messages, use the Email Activity API.
  * To learn how to build queries and use the API, see [Getting Started with the Email Activity Feed API][] or go to **Activity** in the [Twilio SendGrid console][tsc].

[products]: https://app.sendgrid.com/account/products

[Getting Started with the Email Activity Feed API]: /docs/sendgrid/for-developers/sending-email/getting-started-email-activity-api/

[tsc]: https://app.sendgrid.com/email_activity

## Operation overview

```json
{"path":"https://api.sendgrid.com/v3/messages/{msg_id}","method":"get","servers":[{"url":"https://api.sendgrid.com","description":"The Twilio SendGrid v3 API"}]}
```

Get all of the details about the specified message.

For Regional (EU) subusers, no data will be generated for this service.

## Operation details

### Authentication

API Key

### Headers

```json
[{"in":"header","name":"Authorization","required":true,"default":"Bearer <<YOUR_API_KEY_HERE>>","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"msg_id","in":"path","description":"The ID of the message you are requesting details for.","required":true,"schema":{"type":"string"}}]
```

### Responses

```json
[{"responseCode":"200","schema":{"description":"","content":{"application/json":{"schema":{"title":"Message","type":"object","required":["api_key_id","asm_group_id","categories","events","originating_ip","outbound_ip","outbound_ip_type","teammate","template_id","unique_args"],"example":{"from_email":"test@test.com","msg_id":"in aliquip id aliqua","subject":"est incididunt adipisicing pariatur","to_email":"send@test.com","status":"not_delivered","template_id":"123e4567-e89b-12d3-a456-426655440000","asm_group_id":11376349,"teammate":"","api_key_id":"sdfsdfsdf123","originating_ip":"2.3.4.5","events":[{"event_name":"bounced","processed":"2017-10-13T18:56:21Z","url":"http://3LX,MU}N=B8'd,K}>bEma{l~!ad%peIF}y>qHfLPWQ$l9b\\!6.1H?$Z9H\"il-_gZD>/JPYsGqH4x4_3v090TCtnFalXGFiAdooDxgrDAYNXShUywSxwYr8gKeyc/4sal4VJ3IxEWsG74V5MYQ0mz27jhy7n5DHsUtApQ6zXHS13uO5vYBlJHpJRfuT6/F5nIpkHre2w3eTtN7M6pg9V5stjnnsavKkzQxyTv15CMSDLFwR_BTZwofhWpyBU7B9ypYL79vT97N3LDZyoaM/fNsOLPIqfGBer_Mx9_StergbQYANyOmOSjR6pZof01ky/ZcNDhpu3CkSl4MTtQ3NMCX780pOKQ5SYIPigyvz9IC9WtrCNcOkTxdOPdY0_4MJU4EuTTPmGvO/14KaJCDjIjgrbIqpzuUEL5mET0t2VeVlwvtnOnlHaBE8sic20ze2E0Xt3ETqXyzVJRjLDKh/LWkW8OVp_xkLBCCW7LQngRukKcOiWjMXeCEhYI9HoZ0RsMEWZC8KzRaHc4OI0uXPD4M9pav1LGrI/_0t_RnBnfnqGKsBJr0kdQi/Y6QN_aeawIqX5hDNIU3MF/wWKVWLS0ZFbDfK6KVv5oAid83EpwKoazAMA8MTfEXvHQLO7k7XYWX1Il3eGXL6/wCA96I1SOabzJkZHo2HsFpIC/VBk52Lnpp0xtDH/OCdlQ5e4PpxXQeklp70LPOndr7QKSYEQNUc48n36ixvTjhgpgO8wHsFFYqGcuBMHg9oaCARppQomiQDWYuVPVDynJHdsM1_gWl4/NSs8Y9PL7DrQXOu0UiFRRE0TUsvgqyUgJzlGjUnRziyYeROO75D0K_3aTtbGbCmhaxecos40a1w0PDCNkFp1W/iHwY7922drhsoM6ShwqqwGpAh5HLuU6Q5gqyckeai6YN7HCh9DdHPhhJcatgtMHZDKfQUBVt9ecUlDgiCFF_OnRX/GpzttcsL8E2FoXL9_eAWvSqjodROqx7MZCA/ORdnR/IssPCYP1kTHTIL5mZxv4UGEpyNjUzt4GdSJJTm0nztltWDYX8_Ezl2JvpLVnGVTJxobb4yQIJhe3n64khbOFyFLKHWEniIolm/AxpZQYmseWlVqrIz3YXU59XaSbTTrdCHNhvwF1ogXiiggN6TZ2B3QY_mBEtAp/SD0ONPVqEUkTNAFWTgnnlv6ZIMdMbTw5uZwtFRlB7qDvQouml9kujGmRu6k7zZMTOwWowRNtpboLUcL2NzkVgK6N1Zi2vq/Nt4NJvM5_l1dpIIbwJv_CIcZQZOqPtRWULa2iVxfmJJQaqgLQPwSHQH1zuRJMhraEsPjqVQRC0pZpSt/24VBDN8y31Ye/y_ekWxMdZCvr978C/WrdcTi29kxjJLyT9BII7BsgT5vLuI2l7ntqRAhAUWMs/h9JR0i8RbX5OfB46q41/TfmSdgi97bCR2HfgflyypXwKhRfKYU2MVpu2Dd90WQUlm7hZV8dSfGusuMj/nPMpRVWcbnvlAdsehJCPbLv6n4qdLSPeoMBo32acAGgu1BwBG8JsBgbH43yYi5X7UdGRWKqm_ZbqaDEKH3ncU/uA8EOJb41VfGho4LUeOi1IeYwVAhFEyO6YbteYZecEubrNFZrWWjZUqhzouzY95TeWU8E4StCXVPKlYPiFiwUSX20kG0lVtDbAy/7u4f4x0cYlFOvI1UN1qoOExmNxnxzQQFeM5exWfW2JrRXq5e0UdAJr4q2o9Y_0WaGfhL/nP6Ei06YajDKr11dK5H0LX/9CGTC37HFZeopyopzP_7fvGFkqIRoGTS48pLaIFz3gwpQNlWXUFCsd/PnRlsqJ3SBQSgp_AQe2cP6iBNy2bJI8lkxwY5YVDDdjxusuCcafdjfs2aUa/4tr_iMnNBnd27GxjQI28_JGJlfbOaajVJOxuPMT4ELpYCfPiFjdSbJyE0/gCwtj0rgDKSLWJnOPJ5TAJ935gCqeIsBhOhfcZX413GdilBZRRYEjCVKfOuWzHZ3GW/8yjyk5e_WMNv5F6xggl07w90DBwpx/Q/iWfncqMuSfoeFeqHQkDL9F5W19j1cGuAcyfIYMAXztHXpgTKh9vZcsLYC7LcgKr4FQj3JjEvtnDG2PjcMjGF/MnbCRCz22Ho410_vE9M1Hpq0wdk_i5DbZKNoSwlPgey9URkpuX146TcDdsx_VWDenCepY5HwMr9CPOY9hzUs/c5AWeUMXk/gvsI81Jkv5rHpEnNBUZXYzfqkwQfffhmrc/StLCtzRRlja8dpsEWdkzoKR9Kdxq1qAs5f0sdrGjVRLTT_s1Q2P59zhA/QmS4bubi64cYot3gSIgdNnkjA2GjCp1ETVa548_U9B6boTKDVmaKJlVIDvqL84RC3WI7Er/8opi2lZ48W83Ur47BRh38oOnI0agrCyZz8bp1w_gfVRlSO8PS0i/l_/qxq5xpLbhPkdxVoyZVsNAZchfnmkIHyIk5IK6EUDXdMR21y6OvKW50ZbooAtk9ymynBj4dAYMsd25RV7FE1I1vRTsiDw52/.E5WC0Ymo2zn.qelSbhzr-4laArYiWP.dwJB6qm_6rs0Rm5UXYaYtUNbh76_jJp_X1xQUCDSgbr2KOkDU0\"Q/-4dV\"Yk3QGg[(O86=Pf\"e17K4'r{)kicofHSXcMmP@>VF^`~4j4F*L/1]tD+Lw!WI!@]*OZm6C`M$u96}*O<U;_cZ84k.|nIqpAaeiroItOenDBL","bounce_type":"hard","http_user_agent":"in tempor ex dolore est","mx_server":"quis proident","server_response":"some error message"}],"categories":["hi","bye"],"unique_args":"{'key': 'value'}","outbound_ip":"1.2.3.4","outbound_ip_type":"dedicated"},"properties":{"from_email":{"type":"string","format":"email","default":"test0@example.com","description":"The 'From' email address used to deliver the message. This address should be a verified sender in your Twilio SendGrid account."},"msg_id":{"type":"string","description":"A unique ID assigned to the message. This ID can be used to retrieve activity data for the specific message."},"subject":{"type":"string","description":"The email's subject line."},"to_email":{"type":"string","format":"email","description":"The intended recipient's email address."},"status":{"type":"string","description":"The message's status.","enum":["processed","delivered","not_delivered"],"refName":"Status3","modelName":"Status3"},"template_id":{"type":"string","description":"The ID associated with a Twilio SendGrid email template used to format the message."},"asm_group_id":{"type":"integer","minimum":1,"description":"The unsubscribe group associated with this email."},"teammate":{"type":"string","description":"Teammate's username","minLength":0,"maxLength":64,"pattern":"^$|^[A-Za-z0-9]+"},"api_key_id":{"type":"string","minLength":3,"maxLength":50,"pattern":"^[A-Za-z0-9]+","description":"The ID of the API Key used to authenticate the sending request for the message."},"events":{"type":"array","description":"List of events related to email message","items":{"title":"Event","type":"object","example":{"event_name":"bounced","processed":"2017-10-13T18:56:21Z","reason":"some reason","url":"http://3LX,MU}N=B8'd,K}>bEma{l~!ad%peIF}y>qHfLPWQ$l9b\\!6.1H?$Z9H\"il-_gZD>/JPYsGqH4x4_3v090TCtnFalXGFiAdooDxgrDAYNXShUywSxwYr8gKeyc/4sal4VJ3IxEWsG74V5MYQ0mz27jhy7n5DHsUtApQ6zXHS13uO5vYBlJHpJRfuT6/F5nIpkHre2w3eTtN7M6pg9V5stjnnsavKkzQxyTv15CMSDLFwR_BTZwofhWpyBU7B9ypYL79vT97N3LDZyoaM/fNsOLPIqfGBer_Mx9_StergbQYANyOmOSjR6pZof01ky/ZcNDhpu3CkSl4MTtQ3NMCX780pOKQ5SYIPigyvz9IC9WtrCNcOkTxdOPdY0_4MJU4EuTTPmGvO/14KaJCDjIjgrbIqpzuUEL5mET0t2VeVlwvtnOnlHaBE8sic20ze2E0Xt3ETqXyzVJRjLDKh/LWkW8OVp_xkLBCCW7LQngRukKcOiWjMXeCEhYI9HoZ0RsMEWZC8KzRaHc4OI0uXPD4M9pav1LGrI/_0t_RnBnfnqGKsBJr0kdQi/Y6QN_aeawIqX5hDNIU3MF/wWKVWLS0ZFbDfK6KVv5oAid83EpwKoazAMA8MTfEXvHQLO7k7XYWX1Il3eGXL6/wCA96I1SOabzJkZHo2HsFpIC/VBk52Lnpp0xtDH/OCdlQ5e4PpxXQeklp70LPOndr7QKSYEQNUc48n36ixvTjhgpgO8wHsFFYqGcuBMHg9oaCARppQomiQDWYuVPVDynJHdsM1_gWl4/NSs8Y9PL7DrQXOu0UiFRRE0TUsvgqyUgJzlGjUnRziyYeROO75D0K_3aTtbGbCmhaxecos40a1w0PDCNkFp1W/iHwY7922drhsoM6ShwqqwGpAh5HLuU6Q5gqyckeai6YN7HCh9DdHPhhJcatgtMHZDKfQUBVt9ecUlDgiCFF_OnRX/GpzttcsL8E2FoXL9_eAWvSqjodROqx7MZCA/ORdnR/IssPCYP1kTHTIL5mZxv4UGEpyNjUzt4GdSJJTm0nztltWDYX8_Ezl2JvpLVnGVTJxobb4yQIJhe3n64khbOFyFLKHWEniIolm/AxpZQYmseWlVqrIz3YXU59XaSbTTrdCHNhvwF1ogXiiggN6TZ2B3QY_mBEtAp/SD0ONPVqEUkTNAFWTgnnlv6ZIMdMbTw5uZwtFRlB7qDvQouml9kujGmRu6k7zZMTOwWowRNtpboLUcL2NzkVgK6N1Zi2vq/Nt4NJvM5_l1dpIIbwJv_CIcZQZOqPtRWULa2iVxfmJJQaqgLQPwSHQH1zuRJMhraEsPjqVQRC0pZpSt/24VBDN8y31Ye/y_ekWxMdZCvr978C/WrdcTi29kxjJLyT9BII7BsgT5vLuI2l7ntqRAhAUWMs/h9JR0i8RbX5OfB46q41/TfmSdgi97bCR2HfgflyypXwKhRfKYU2MVpu2Dd90WQUlm7hZV8dSfGusuMj/nPMpRVWcbnvlAdsehJCPbLv6n4qdLSPeoMBo32acAGgu1BwBG8JsBgbH43yYi5X7UdGRWKqm_ZbqaDEKH3ncU/uA8EOJb41VfGho4LUeOi1IeYwVAhFEyO6YbteYZecEubrNFZrWWjZUqhzouzY95TeWU8E4StCXVPKlYPiFiwUSX20kG0lVtDbAy/7u4f4x0cYlFOvI1UN1qoOExmNxnxzQQFeM5exWfW2JrRXq5e0UdAJr4q2o9Y_0WaGfhL/nP6Ei06YajDKr11dK5H0LX/9CGTC37HFZeopyopzP_7fvGFkqIRoGTS48pLaIFz3gwpQNlWXUFCsd/PnRlsqJ3SBQSgp_AQe2cP6iBNy2bJI8lkxwY5YVDDdjxusuCcafdjfs2aUa/4tr_iMnNBnd27GxjQI28_JGJlfbOaajVJOxuPMT4ELpYCfPiFjdSbJyE0/gCwtj0rgDKSLWJnOPJ5TAJ935gCqeIsBhOhfcZX413GdilBZRRYEjCVKfOuWzHZ3GW/8yjyk5e_WMNv5F6xggl07w90DBwpx/Q/iWfncqMuSfoeFeqHQkDL9F5W19j1cGuAcyfIYMAXztHXpgTKh9vZcsLYC7LcgKr4FQj3JjEvtnDG2PjcMjGF/MnbCRCz22Ho410_vE9M1Hpq0wdk_i5DbZKNoSwlPgey9URkpuX146TcDdsx_VWDenCepY5HwMr9CPOY9hzUs/c5AWeUMXk/gvsI81Jkv5rHpEnNBUZXYzfqkwQfffhmrc/StLCtzRRlja8dpsEWdkzoKR9Kdxq1qAs5f0sdrGjVRLTT_s1Q2P59zhA/QmS4bubi64cYot3gSIgdNnkjA2GjCp1ETVa548_U9B6boTKDVmaKJlVIDvqL84RC3WI7Er/8opi2lZ48W83Ur47BRh38oOnI0agrCyZz8bp1w_gfVRlSO8PS0i/l_/qxq5xpLbhPkdxVoyZVsNAZchfnmkIHyIk5IK6EUDXdMR21y6OvKW50ZbooAtk9ymynBj4dAYMsd25RV7FE1I1vRTsiDw52/.E5WC0Ymo2zn.qelSbhzr-4laArYiWP.dwJB6qm_6rs0Rm5UXYaYtUNbh76_jJp_X1xQUCDSgbr2KOkDU0\"Q/-4dV\"Yk3QGg[(O86=Pf\"e17K4'r{)kicofHSXcMmP@>VF^`~4j4F*L/1]tD+Lw!WI!@]*OZm6C`M$u96}*O<U;_cZ84k.|nIqpAaeiroItOenDBL","bounce_type":"soft","http_user_agent":"in tempor ex dolore est","mx_server":"quis proident"},"required":["event_name","processed","bounce_type","http_user_agent","mx_server"],"properties":{"event_name":{"type":"string","description":"Name of event","enum":["bounced","opened","clicked","processed","dropped","delivered","deferred","spam_report","unsubscribe","group_unsubscribe","group_resubscribe"],"refName":"EventName","modelName":"EventName"},"processed":{"description":"The date when the event was processed","type":"string"},"reason":{"type":"string","description":"Explanation of what caused the message to be \"bounced\", \"deferred\", or \"blocked\". Usually contains error message from the server - e.g. message from gmail why mail was deferred.","maxLength":1024},"attempt_num":{"type":"integer","description":"Used with \"deferred\" events to indicate the attempt number out of 10. One \"deferred\" entry will exists under events array for each time a message was deferred with error message from the server. ","minimum":1,"maximum":10},"url":{"type":"string","description":"Used with \"clicked\" event to indicate which url the user clicked.","pattern":"^((http[s]?|ftp):\\/)?\\/?([^:\\/\\s]+)((\\/\\w+)*\\/)([\\w\\-\\.]+[^#?\\s]+)(.*)?(#[\\w\\-]+)?$"},"bounce_type":{"type":"string","description":"Use to distinguish between types of bounces","enum":["soft","hard"],"refName":"BounceType","modelName":"BounceType"},"http_user_agent":{"type":"string","description":"Client recipient used to click or open message"},"mx_server":{"type":"string","description":"The MX server that received the email. For example, mx.gmail.com"}}}},"originating_ip":{"type":"string","format":"ipv4","description":"This is the IP of the user who sent the message."},"categories":{"type":"array","description":"Categories users associated to the message","items":{"type":"string"}},"unique_args":{"type":"string","default":"Null","description":"JSON hash of key-value pairs associated with the message."},"outbound_ip":{"type":"string","description":"IP used to send to the remote Mail Transfer Agent.","format":"ipv4"},"outbound_ip_type":{"type":"string","description":"Whether or not the outbound IP is dedicated vs shared","enum":["dedicated","shared"],"refName":"OutboundIpType","modelName":"OutboundIpType"}}},"examples":{"response":{"value":{"from_email":"LKb.pOGYIZbfxMgi7Le0K1YWym%e5pz2PiuGbwByM2tR+wRPqfoFg1__35DaWF8CDhzYJg@ZTSFDjbgdxD23oq34Lun1NUnyymoGT4G.5i1IEzQpXWAvNwx.BNckAJiBCnwEVnwBfrbMlouoOPmtTSEbdPp","msg_id":"hznSfJ1RfKeIKS1B4mShNnkRMpdt5IXXKf","subject":"culpa aute amet magna sint","to_email":"+lOnUtHodefMsuBw.kunNalfcxRos5USSRoR@r5uEXYPP6wrQGRQ-vBg33fLY6MVkkMd-DKT8Z1iqt4qnrL23xMOZ8GWd.fyghGEFceTHIUpgwNGlwEtFHJikSaPzsnYfrJPKydPVPAlItJtqykRHZSGW","status":"delivered","template_id":"d674d9b7-e8e5-4e30-87be-1b3b026235fd","asm_group_id":5464443,"teammate":"9a8F0EP88wSSJeuOyXtbfc7BkK","api_key_id":"bUshz3LGa3coToxA2sWViYAEJJmYZJRyY9BCQY","events":[{"event_name":"unsubscribe","processed":"2017-10-13T18:56:21Z","bounce_type":"soft","http_user_agent":"Mozilla/5.0 (Windows NT 5.1; rv:11.0) Gecko Firefox/11.0","mx_server":"s","url":"G_3c-1HtUkN4`puC&&!u>0OiStFG.ZoRi2=j%fUVa]&re6k{hKqD-8vWE<hw-Bd>12Fb5JC6z>S@@'cWS~w5KtuIwv$8/JDD94CXx1n5yjC_I2lQ66zDj4MXe/4bqlcqqQ7evnQWTYx5roaEYMapyuzb/USpsyalh/HcYc9PmQfF8ND_C7bXnwFQ_fb_BHMXbIV8JN28/NjZdawDJ6kSWxLykSVTHzcISGPBRfs_rt3Uc65Vzj6LDSSMN8WRs70m0tAWs/fkDvjvm_7ZeV08YZeB9j9mS9BcE089Fn5UzDlTJW9vqDF5uipjlIVrNbM7oWE/MIJcjg2vJO20jA24WHrchrEXCvKcxriviSDl3tuyDxqdqRSekpm2aH6yW7_ylXj/nWsex4jm3rKvYw1uLq3Tp7qb9edhj8B_TnwLv1yjHSkgbA5jKI4BTqxugmwVTnFf2OFCFp/ZILLkoKgfwOyIK4reUIkhCjuhkwp/cqGaFAkeCFQXPB6DLYesLZ2M3KPuBsBrs3pr3HRbTtwaOzdKtGc8e0C0VTjrJ3GwljStMPrSuQWh6/vigHRasZ4P9kFv5DPVbHWZzPvtwUw0AMByt44YH678WpbAXXy4I/IVOHmErZTbw1mJ/3vd4uI5rr2zEO_YA9qJZLJT/wmBimbOyaMtmTNYr_FhgfkKMN3_1la7RCK8CIP3p26mbuHbdJV1j/5sTIKibInM5l2BoWdEi49bPqzagsfjKpGVbg0YQ8mjrLhI92/qy0eVYi34kBGVuLzxK2FLC8vwYUrbupjUYE23Mc_6nmHYRK1HF1QmZDZG1hw96I3MPbTZqeJOWGch230qDNxOgnHRNNM52k/3c7FeuRr88RwZGpif/4FaSAbdqkUNvJ9J9qX2tJS9x5vZlgD8k4YHIXDztrnwg2VPquj/uo_2MjbWybIF/NGJM2RFAsKV1S5iOejuTV4p12KlH1p0Dt5EpxCSIl0XoWuvyLYar77f_hzqNdWAyL0FDxGfj4ma4jwqdTTLNyeZEtguYoCHTFfY/HgJkpHx/yO23G7gLhKPvD459ceffHidFh7LipTxNF0GFXhIAPrWfhv7PkPmVofBoFFlo6/rMcHQ82d5VS8i1CCyLtfuT5WH9GqrsOY7xo3lxi7BNL93/PLRdQT3SObRFRERw68V5ZFvIuEQqFOFZQ848rWPLXYDGY658dyjZALf/Ug4EROi_ehNtzPwecer_RGBHxeMnpxrPAFZEL6YXNKzm8hh3HY4Uc4fgkjge5fXsR4CeTSkS66/FOD00deDKmN7XcHEj1LGlAmd4XlV8vFpXg2VazX4OLW8z6vXn5vntNGYO6eBCEKUwupRz9nQSMeZ/Pbmjoopyt6TxQBUfPkHBdgCIhqA1zDV72ARqGlK_ao9KVjvgbB98YeiieIyogkuOa4y0E5iUEdBopzovVgtY88yLijh9ww/tl0R5rI2P2_OxguTbv_wrfEm8jRjISEIqSE9q29RB3n8PeD4hu24rcsaEuTMCqniiLN0a2OtZiKxHnbsNB660Aq3/tEo2SHZBkkIFYXBbDNE7gLfvFz9ZaC_E2oV2quyK1Id5SkNkJBVRRgROWBc_XEOXktc4vRUKxy1MQ526Xilyo8/uI67lHH1Vlr4V3GVmweT4A16KMqzmVzvRDRFLpkBv2iu3Okc1vIqkC/426aOqeUm6SXIx16d8BWVRcmqKqizxDEF3JkLFgX0ab73CZ4GdJ9YaakJO7y4adFGzzIVLcn08UZ/pwDQ9BAuwuMc2yMnKihdvmLKbnAa1ATk9jFXQ9QAEMBHZLbPNvtS3pkpk0s6fyh2ceHa9Myy3fL/oqvPmq_14KzLgPZHaOlyb3tUoQM52fv/I78TqTGyB4WYD_vkm8gYHZcCF0dFIXsiXUbAbwR90Ldk8lsgxSL6rBvjPSlQq7N66NPzUVRYr3zSISupG_66uS4rJszHwmxmmraT3/zfVKxHXFHgxUDRmnwIMfdFKm4sf/qnRRccOLExJYGcZy8u65jo4gHDvO6vnpsdf0YtVWqDBJXa95/Y/qL7EYS73_t6/2xnWra9TTO0OtQNXEQ1XXLSLt6vPw1FTlE2aYCitDgUo7DyxiwuGtvmMKUkYCo/lqXouo2TGXZFF80lrCu1vKdxBgOOerlrsKrOJawGEzL8XzXdxkOMUT8HOzHPNOvDwsxc47mvpVzXEbX5DRaioOlm2U4flTG/6bZfLqJqHNtrKwC5U5NNG6_yNOW5Jg_bLmzUosi86IXxn7i04vRXXn92JmdE70TcdujehT1n15wtiD8ld5A65IV2W1801/wr0XcDIGiUSmxFfCozUCtBTFwln0uJ0cquSDXhj7JQADhYDGyz8WhqcPE7CP9xN93EUBrWczINbA4IsfckY8CZh68/Tak5dEhw8i_3rz/8U39D/iML1G_A8TsnKQ9/_S8o89fFc7Wx/f1nXF8H6OLVbPpp5IZg7UTZ2K0bSe3iBpsmkkJpxY_6zEHTJE3LbIANwF9Ik5Tu0ZJpjck7I07xlHR8mDW9FXclSQC/qJUGL5qByf2SY2Wd24hqKGrahLfqApQuRI8_DtU/Y8kH6DDif5kD6as3sIe6VbKYnU9c1URq/npTlE72m107FXxW9zktdzbBJAxt4udMFzjt2LPcBpqrMKGkrg4BHqKXwhFTspCWyYCjxJ/eFb3fd3BB5kb9D0yl3oOjeWtbJBqsboyzdLisRBn2MCtXO2O8eo4Hkm/2uJDoRjRCyIi2GNRkH0B3EkN6Z3vG40C985bAtM8eqHABzP2QRcKCz4ICOw_Xz249bJk8qM0/m4EeIWnx2ISf9TBU6_0KZ5QJ0VPOCPXxV9jCeK5W5/RV5nd7GUUXG0btDqUAa3DzpaRHX3klMAqL73hK4AGD3ItikmxF8vnSaqtsgOCpEePERt9qcUOJJP2aR0scPAf_1TkGSrgr5VF/XLM2i7YhC_3J9fA2Qwa0dbTedY/xGayjimEkuWSWvh7P5FNOum_l7qJPnA31lQq6ixqR0NKhO328rWfijqKHF6WR/5O0MJ4WNuIXk6xBtTOA9mK7CGUgWjaF5mB72PVnDpN8G6ERO39GqO/fCO96/A1mwIPWedF6HklU8jaQ_M5EUzwCsBE3/7FW2hbcD3GCOFCiLvObjn59o6CKoYlmTop/PZw2CLzvARAr5KaLhjIuZRSKTGlmYjvSoSELuvWi/QHUV7SJ0kF_1O3b_3a88cm/z7qD3Rp6MmoQdGPSyu1lXTpoETypgOMywfsr4ycV2LQr5XaE3UrQP/RzobA4rI_I3ceCUaRASmil2rV1TUiyljhdCFt8zmi1o2NyTzSBRNGP0lXU5Qtm6dKKp7lGRC19P2oSSFrxt85vWRNo1mv8odcL/TF7/MN1Ev7gY20MqlRSBrlwg5LZ4_Az7QnBnpbU3LkTC/oVb743VFtXMW4cK/3lw6wfBJZe_8DobxT_6/gCXp6QOs/LuqmrQHMQvTS6jfbqVFnPfLjrQ01Mb_F4lr3md6m87wpc1CYd9hdzgUL/aqz68HMDCxjGauC00Rajq9wGVYcWJ3j6rIaHIPwclftjARXFDg0yH8v/L6qDgIgGwbB3eZfjOXHAMXRFNMMihseZxYkcFAzLtYr94q9XpQeK4bKi9h_rWAMwcEHnS8/MHHlySbgy8azGEA0u9xsY96MRi45Qe74kZ9xlsI1t4Yutx8/gsjIiu7vNsKEyeTwd88BMExjWNcJHOSHRff57pJBMEAtPdbMETYorvUkRyErsqprxX0W45n0RRQ85w/JCOsYaxZOAFfzO0AdLpMCguFwl01fkFOKYrQeXfNn8w0KF4XS0k/fPx02fU7fFjUoXcPH7_9xo755WL8DNIU2ne4b6DpiROe473yUfD8_zSNUI1tpxzVYNA7GvVSYt8UtqHn3/_QwuOc4VeAI6RiAG5O5bcAxzQl96Q35emNwtTT_CYqHORCmyPj6By2hT_SCLf8m_xFxxe3YzvnxDZGq3qf__pq7Tw181/GosBAJy3MotiIxcYDASbY9sV4T2V/KoGHyJ64spdkQbJOHJ216JMSKj8ii5m8gxqJ2ypL81p5hbjWtjbUgSc8M_KTLuc0Owf1R/3vr/dKbQ2pJ4XEfXhnZTBQY7ZrClnVCnd5cMe9ic/aNF0yyOSQVVOecUFkK9IYFVR8VHdVf4/Nfu3nOEskHki1_r3At1HLOMniS6qNTvhS0hfqIuBiQBsd5aB7OdfVpYy1HdIR72gMToBlpHPsE5GrVO0J9/gcyB2xcyZ3UpTom8G3V48LUkk6kcJ6l1SL5Fgzbst0z3pDA4dzBfswbC8dW57_MkswDANNd8atPrOBSU5m2z66dP/mIYQ8iq/DcmBexkARDI47VzYuw5gwy8Lvym2_B2gxBokU9_T/fHCPjlpqjTsY6SgBOz1nlDh_HcSWYAqnyrZxbEO2erVJ4WPKNzjM3KaPXGH/dZryna1E28wxCrMqLCs9aL9oVBlDMjUcEryAyRh7xwN0uWGopdpkd7Du6O9EPjAj37sHkUiVs7WL6JyexoDF_n67MICvQnJ9FK/FVrp1uMZnmr7ijkMW87moNRBkXbVc2EA_hHOHmpbVGqr6WgNtJ7bBk1LrAPT8sKtE75vbe_L9VYqBHJ/njk.WIIj-V23pwC7ZahcIL0XnDPupL7ltwEc779Ofhrk9dt_wIOFsA8XwnCjrYqH2ty.F0XdS\"*;@kDYgfL4dwE/5I@>k|u0D:wGz\"_8=}RJM!Ybbwd}eN=ZB*esF&(iQ%FW]_FSA:3Ze4O*6&tG-Fe**/j^a&S8zIa#6gxL2NmnNMSVGF-Bf3z08tt0ug_UfNshhs4HJh0l1o24gjAN-Uck1OvWkGQSXH0glB7CnOm0gI","attempt_num":8},{"event_name":"dropped","processed":"2017-10-13T18:56:21Z","attempt_num":3,"url":"G_3c-1HtUkN4`puC&&!u>0OiStFG.ZoRi2=j%fUVa]&re6k{hKqD-8vWE<hw-Bd>12Fb5JC6z>S@@'cWS~w5KtuIwv$8/JDD94CXx1n5yjC_I2lQ66zDj4MXe/4bqlcqqQ7evnQWTYx5roaEYMapyuzb/USpsyalh/HcYc9PmQfF8ND_C7bXnwFQ_fb_BHMXbIV8JN28/NjZdawDJ6kSWxLykSVTHzcISGPBRfs_rt3Uc65Vzj6LDSSMN8WRs70m0tAWs/fkDvjvm_7ZeV08YZeB9j9mS9BcE089Fn5UzDlTJW9vqDF5uipjlIVrNbM7oWE/MIJcjg2vJO20jA24WHrchrEXCvKcxriviSDl3tuyDxqdqRSekpm2aH6yW7_ylXj/nWsex4jm3rKvYw1uLq3Tp7qb9edhj8B_TnwLv1yjHSkgbA5jKI4BTqxugmwVTnFf2OFCFp/ZILLkoKgfwOyIK4reUIkhCjuhkwp/cqGaFAkeCFQXPB6DLYesLZ2M3KPuBsBrs3pr3HRbTtwaOzdKtGc8e0C0VTjrJ3GwljStMPrSuQWh6/vigHRasZ4P9kFv5DPVbHWZzPvtwUw0AMByt44YH678WpbAXXy4I/IVOHmErZTbw1mJ/3vd4uI5rr2zEO_YA9qJZLJT/wmBimbOyaMtmTNYr_FhgfkKMN3_1la7RCK8CIP3p26mbuHbdJV1j/5sTIKibInM5l2BoWdEi49bPqzagsfjKpGVbg0YQ8mjrLhI92/qy0eVYi34kBGVuLzxK2FLC8vwYUrbupjUYE23Mc_6nmHYRK1HF1QmZDZG1hw96I3MPbTZqeJOWGch230qDNxOgnHRNNM52k/3c7FeuRr88RwZGpif/4FaSAbdqkUNvJ9J9qX2tJS9x5vZlgD8k4YHIXDztrnwg2VPquj/uo_2MjbWybIF/NGJM2RFAsKV1S5iOejuTV4p12KlH1p0Dt5EpxCSIl0XoWuvyLYar77f_hzqNdWAyL0FDxGfj4ma4jwqdTTLNyeZEtguYoCHTFfY/HgJkpHx/yO23G7gLhKPvD459ceffHidFh7LipTxNF0GFXhIAPrWfhv7PkPmVofBoFFlo6/rMcHQ82d5VS8i1CCyLtfuT5WH9GqrsOY7xo3lxi7BNL93/PLRdQT3SObRFRERw68V5ZFvIuEQqFOFZQ848rWPLXYDGY658dyjZALf/Ug4EROi_ehNtzPwecer_RGBHxeMnpxrPAFZEL6YXNKzm8hh3HY4Uc4fgkjge5fXsR4CeTSkS66/FOD00deDKmN7XcHEj1LGlAmd4XlV8vFpXg2VazX4OLW8z6vXn5vntNGYO6eBCEKUwupRz9nQSMeZ/Pbmjoopyt6TxQBUfPkHBdgCIhqA1zDV72ARqGlK_ao9KVjvgbB98YeiieIyogkuOa4y0E5iUEdBopzovVgtY88yLijh9ww/tl0R5rI2P2_OxguTbv_wrfEm8jRjISEIqSE9q29RB3n8PeD4hu24rcsaEuTMCqniiLN0a2OtZiKxHnbsNB660Aq3/tEo2SHZBkkIFYXBbDNE7gLfvFz9ZaC_E2oV2quyK1Id5SkNkJBVRRgROWBc_XEOXktc4vRUKxy1MQ526Xilyo8/uI67lHH1Vlr4V3GVmweT4A16KMqzmVzvRDRFLpkBv2iu3Okc1vIqkC/426aOqeUm6SXIx16d8BWVRcmqKqizxDEF3JkLFgX0ab73CZ4GdJ9YaakJO7y4adFGzzIVLcn08UZ/pwDQ9BAuwuMc2yMnKihdvmLKbnAa1ATk9jFXQ9QAEMBHZLbPNvtS3pkpk0s6fyh2ceHa9Myy3fL/oqvPmq_14KzLgPZHaOlyb3tUoQM52fv/I78TqTGyB4WYD_vkm8gYHZcCF0dFIXsiXUbAbwR90Ldk8lsgxSL6rBvjPSlQq7N66NPzUVRYr3zSISupG_66uS4rJszHwmxmmraT3/zfVKxHXFHgxUDRmnwIMfdFKm4sf/qnRRccOLExJYGcZy8u65jo4gHDvO6vnpsdf0YtVWqDBJXa95/Y/qL7EYS73_t6/2xnWra9TTO0OtQNXEQ1XXLSLt6vPw1FTlE2aYCitDgUo7DyxiwuGtvmMKUkYCo/lqXouo2TGXZFF80lrCu1vKdxBgOOerlrsKrOJawGEzL8XzXdxkOMUT8HOzHPNOvDwsxc47mvpVzXEbX5DRaioOlm2U4flTG/6bZfLqJqHNtrKwC5U5NNG6_yNOW5Jg_bLmzUosi86IXxn7i04vRXXn92JmdE70TcdujehT1n15wtiD8ld5A65IV2W1801/wr0XcDIGiUSmxFfCozUCtBTFwln0uJ0cquSDXhj7JQADhYDGyz8WhqcPE7CP9xN93EUBrWczINbA4IsfckY8CZh68/Tak5dEhw8i_3rz/8U39D/iML1G_A8TsnKQ9/_S8o89fFc7Wx/f1nXF8H6OLVbPpp5IZg7UTZ2K0bSe3iBpsmkkJpxY_6zEHTJE3LbIANwF9Ik5Tu0ZJpjck7I07xlHR8mDW9FXclSQC/qJUGL5qByf2SY2Wd24hqKGrahLfqApQuRI8_DtU/Y8kH6DDif5kD6as3sIe6VbKYnU9c1URq/npTlE72m107FXxW9zktdzbBJAxt4udMFzjt2LPcBpqrMKGkrg4BHqKXwhFTspCWyYCjxJ/eFb3fd3BB5kb9D0yl3oOjeWtbJBqsboyzdLisRBn2MCtXO2O8eo4Hkm/2uJDoRjRCyIi2GNRkH0B3EkN6Z3vG40C985bAtM8eqHABzP2QRcKCz4ICOw_Xz249bJk8qM0/m4EeIWnx2ISf9TBU6_0KZ5QJ0VPOCPXxV9jCeK5W5/RV5nd7GUUXG0btDqUAa3DzpaRHX3klMAqL73hK4AGD3ItikmxF8vnSaqtsgOCpEePERt9qcUOJJP2aR0scPAf_1TkGSrgr5VF/XLM2i7YhC_3J9fA2Qwa0dbTedY/xGayjimEkuWSWvh7P5FNOum_l7qJPnA31lQq6ixqR0NKhO328rWfijqKHF6WR/5O0MJ4WNuIXk6xBtTOA9mK7CGUgWjaF5mB72PVnDpN8G6ERO39GqO/fCO96/A1mwIPWedF6HklU8jaQ_M5EUzwCsBE3/7FW2hbcD3GCOFCiLvObjn59o6CKoYlmTop/PZw2CLzvARAr5KaLhjIuZRSKTGlmYjvSoSELuvWi/QHUV7SJ0kF_1O3b_3a88cm/z7qD3Rp6MmoQdGPSyu1lXTpoETypgOMywfsr4ycV2LQr5XaE3UrQP/RzobA4rI_I3ceCUaRASmil2rV1TUiyljhdCFt8zmi1o2NyTzSBRNGP0lXU5Qtm6dKKp7lGRC19P2oSSFrxt85vWRNo1mv8odcL/TF7/MN1Ev7gY20MqlRSBrlwg5LZ4_Az7QnBnpbU3LkTC/oVb743VFtXMW4cK/3lw6wfBJZe_8DobxT_6/gCXp6QOs/LuqmrQHMQvTS6jfbqVFnPfLjrQ01Mb_F4lr3md6m87wpc1CYd9hdzgUL/aqz68HMDCxjGauC00Rajq9wGVYcWJ3j6rIaHIPwclftjARXFDg0yH8v/L6qDgIgGwbB3eZfjOXHAMXRFNMMihseZxYkcFAzLtYr94q9XpQeK4bKi9h_rWAMwcEHnS8/MHHlySbgy8azGEA0u9xsY96MRi45Qe74kZ9xlsI1t4Yutx8/gsjIiu7vNsKEyeTwd88BMExjWNcJHOSHRff57pJBMEAtPdbMETYorvUkRyErsqprxX0W45n0RRQ85w/JCOsYaxZOAFfzO0AdLpMCguFwl01fkFOKYrQeXfNn8w0KF4XS0k/fPx02fU7fFjUoXcPH7_9xo755WL8DNIU2ne4b6DpiROe473yUfD8_zSNUI1tpxzVYNA7GvVSYt8UtqHn3/_QwuOc4VeAI6RiAG5O5bcAxzQl96Q35emNwtTT_CYqHORCmyPj6By2hT_SCLf8m_xFxxe3YzvnxDZGq3qf__pq7Tw181/GosBAJy3MotiIxcYDASbY9sV4T2V/KoGHyJ64spdkQbJOHJ216JMSKj8ii5m8gxqJ2ypL81p5hbjWtjbUgSc8M_KTLuc0Owf1R/3vr/dKbQ2pJ4XEfXhnZTBQY7ZrClnVCnd5cMe9ic/aNF0yyOSQVVOecUFkK9IYFVR8VHdVf4/Nfu3nOEskHki1_r3At1HLOMniS6qNTvhS0hfqIuBiQBsd5aB7OdfVpYy1HdIR72gMToBlpHPsE5GrVO0J9/gcyB2xcyZ3UpTom8G3V48LUkk6kcJ6l1SL5Fgzbst0z3pDA4dzBfswbC8dW57_MkswDANNd8atPrOBSU5m2z66dP/mIYQ8iq/DcmBexkARDI47VzYuw5gwy8Lvym2_B2gxBokU9_T/fHCPjlpqjTsY6SgBOz1nlDh_HcSWYAqnyrZxbEO2erVJ4WPKNzjM3KaPXGH/dZryna1E28wxCrMqLCs9aL9oVBlDMjUcEryAyRh7xwN0uWGopdpkd7Du6O9EPjAj37sHkUiVs7WL6JyexoDF_n67MICvQnJ9FK/FVrp1uMZnmr7ijkMW87moNRBkXbVc2EA_hHOHmpbVGqr6WgNtJ7bBk1LrAPT8sKtE75vbe_L9VYqBHJ/njk.WIIj-V23pwC7ZahcIL0XnDPupL7ltwEc779Ofhrk9dt_wIOFsA8XwnCjrYqH2ty.F0XdS\"*;@kDYgfL4dwE/5I@>k|u0D:wGz\"_8=}RJM!Ybbwd}eN=ZB*esF&(iQ%FW]_FSA:3Ze4O*6&tG-Fe**/j^a&S8zIa#6gxL2NmnNMSVGF-Bf3z08tt0ug_UfNshhs4HJh0l1o24gjAN-Uck1OvWkGQSXH0glB7CnOm0gI","bounce_type":"hard","mx_server":"laborum nisi","http_user_agent":"quis re"}],"originating_ip":"204.173.18.0","categories":["dolor","pie"],"unique_args":"eu","outbound_ip":"181.40.184.87","outbound_ip_type":"dedicated","id":"2mMUdxV2HRfAeDiBTYs2IP"}}}}}}},{"responseCode":"400","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"invalid syntax: 'bad_field' is not a known field"}]}}}}}}},{"responseCode":"404","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"},"field":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"not found","field":"message_id"}]}}}}}}},{"responseCode":"429","schema":{"description":"","content":{"application/json":{"schema":{"type":"object","properties":{"errors":{"type":"array","items":{"type":"object","properties":{"message":{"type":"string"}}}}}},"examples":{"response":{"value":{"errors":[{"message":"too many requests"}]}}}}}}}]
```

Filter messages by message ID

```js
const client = require("@sendgrid/client");
client.setApiKey(process.env.SENDGRID_API_KEY);

const msg_id = "msg_id";

const request = {
  url: `/v3/messages/${msg_id}`,
  method: "GET",
};

client
  .request(request)
  .then(([response, body]) => {
    console.log(response.statusCode);
    console.log(response.body);
  })
  .catch((error) => {
    console.error(error);
  });
```

```python
import os
from sendgrid import SendGridAPIClient


sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))

msg_id = "msg_id"

response = sg.client.messages._(msg_id).get()

print(response.status_code)
print(response.body)
print(response.headers)
```

```csharp
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;

public class Program {
    public static async Task Main() {
        string apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);

        var msgId = "msg_id";

        var response = await client.RequestAsync(
            method: SendGridClient.Method.GET, urlPath: $"messages/{msgId}");

        Console.WriteLine(response.StatusCode);
        Console.WriteLine(response.Body.ReadAsStringAsync().Result);
        Console.WriteLine(response.Headers.ToString());
    }
}
```

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
    public static void main(String[] args) throws IOException {
        try {
            SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
            Request request = new Request();
            request.setMethod(Method.GET);
            request.setEndpoint("/messages/msg_id");
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}
```

```go
package main

import (
	"fmt"
	"github.com/sendgrid/sendgrid-go"
	"os"
)

func main() {
	apiKey := os.Getenv("SENDGRID_API_KEY")
	host := "https://api.sendgrid.com"
	request := sendgrid.GetRequest(apiKey, "/v3/messages/msg_id", host)
	request.Method = "GET"
	response, err := sendgrid.API(request)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
```

```php
<?php
// Uncomment the next line if you're using a dependency loader (such as Composer) (recommended)
// require 'vendor/autoload.php';

// Uncomment next line if you're not using a dependency loader (such as Composer)
// require_once '<PATH TO>/sendgrid-php.php';

$apiKey = getenv("SENDGRID_API_KEY");
$sg = new \SendGrid($apiKey);
$msg_id = "msg_id";

try {
    $response = $sg->client
        ->messages()
        ->_($msg_id)
        ->get();
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $ex) {
    echo "Caught exception: " . $ex->getMessage();
}
```

```ruby
require 'sendgrid-ruby'
include SendGrid

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
msg_id = "msg_id"

response = sg.client.messages._(msg_id).get()
puts response.status_code
puts response.headers
puts response.body
```

```bash
curl -X GET "https://api.sendgrid.com/v3/messages/msg_id" \
--header "Authorization: Bearer $SENDGRID_API_KEY"
```
