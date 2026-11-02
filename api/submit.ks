// Виза / Копи-центр: файл + телефон -> Telegram админу (кнопка «Ответить»)
const h=async(q,s)=>{
  const {r,body,cidOk,admins,rate,tg,kb}=await import('./_lib.js');
  if(q.method!=='POST')return s.status(405).end();
  const b=body(q),cid=b.cid;
  if(!cidOk(cid))return s.status(400).json({error:'cid'});
  if(!await rate('rl:'+cid,12,3600))return s.status(429).json({error:'rate'});
  const phone=String(b.phone||'').replace(/[^\d+]/g,'').slice(0,16);
  if(phone.replace(/\D/g,'').length<10)return s.status(400).json({error:'phone'});
  const m=/^data:([\w\/+.-]+);base64,(.+)$/.exec(b.data||'');
  if(!m)return s.status(400).json({error:'file'});
  const buf=Buffer.from(m[2],'base64');
  if(buf.length>3.2e6)return s.status(413).json({error:'big'});
  const kind=b.kind==='print'?'print':'visa',img=m[1].startsWith('image/');
  const name=String(b.name||'file').replace(/[^\w.\- ]/g,'_').slice(0,60);
  const cap=`${kind==='visa'?'🛂 Виза':'🖨 Копи-центр'}\n📞 ${phone}\nID: ${cid.slice(0,6)}`;
  let sent=0;
  for(const a of admins()){
    const f=new FormData();f.append('chat_id',a);f.append('caption',cap);f.append('reply_markup',JSON.stringify(kb(cid)));
    f.append(img?'photo':'document',new Blob([buf],{type:m[1]}),img?'photo.jpg':name);
    const t=await tg(img?'sendPhoto':'sendDocument',f);if(t.ok)sent++;
  }
  try{await r('SET','ph:'+cid,phone,'EX',2592000)}catch(e){}
  return sent?s.json({ok:1}):s.status(502).json({error:'telegram'});
};
export default async(q,s)=>{try{return await h(q,s)}catch(e){return s.status(500).json({error:String(e&&e.message||e).slice(0,100)})}};
