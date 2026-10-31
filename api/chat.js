import {r,body,phoneOf,push} from './_lib.js';
const tg=(m,x)=>fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/${m}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(x)}).then(a=>a.json());
export default async(q,s)=>{
  const b=body(q);
  if(b.action==='reply'){ // bot -> client (admin reply)
    if(q.headers['x-secret']!==process.env.ADMIN_SECRET)return s.status(403).end();
    await r('RPUSH','c:'+b.phone,JSON.stringify({from:'admin',text:b.text,t:Date.now()}));
    await push(b.phone,{title:'Omad Tour',body:b.text});
    return s.json({ok:1});
  }
  const phone=await phoneOf(q); if(!phone)return s.status(401).end();
  if(b.action==='sub'){await r('SADD','p:'+phone,JSON.stringify(b.sub));return s.json({ok:1})}
  if(b.action==='send'&&(b.text||b.img)){ // client -> Telegram admin group
    const text=String(b.text||'').slice(0,2000),cap=`📩 +${phone}\n${text}`;
    const ok=typeof b.img==='string'&&b.img.startsWith('data:image/jpeg;base64,')&&b.img.length<4e6;
    await r('RPUSH','c:'+phone,JSON.stringify({from:'me',text,photo:ok?1:undefined,t:Date.now()}));
    let m;
    if(ok){const f=new FormData();f.append('chat_id',process.env.ADMIN_CHAT_ID);f.append('caption',cap);
      f.append('photo',new Blob([Buffer.from(b.img.split(',')[1],'base64')],{type:'image/jpeg'}),'photo.jpg');
      m=await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`,{method:'POST',body:f}).then(a=>a.json())}
    else m=await tg('sendMessage',{chat_id:process.env.ADMIN_CHAT_ID,text:cap});
    if(m.result)await r('SET','m:'+m.result.message_id,phone,'EX',2592000);
    return s.json({ok:1});
  }
  const l=(await r('LRANGE','c:'+phone,-100,-1))||[];
  s.json({phone,msgs:l.map(x=>JSON.parse(x))});
};
