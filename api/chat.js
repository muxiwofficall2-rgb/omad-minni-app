const h=async(q,s)=>{
  const {r,body,cidOk,admins,rate,tg,kb,push}=await import('./_lib.js');
  const b=body(q);
  if(b.action==='reply'){ // бот -> клиент (ответ админа)
    if(q.headers['x-secret']!==process.env.ADMIN_SECRET||!cidOk(b.cid))return s.status(403).end();
    const text=String(b.text||'').slice(0,2000);
    await r('RPUSH','c:'+b.cid,JSON.stringify({from:'ad',text,t:Date.now()}));
    await r('LTRIM','c:'+b.cid,-100,-1);
    await r('EXPIRE','c:'+b.cid,345600); // 4 kundan keyin eski xabarlar o'zi o'chadi
    await push(b.cid,{title:'Omad Tour',body:text});
    return s.json({ok:1});
  }
  if(!cidOk(b.cid))return s.status(400).end();
  if(b.action==='submit'){ // Виза / Копи-центр: fayl + telefon -> Telegram
    if(!await rate('rl:'+b.cid,12,3600))return s.status(429).json({error:'rate'});
    const phone=String(b.phone||'').replace(/[^\d+]/g,'').slice(0,16);
    if(phone.replace(/\D/g,'').length<10)return s.status(400).json({error:'phone'});
    const m=/^data:([\w\/+.-]+);base64,(.+)$/.exec(b.data||'');
    if(!m)return s.status(400).json({error:'file'});
    const buf=Buffer.from(m[2],'base64');
    if(buf.length>3.2e6)return s.status(413).json({error:'big'});
    const kind=b.kind==='print'?'print':'visa',img=m[1].startsWith('image/');
    const name=String(b.name||'file').replace(/[^\w.\- ]/g,'_').slice(0,60);
    const cap=`${kind==='visa'?'🛂 Виза':'🖨 Копи-центр'}\n📞 ${phone}\nID: ${b.cid.slice(0,6)}`;
    let sent=0;
    for(const a of admins()){
      const f=new FormData();f.append('chat_id',a);f.append('caption',cap);f.append('reply_markup',JSON.stringify(kb(b.cid)));
      f.append(img?'photo':'document',new Blob([buf],{type:m[1]}),img?'photo.jpg':name);
      const t=await tg(img?'sendPhoto':'sendDocument',f);if(t.ok)sent++;
    }
    try{await r('SET','ph:'+b.cid,phone,'EX',2592000)}catch(e){}
    return sent?s.json({ok:1}):s.status(502).json({error:'telegram'});
  }
  if(b.action==='wipe'){for(const k of ['c:','ph:','rd:','p:'])await r('DEL',k+b.cid);return s.json({ok:1})}
  if(b.action==='sub'){if(b.sub&&b.sub.endpoint){await r('SADD','p:'+b.cid,JSON.stringify(b.sub));await r('EXPIRE','p:'+b.cid,2592000)}return s.json({ok:1})}
  if(b.action==='send'&&(b.text||b.img)){ // клиент -> Telegram админу
    if(!await rate('rl:'+b.cid,60,3600))return s.status(429).end();
    const ph=await r('GET','ph:'+b.cid).catch(()=>null),text=String(b.text||'').slice(0,800);
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
  const l=(await r('LRANGE','c:'+b.cid,-50,-1))||[],rd=Number(await r('GET','rd:'+b.cid).catch(()=>0))||0;
  s.json({msgs:l.map(x=>JSON.parse(x)),read:rd});
};
export default async(q,s)=>{try{return await h(q,s)}catch(e){return s.status(500).json({error:String(e&&e.message||e).slice(0,100)})}};
