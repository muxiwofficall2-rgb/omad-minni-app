import crypto from 'crypto';
import {r,body} from './_lib.js';
export default async(q,s)=>{
  const {action,phone:p,code}=body(q);
  const phone=String(p||'').replace(/\D/g,'');
  if(phone.length<10||phone.length>15)return s.status(400).json({error:'phone'});
  if(action==='send'){
    const n=await r('INCR','rl:'+phone); if(n===1)await r('EXPIRE','rl:'+phone,600);
    if(n>3)return s.status(429).json({error:'limit'});
    const c=String(crypto.randomInt(100000,999999));
    await r('SET','otp:'+phone,c,'EX',300); await r('DEL','try:'+phone);
    const m=encodeURIComponent(`Omad Tour: ${c}`);
    await fetch(`https://sms.ru/sms/send?api_id=${process.env.SMSRU_KEY}&to=${phone}&msg=${m}&json=1`);
    return s.json({ok:1,...(process.env.DEV_OTP?{dev:c}:{})});
  }
  if(action==='verify'){
    const t=await r('INCR','try:'+phone); await r('EXPIRE','try:'+phone,300);
    if(t>5)return s.status(429).json({error:'limit'});
    const c=await r('GET','otp:'+phone);
    if(!c||c!==String(code))return s.status(401).json({error:'code'});
    await r('DEL','otp:'+phone);
    const tok=crypto.randomBytes(32).toString('hex');
    await r('SET','s:'+tok,phone,'EX',2592000);
    return s.json({token:tok});
  }
  s.status(400).end();
};
