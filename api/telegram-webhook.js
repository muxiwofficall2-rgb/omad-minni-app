export default async function handler(req, res) {
  // Telegramdan kelgan so'rovni tekshiramiz
  if (req.method !== 'POST') return res.status(200).send('OK');

  const { callback_query } = req.body;
  
  // Agar tugma bosilmagan bo'lsa, hech narsa qilmaymiz
  if (!callback_query) return res.status(200).send('OK');

  // Kerakli ma'lumotlarni olamiz
  const { id: callback_id, data, message } = callback_query;
  const chat_id = message.chat.id;
  const message_id = message.message_id;

  // Tugma matnidan holatni va ID'ni ajratib olamiz (masalan: "ready_18" -> status: ready, id: 18)
  const [status, record_id] = data.split('_');

  // Tokenni va Supabase kalitlarini to'g'ridan-to'g'ri yozamiz (Siz avvalgidek qilib)
  const BOT_TOKEN = "8616201229:AAGDt1eEC-tTgBKAI1xQqSbPOozih5mgJuY";
  
  // 🚨 SHU YERGA O'ZINGIZNING SUPABASE MANZIL VA KALITINGIZNI YOZING
  const SUPABASE_URL = "<https://uosilbcdpgffjudetboe.supabase.co>";
  const SUPABASE_SERVICE_KEY = "<sb_publishable_wYFWJjdFL4Nv-IYHgEj3bg_ZThDSFWl>";

  // 1. Telegramga "qabul qilindi" deb javob qaytaramiz (yuklanish aylanasini to'xtatish uchun)
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callback_id, text: "Holat o'zgartirildi!" })
  });

  try {
    // 2. Bazada holatni yangilaymiz (Supabase REST API orqali)
    await fetch(`${SUPABASE_URL}/rest/v1/visa_requests?id=eq.${record_id}`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ status: status }) // 'ready' yoki 'pending'
    });

    // 3. Telegramdagi eski xabarni yangilaymiz (tugmalarni olib tashlaymiz)
    const oldText = message.text.split('\n\nHolatni tanlang:')[0];
    const newText = oldText + `\n\nHolat: ${status === 'ready' ? '✅ Tayyor' : '⏳ Hali tayyor emas'}\n📲 Mijozga bildirishnoma yuborildi ✓`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          chat_id: chat_id, 
          message_id: message_id, 
          text: newText 
      })
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
