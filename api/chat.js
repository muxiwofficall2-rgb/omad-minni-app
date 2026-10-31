import {r,body,cidOk,admins,rate,tg,kb,push} from './_lib.js';
export default async(q,s)=>{
  const b=body(q);
  if(b.action==='reply'){ // бот -> клиент (ответ админа)
    if(q.headers['x-secret']!==process.env.ADMIN_SECRET||!cidOk(b.cid))return s.status(403).end();
    const text=String(b.text||'').slice(0,2000);
    await r('RPUSH','c:'+b.cid,JSON.stringify({from:'ad',text,t:Date.now()}));
    await r('LTRIM','c:'+b.cid,-100,-1);
    await push(b.cid,{title:'Omad Tour',body:text});
    return s.json({ok:1});
  }
  if(!cidOk(b.cid))return s.status(400).end();
  if(b.action==='sub'){if(b.sub&&b.sub.endpoint)await r('SADD','p:'+b.cid,JSON.stringify(b.sub));return s.json({ok:1})}
  if(b.action==='send'&&(b.text||b.img)){ // клиент -> Telegram админу
    if(!await rate('rl:'+b.cid,60,3600))return s.status(429).end();
    const ph=await r('GET','ph:'+b.cid),text=String(b.text||'').slice(0,800);
    const cap=`💬 Чат${ph?'\n📞 '+ph:''}\nID: ${b.cid.slice(0,6)}\n${text}`;
    const ok=typeof b.img==='string'&&b.img.startsWith('data:image/jpeg;base64,')&&b.img.length<4e6;let sent=0;
    for(const a of admins()){
      let m;
      if(ok){const f=new FormData();f.append('chat_id',a);f.append('caption',cap);f.append('reply_markup',JSON.stringify(kb(b.cid)));
        f.append('photo',new Blob([Buffer.from(b.img.split(',')[1],'base64')],{type:'image/jpeg'}),'photo.jpg');m=await tg('sendPhoto',f)}
      else m=await tg('sendMessage',{chat_id:a,text:cap,reply_markup:kb(b.cid)});
      if(m.ok)sent++;
    }
    return sent?s.json({ok:1}):s.status(502).end();
  }
  const l=(await r('LRANGE','c:'+b.cid,-50,-1))||[];
  s.json({msgs:l.map(x=>JSON.parse(x))});
};
