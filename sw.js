self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('push',e=>{const d=e.data?e.data.json():{};e.waitUntil(self.registration.showNotification(d.title||'Omad Tour',{body:d.body||'',icon:'/icon-192.png'}))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.openWindow('/#chat'))});
