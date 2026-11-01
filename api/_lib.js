// Bu fayl hech qachon yuklashda yiqilmaydi: web-push faqat kerak bo'lganda yuklanadi.
const U=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,T=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
export const r=async(...c)=>(await(await fetch(U,{method:'POST',headers:{Authorization:'Bearer '+T},body:JSON.stringify(c)})).json()).result;
export const body=q=>typeof q.body==='string'?JSON.parse(q.body||'{}'):(q.body||{});
export const phoneOf=async q=>{const t=(q.headers.authorization||'').slice(7);return t?r('GET','s:'+t):null};
export const cidOk=c=>/^[a-f0-9]{24}$/.test(c||'');
export const admins=()=>(process.env.ADMIN_CHAT_ID||'').split(',').map(x=>x.trim()).filter(Boolean);
export const rate=async(k,max,sec)=>{const n=await r('INCR',k);if(n===1)await r('EXPIRE',k,sec);return n<=max};
export const tg=(m,x)=>fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/${m}`,{method:'POST',...(x instanceof FormData?{body:x}:{headers:{'content-type':'application/json'},body:JSON.stringify(x)})}).then(a=>a.json());
export const kb=cid=>({inline_keyboard:[[{text:'✉️ Ответить',callback_data:'r:'+cid}]]});
async function wp(){
  const w=(await import('web-push')).default;let sj=(process.env.VAPID_SUBJECT||'').trim();
  if(!/^(mailto:|https?:\/\/)/.test(sj))sj='mailto:'+(sj||'admin@example.com');
  w.setVapidDetails(sj,(process.env.VAPID_PUBLIC||'').trim(),(process.env.VAPID_PRIVATE||'').trim());return w;
}
export const vapidCheck=async()=>{if(!process.env.VAPID_PUBLIC||!process.env.VAPID_PRIVATE)return 'kiritilmagan';try{await wp();return 'ok'}catch(e){return 'XATO: '+String(e.message).slice(0,90)}};
export async function push(cid,payload){ // xato bo'lsa ham javob yo'qolmaydi
  try{const w=await wp(),subs=(await r('SMEMBERS','p:'+cid))||[];
    for(const s of subs){try{await w.sendNotification(JSON.parse(s),JSON.stringify(payload))}catch(e){if(e.statusCode===404||e.statusCode===410)await r('SREM','p:'+cid,s)}}}catch(e){}
}
