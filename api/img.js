// Admin yuborgan rasm/fayl: GET /api/img?c=<cid>&i=<id>
import {makeCore} from './_core.js';
const h=async(q,s)=>{
  const L=await import('./_lib.js');
  const core=makeCore({r:L.r,tg:L.tg,tgFile:L.tgFile,admins:L.admins,push:L.push,env:process.env});
  const url=new URL(q.url,'http://x'),md=await core.media(url.searchParams.get('c'),url.searchParams.get('i'));
  if(!md)return s.status(404).end();
  s.setHeader('content-type',md.mime);s.setHeader('cache-control','private,max-age=345600');s.setHeader('x-content-type-options','nosniff');
  s.setHeader('content-disposition',/^image\//.test(md.mime)?'inline':'attachment; filename="'+String(md.name).replace(/[^\w.\- ]/g,'_')+'"');
  return s.status(200).send(md.buf);
};
export default async(q,s)=>{try{return await h(q,s)}catch(e){return s.status(500).end()}};
