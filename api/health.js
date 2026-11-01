// Tekshiruv: brauzerda  https://SAYT/api/health  oching. Sirlar ko'rsatilmaydi, faqat bor/yo'q.
// Test xabar:  https://SAYT/api/health?test=ADMIN_SECRET_QIYMATI
const A=process.env,KU=A.KV_REST_API_URL||A.UPSTASH_REDIS_REST_URL,KT=A.KV_REST_API_TOKEN||A.UPSTASH_REDIS_REST_TOKEN;
const kv=async(...c)=>(await(await fetch(KU,{method:'POST',headers:{Authorization:'Bearer '+KT},body:JSON.stringify(c)})).json());
const tg=(m,x)=>fetch(`https://api.telegram.org/bot${A.BOT_TOKEN}/${m}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(x)}).then(a=>a.json());
export default async(q,s)=>{
  const ids=(A.ADMIN_CHAT_ID||'').split(',').map(x=>x.trim()).filter(Boolean);
  const o={env:{REDIS_URL:!!KU,REDIS_TOKEN:!!KT,...Object.fromEntries(['BOT_TOKEN','ADMIN_SECRET','VAPID_PUBLIC','VAPID_PRIVATE'].map(k=>[k,!!A[k]]))},admins:ids.length};
  try{await import('web-push');o.webpush='ok'}catch(e){o.webpush='YO\'Q (package.json repoda bormi?): '+String(e.message).slice(0,80)}
  try{const l=await import('./_lib.js');o.lib='ok';o.vapid=l.vapidError?'XATO: '+l.vapidError.slice(0,90):(A.VAPID_PUBLIC&&A.VAPID_PRIVATE?'ok':'kiritilmagan')}catch(e){o.lib='YIQILDI: '+String(e.message).slice(0,120)}
  try{const x=await kv('PING');o.redis=x.result||x.error||'?'}catch(e){o.redis='XATO: '+String(e.message).slice(0,80)}
  try{const m=await tg('getMe',{});o.bot=m.ok?'@'+m.result.username:m.description}catch(e){o.bot='XATO: '+String(e.message).slice(0,80)}
  if(A.ADMIN_SECRET&&q.query&&q.query.test===A.ADMIN_SECRET){
    o.test=[];for(const a of ids){try{const m=await tg('sendMessage',{chat_id:a,text:'✅ Omad Tour: server ↔ bot ishlayapti'});o.test.push(m.ok?'yuborildi':m.description)}catch(e){o.test.push('XATO: '+e.message)}}
  }
  s.json(o);
};
