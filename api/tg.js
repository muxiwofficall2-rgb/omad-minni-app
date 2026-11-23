// Telegram webhook (Vercel): faqat Vercel'da ishlatilsa kerak. Rossiya serverida server.js o'zi so'raydi.
import {createHash} from 'node:crypto';
import {makeCore} from './_core.js';
const h=async(q,s)=>{
  const L=await import('./_lib.js');
  const sec=createHash('sha256').update(process.env.ADMIN_SECRET||'').digest('hex');
  if(q.method!=='POST'||q.headers['x-telegram-bot-api-secret-token']!==sec)return s.status(403).end();
  const core=makeCore({r:L.r,tg:L.tg,tgFile:L.tgFile,admins:L.admins,push:L.push,env:process.env});
  await core.onUpdate(L.body(q));
  return s.json({ok:1});
};
export default async(q,s)=>{try{return await h(q,s)}catch(e){return s.status(200).json({error:String(e&&e.message||e).slice(0,100)})}};
