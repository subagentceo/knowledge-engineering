const FUNCTIONS=['operator','product','project','finance','legal'];
const TIERS=['manager','coworker','subagent'];
const DOMAIN='subagentknowledge.com';
function roleFor(a){const l=String(a||'').toLowerCase().split('@')[0].split('+')[0];const p=l.split('-');if(p.length===2&&FUNCTIONS.includes(p[0])&&TIERS.includes(p[1]))return {role:l,fn:p[0],tier:p[1]};return null;}
function allAddrs(){const o=[];for(const f of FUNCTIONS)for(const t of TIERS)o.push(f+'-'+t+'@'+DOMAIN);return o;}
export default {
 async email(message,env,ctx){
  const r=roleFor(message.to);
  if(!r){message.setReject('No such agent at '+DOMAIN);return;}
  const h=message.headers;const subject=(h&&h.get&&h.get('subject'))||'';const mid=(h&&h.get&&h.get('message-id'))||'';
  const rec={_type:'envelope',id:crypto.randomUUID(),envelope_type:'task',from:message.from,to:r.role,subject,at:new Date().toISOString(),state:'pending',thread_id:mid,payload:{channel:'email',rcpt:message.to,fn:r.fn,tier:r.tier,coding:r.tier==='subagent'}};
  if(env.INBOX){await env.INBOX.put('mail:'+r.role+':'+Date.now()+':'+rec.id,JSON.stringify(rec),{metadata:{from:message.from,subject,tier:r.tier}});}
 },
 async fetch(req,env){
  const url=new URL(req.url);const ADDRS=allAddrs();
  if(url.pathname==='/api/manifest'){return Response.json({name:'agent-inbox',domain:DOMAIN,functions:FUNCTIONS,tiers:TIERS,addresses:ADDRS});}
  if(url.pathname==='/api/inbox'){const role=url.searchParams.get('role');if(!env.INBOX)return Response.json({error:'no kv'},{status:500});const list=await env.INBOX.list({prefix:role?('mail:'+role+':'):'mail:',limit:50});return Response.json({count:list.keys.length,keys:list.keys.map(k=>({name:k.name,meta:k.metadata}))});}
  return Response.json({name:'agent-inbox',addresses:ADDRS});
 }
};
