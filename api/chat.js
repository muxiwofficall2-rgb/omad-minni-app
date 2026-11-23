import {makeCore} from './_core.js';
const h=async(q,s)=>{
  const L=await import('./_lib.js');
  const core=makeCore({r:L.r,tg:L.tg,tgFile:L.tgFile,admins:L.admins,push:L.push,env:process.env});
  const [c,j]=await core.chat(L.body(q),q.headers);
  return s.status(c).json(j);
};
export default async(q,s)=>{try{return await h(q,s)}catch(e){return s.status(500).json({error:String(e&&e.message||e).slice(0,100)})}};
