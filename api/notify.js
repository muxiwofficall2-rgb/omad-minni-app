export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { record } = req.body; 
  if (!record) return res.status(400).send('No record');

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.ADMIN_CHAT_ID;

  const text = `🛂 *Yangi viza so'rovi!*\n\n` +
               `📱 Telefon: \`${record.phone}\`\n` +
               `🔢 Barkod: \`${record.barcode}\`\n` +
               `🆔 ID: \`${record.id}\`\n\n` +
               `Holatni tanlang:`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "✅ Tayyor", callback_data: `ready_${record.id}` },
        { text: "⏳ Hali tayyor emas", callback_data: `pending_${record.id}` }
      ]
    ]
  };

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
        reply_markup: inlineKeyboard
      })
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Telegram error' });
  }
}
