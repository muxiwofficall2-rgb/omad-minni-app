export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { record } = req.body; 
  if (!record) return res.status(400).send('No record');

  // BU YERGA TO'G'RIDAN-TO'G'RI YOZAMIZ
  const BOT_TOKEN = "8616201229:AAGDt1eEC-tTgBKAI1xQqSbPOozih5mgJuY";
  const CHAT_ID = "7359558983"; // <--- SHU YERGA O'ZINGIZNING ID RAQAMINGIZNI YOZING!

  const text = `🛂 Yangi viza so'rovi!\n\nTelefon: ${record.phone}\nBarkod: ${record.barcode}\nID: ${record.id}\n\nHolatni tanlang:`;

  const inlineKeyboard = {
    inline_keyboard: [
      [{ text: "✅ Tayyor", callback_data: `ready_${record.id}` }, { text: "⏳ Hali tayyor emas", callback_data: `pending_${record.id}` }]
    ]
  };

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          chat_id: CHAT_ID, 
          text: text, 
          reply_markup: inlineKeyboard 
      })
    });

    const tgData = await tgResponse.json();

    // Agar Telegram xato bersa, bazaga aniq xatoni qaytaramiz
    if (!tgData.ok) {
      return res.status(500).json({ error: tgData.description });
    }

    return res.status(200).json({ success: true });
  } catch (error) { 
    return res.status(500).json({ error: 'Server xatosi' }); 
  }
}
