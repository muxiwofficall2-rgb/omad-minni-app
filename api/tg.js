// Telegram webhook: «Ответить» tugmasi va admin javobi (bothost kerak emas)
import {createHash} from 'node:crypto';
const h=async(q,s)=>{
  const {r,body,admins,tg,push,cidOk}=await import('./_lib.js');
  const sec=createHash('sha256').update(process.env.ADMIN_SECRET||'').digest('hex');
  if(q.method!=='POST'||q.headers['x-telegram-bot-api-secret-token']!==sec)return s.status(403).end();
  const u=body(q),ids=admins(),cb=u.callback_query;
  if(cb){
    const uid=String(cb.from.id),d=cb.data||'',cid=d.slice(2);
    if(!d.startsWith('r:')||!cidOk(cid))return s.json({ok:1});
    if(!ids.includes(uid)){await tg('answerCallbackQuery',{callback_query_id:cb.id,text:`⛔ Ruxsat yo'q. Sizning ID: ${uid}. ADMIN_CHAT_ID shu bo'lishi kerak.`,show_alert:true});return s.json({ok:1})}
    await r('SET','adm:'+uid,cid,'EX',1800);
    await tg('answerCallbackQuery',{callback_query_id:cb.id});
    await tg('sendMessage',{chat_id:cb.message.chat.id,text:'✍️ Напишите ответ клиенту. Отмена: /cancel',reply_markup:{force_reply:true,input_field_placeholder:'Ответ клиенту…'}});
    return s.json({ok:1});
  }
  const m=u.message;if(!m||!m.text)return s.json({ok:1});
  const uid=String(m.from.id),t=m.text.trim();
  if(/^\/(start|ping|id)\b/.test(t)){await tg('sendMessage',{chat_id:m.chat.id,text:`✅ Support bot ishlayapti.\nSizning ID: ${uid}`});return s.json({ok:1})}
  if(!ids.includes(uid))return s.json({ok:1});
  const cid=await r('GET','adm:'+uid);
  if(/^\/cancel\b/.test(t)){await r('DEL','adm:'+uid);await tg('sendMessage',{chat_id:m.chat.id,text:'Отменено'});return s.json({ok:1})}
  if(!cid||t[0]==='/')return s.json({ok:1});
  await r('DEL','adm:'+uid);
  await r('RPUSH','c:'+cid,JSON.stringify({from:'ad',text:t.slice(0,2000),t:Date.now()}));
  await r('LTRIM','c:'+cid,-100,-1);
  await push(cid,{title:'Omad Tour',body:t.slice(0,200)});
  await tg('sendMessage',{chat_id:m.chat.id,text:'✅ Отправлено клиенту',reply_markup:{inline_keyboard:[[{text:'✉️ Ответить ещё',callback_data:'r:'+cid}]]}});
  return s.json({ok:1});
};
export default async(q,s)=>{try{return await h(q,s)}catch(e){return s.status(200).json({error:String(e&&e.message||e).slice(0,100)})}};
