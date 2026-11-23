// Omad Tour biznes-mantiq: Vercel ham, Rossiya serveri ham shu bitta fayldan foydalanadi.
import {scryptSync,randomBytes,timingSafeEqual} from 'node:crypto';
export function makeCore(D){
  const {r,tg,tgFile,admins,push}=D,E=D.env||{};
  const cidOk=c=>/^[a-f0-9]{24}$/.test(c||'');
  const rate=async(k,max,sec)=>{try{const n=await r('INCR',k);if(n===1)await r('EXPIRE',k,sec);return n<=max}catch{return true}};
  const kb=cid=>({inline_keyboard:[[{text:'✉️ Ответить',callback_data:'r:'+cid}]]});
  // --- javobsiz mijozlar
  const markPending=async(cid,kind,phone,text)=>{try{await r('SADD','pend',cid);await r('SET','lm:'+cid,JSON.stringify({t:Date.now(),k:kind,p:phone||'',x:String(text||'').replace(/\s+/g,' ').slice(0,70)}),'EX',604800)}catch{}};
  const clearPending=async cid=>{try{await r('SREM','pend',cid)}catch{}};
  const touch=async cid=>{await r('LTRIM','c:'+cid,-100,-1);await r('EXPIRE','c:'+cid,345600);await r('SET','rd:'+cid,String(Date.now()),'EX',604800)};
  // --- akkaunt (pochta + 4 xonali PIN)
  const MAIL=(E.MAIL_DOMAINS||'mail.ru,bk.ru,inbox.ru,list.ru,internet.ru,yandex.ru,ya.ru,yandex.com,yandex.kz,yandex.by,yandex.uz,rambler.ru').split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
  const normMail=x=>String(x||'').trim().toLowerCase();
  const mailOk=e=>/^[a-z0-9._%+-]{1,64}@[a-z0-9.-]+\.[a-z]{2,}$/.test(e)&&MAIL.includes(e.split('@')[1]);
  const hashPin=(pin,salt)=>scryptSync(pin,salt,32).toString('hex');
  // --- Telegramdan rasm/fayl olib saqlash
  const saveMedia=async(cid,fileId,mime,name)=>{const {buf}=await tgFile(fileId);if(buf.length>7e5)throw new Error('big');const id=randomBytes(6).toString('hex');await r('SET',`img:${cid}:${id}`,JSON.stringify({m:mime,n:name,d:buf.toString('base64')}),'EX',345600);return id};
  const pickPhoto=ph=>[...ph].reverse().find(p=>(p.file_size||0)<=7e5)||ph[0];
  async function media(cid,id){if(!cidOk(cid)||!/^[a-f0-9]{12}$/.test(id||''))return null;const v=await r('GET',`img:${cid}:${id}`);if(!v)return null;const o=JSON.parse(v);return{mime:o.m,name:o.n,buf:Buffer.from(o.d,'base64')}}

  // ================= /api/chat =================
  async function chat(b,h){
    if(b.action==='reply'){ // tashqi bot -> mijoz (maxfiy kalit bilan)
      if(h['x-secret']!==E.ADMIN_SECRET||!cidOk(b.cid))return[403,{}];
      const text=String(b.text||'').slice(0,2000);
      await r('RPUSH','c:'+b.cid,JSON.stringify({from:'ad',text,t:Date.now()}));await touch(b.cid);await clearPending(b.cid);
      await push(b.cid,{title:'Omad Tour',body:text});return[200,{ok:1}];
    }
    if(!cidOk(b.cid))return[400,{error:'cid'}];
    if(b.action==='reg'||b.action==='login'){
      const email=normMail(b.email),pin=String(b.pin||'');
      if(!mailOk(email))return[400,{error:'mail'}];
      if(!/^\d{4}$/.test(pin))return[400,{error:'pin'}];
      if(b.action==='reg'){
        if(!await rate('rg:'+b.cid,5,3600))return[429,{error:'rate'}];
        if(await r('GET','u:'+email))return[409,{error:'exists'}];
        const salt=randomBytes(16).toString('hex');
        await r('SET','u:'+email,JSON.stringify({s:salt,h:hashPin(pin,salt),cid:b.cid,t:Date.now()}));
        for(const a of admins()){try{await tg('sendMessage',{chat_id:a,text:`🆕 Новый пользователь\n✉️ ${email}\nID: ${b.cid.slice(0,6)}`,reply_markup:kb(b.cid)})}catch{}}
        return[200,{ok:1,email}];
      }
      const lk='lk:'+email;if((Number(await r('GET',lk))||0)>=5)return[429,{error:'locked'}];
      const raw=await r('GET','u:'+email),u=raw?JSON.parse(raw):null;let ok=false;
      if(u){const a=Buffer.from(hashPin(pin,u.s),'hex'),c=Buffer.from(u.h,'hex');ok=a.length===c.length&&timingSafeEqual(a,c)}
      if(!ok){const n=await r('INCR',lk);if(n===1)await r('EXPIRE',lk,900);return[401,{error:'bad'}]}
      await r('DEL',lk);return[200,{ok:1,cid:u.cid,email}];
    }
    if(b.action==='submit'){ // Виза / Копи-центр: fayl + telefon -> Telegram
      if(!await rate('rl:'+b.cid,12,3600))return[429,{error:'rate'}];
      const phone=String(b.phone||'').replace(/[^\d+]/g,'').slice(0,16);
      if(phone.replace(/\D/g,'').length<10)return[400,{error:'phone'}];
      const m=/^data:([\w\/+.-]+);base64,(.+)$/.exec(b.data||'');if(!m)return[400,{error:'file'}];
      const buf=Buffer.from(m[2],'base64');if(buf.length>3.2e6)return[413,{error:'big'}];
      const kind=b.kind==='print'?'print':'visa',img=m[1].startsWith('image/');
      const name=String(b.name||'file').replace(/[^\w.\- ]/g,'_').slice(0,60);
      const cap=`${kind==='visa'?'🛂 Виза':'🖨 Копи-центр'}\n📞 ${phone}\nID: ${b.cid.slice(0,6)}`;let sent=0;
      for(const a of admins()){
        const f=new FormData();f.append('chat_id',a);f.append('caption',cap);f.append('reply_markup',JSON.stringify(kb(b.cid)));
        f.append(img?'photo':'document',new Blob([buf],{type:m[1]}),img?'photo.jpg':name);
        try{const t=await tg(img?'sendPhoto':'sendDocument',f);if(t.ok)sent++;else console.error('tg',t.description)}catch(e){console.error('tg',e.message)}
      }
      try{await r('SET','ph:'+b.cid,phone,'EX',2592000)}catch{}
      if(sent)await markPending(b.cid,kind,phone,name);
      return sent?[200,{ok:1}]:[502,{error:'telegram'}];
    }
    if(b.action==='wipe'){for(const k of ['c:','ph:','rd:','p:','lm:'])await r('DEL',k+b.cid);await clearPending(b.cid);return[200,{ok:1}]}
    if(b.action==='sub'){if(b.sub&&b.sub.endpoint){await r('SADD','p:'+b.cid,JSON.stringify(b.sub));await r('EXPIRE','p:'+b.cid,2592000)}return[200,{ok:1}]}
    if(b.action==='send'&&(b.text||b.img)){ // chatdan matn / rasm -> Telegram
      if(!await rate('rl:'+b.cid,60,3600))return[429,{}];
      let ph=null;try{ph=await r('GET','ph:'+b.cid)}catch{}
      const text=String(b.text||'').slice(0,800),cap=`💬 Чат${ph?'\n📞 '+ph:''}\nID: ${b.cid.slice(0,6)}\n${text}`;
      const ok=typeof b.img==='string'&&b.img.startsWith('data:image/jpeg;base64,')&&b.img.length<4e6;let sent=0;
      for(const a of admins()){
        try{let m;
          if(ok){const f=new FormData();f.append('chat_id',a);f.append('caption',cap);f.append('reply_markup',JSON.stringify(kb(b.cid)));
            f.append('photo',new Blob([Buffer.from(b.img.split(',')[1],'base64')],{type:'image/jpeg'}),'photo.jpg');m=await tg('sendPhoto',f)}
          else m=await tg('sendMessage',{chat_id:a,text:cap,reply_markup:kb(b.cid)});
          if(m.ok)sent++;else console.error('tg',m.description)}catch(e){console.error('tg',e.message)}
      }
      if(sent)await markPending(b.cid,'chat',ph,text||'[foto]');
      return sent?[200,{ok:1}]:[502,{error:'telegram'}];
    }
    const l=(await r('LRANGE','c:'+b.cid,-50,-1))||[],rd=Number(await r('GET','rd:'+b.cid))||0;
    return[200,{msgs:l.map(x=>JSON.parse(x)),read:rd}];
  }

  // ================= admin: javobsiz mijozlar =================
  async function unanswered(chat_id){
    const ids=[...((await r('SMEMBERS','pend'))||[])],items=[];
    for(const cid of ids){const v=await r('GET','lm:'+cid);if(!v){await clearPending(cid);continue}try{items.push({cid,...JSON.parse(v)})}catch{}}
    items.sort((a,b)=>a.t-b.t);
    if(!items.length)return tg('sendMessage',{chat_id,text:'✅ Javobsiz mijozlar yo‘q — hammasiga javob berilgan.'});
    const ago=t=>{const m=Math.max(1,Math.round((Date.now()-t)/6e4));return m<60?m+' daq':m<1440?Math.round(m/60)+' soat':Math.round(m/1440)+' kun'};
    const ic={chat:'💬',visa:'🛂',print:'🖨'},top=items.slice(0,10);
    const text=`⏳ Javobsiz mijozlar: ${items.length}\n\n`+top.map((x,i)=>`${i+1}. ${ic[x.k]||'💬'} ${x.p||'ID '+x.cid.slice(0,6)} · ${ago(x.t)} oldin${x.x?'\n    '+x.x:''}`).join('\n')+(items.length>10?`\n\n… yana ${items.length-10} ta`:'');
    return tg('sendMessage',{chat_id,text,reply_markup:{inline_keyboard:top.map((x,i)=>[{text:`✉️ ${i+1}`,callback_data:'r:'+x.cid},{text:`✅ ${i+1} yopish`,callback_data:'x:'+x.cid}])}});
  }

  // ================= Telegram yangilanishlari =================
  async function onUpdate(u){
    const ids=admins(),cb=u.callback_query;
    if(cb){
      const uid=String(cb.from.id),d=cb.data||'',cid=d.slice(2);
      if(!(d.startsWith('r:')||d.startsWith('x:'))||!cidOk(cid))return;
      if(!ids.includes(uid))return void await tg('answerCallbackQuery',{callback_query_id:cb.id,text:`⛔ Ruxsat yo'q. Sizning ID: ${uid}. ADMIN_CHAT_ID shu bo'lishi kerak.`,show_alert:true});
      if(d[0]==='x'){await clearPending(cid);return void await tg('answerCallbackQuery',{callback_query_id:cb.id,text:'Yopildi'})}
      await r('SET','adm:'+uid,cid,'EX',1800);await r('SET','rd:'+cid,String(Date.now()),'EX',604800);
      await tg('answerCallbackQuery',{callback_query_id:cb.id});
      return void await tg('sendMessage',{chat_id:cb.message.chat.id,text:'✍️ Напишите ответ клиенту (текст, фото или файл). Отмена: /cancel',reply_markup:{force_reply:true,input_field_placeholder:'Ответ клиенту…'}});
    }
    const m=u.message;if(!m)return;
    const uid=String(m.from.id),t=(m.text||'').trim(),isAdmin=ids.includes(uid);
    if(/^\/(start|ping|id)\b/.test(t))return void await tg('sendMessage',{chat_id:m.chat.id,text:`✅ Support bot ishlayapti.\nSizning ID: ${uid}`,...(isAdmin?{reply_markup:{keyboard:[[{text:'📋 Javobsiz qolganlar'}]],resize_keyboard:true,is_persistent:true}}:{})});
    if(!isAdmin)return;
    if(/javobsiz/i.test(t))return void await unanswered(m.chat.id);
    const rs=/^\/reset\s+(\S+)/.exec(t);
    if(rs){const e=normMail(rs[1]);const had=await r('GET','u:'+e);await r('DEL','u:'+e);await r('DEL','lk:'+e);return void await tg('sendMessage',{chat_id:m.chat.id,text:had?`♻️ ${e} — akkaunt o‘chirildi, mijoz qayta ro‘yxatdan o‘tishi mumkin.`:`${e} — bunday akkaunt topilmadi.`})}
    const cid=await r('GET','adm:'+uid);
    if(/^\/cancel\b/.test(t)){await r('DEL','adm:'+uid);return void await tg('sendMessage',{chat_id:m.chat.id,text:'Отменено'})}
    const again=cid=>({inline_keyboard:[[{text:'✉️ Ответить ещё',callback_data:'r:'+cid}]]});
    if(m.photo||m.document){ // admin rasm/fayl -> mijoz
      if(!cid)return void await tg('sendMessage',{chat_id:m.chat.id,text:'Avval mijoz xabaridagi «✉️ Ответить» tugmasini bosing, keyin rasm yuboring.'});
      const cap=String(m.caption||'').slice(0,1000);
      try{
        let msg;
        if(m.photo){const p=pickPhoto(m.photo);msg={from:'ad',img:await saveMedia(cid,p.file_id,'image/jpeg','photo.jpg'),text:cap,t:Date.now()}}
        else{const dc=m.document;if((dc.file_size||0)>7e5)throw new Error('big');const id=await saveMedia(cid,dc.file_id,dc.mime_type||'application/octet-stream',dc.file_name||'file');
          msg=/^image\//.test(dc.mime_type||'')?{from:'ad',img:id,text:cap,t:Date.now()}:{from:'ad',file:{id,name:dc.file_name||'file'},text:cap,t:Date.now()}}
        await r('DEL','adm:'+uid);await r('RPUSH','c:'+cid,JSON.stringify(msg));await touch(cid);await clearPending(cid);
        await push(cid,{title:'Omad Tour',body:cap||(msg.img?'Фото':'Файл')});
        await tg('sendMessage',{chat_id:m.chat.id,text:'✅ Отправлено клиенту',reply_markup:again(cid)});
      }catch(e){await tg('sendMessage',{chat_id:m.chat.id,text:e.message==='big'?'⚠️ Fayl katta (700 KB gacha). Rasmni «сжать» qilib yuboring.':'⚠️ Yuborilmadi: '+String(e.message).slice(0,80)})}
      return;
    }
    if(!cid||!t||t[0]==='/')return;
    await r('DEL','adm:'+uid);
    await r('RPUSH','c:'+cid,JSON.stringify({from:'ad',text:t.slice(0,2000),t:Date.now()}));await touch(cid);await clearPending(cid);
    await push(cid,{title:'Omad Tour',body:t.slice(0,200)});
    await tg('sendMessage',{chat_id:m.chat.id,text:'✅ Отправлено клиенту',reply_markup:again(cid)});
  }
  return{chat,onUpdate,media,cidOk,pendingCount:async()=>((await r('SMEMBERS','pend'))||[]).length};
}
