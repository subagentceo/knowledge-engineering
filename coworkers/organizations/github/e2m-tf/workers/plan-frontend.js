const APP='https://www.agent-native.com/docs/template-plan';
export default {
 async fetch(req){
  const url=new URL(req.url);
  if(url.pathname==='/api/manifest')return Response.json({name:'plan-frontend',template:'agent-native/plan',domain:'plan.subagentknowledge.com',note:'SSR build promotes via CI; terraform-managed shell'});
  return new Response('<!doctype html><meta charset=utf-8><title>plan</title><style>body{font:15px system-ui;margin:3rem;max-width:40rem}</style><h1>plan.subagentknowledge.com</h1><p>Agent-Native Plan (visual-plan) frontend. Terraform-managed shell; SSR build promotes via CI.</p>',{headers:{'content-type':'text/html; charset=utf-8'}});
 }
};
