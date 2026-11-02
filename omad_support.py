"""Mustaqil «javob berish» boti. Faqat @Zakazyinfo_bot (Vercel'dagi BOT_TOKEN) uchun.
Agar bu bot allaqachon boshqa joyda (masalan Ssr-docs) ishlayotgan bo'lsa, buni ISHGA TUSHIRMANG:
bitta tokenni ikki jarayon bir vaqtda o'qiy olmaydi. Bunday holda omad_support.py ni o'sha botga ulang.
Ishga tushirish:  python support_bot.py
requirements.txt:  aiogram>=3.4  httpx
Muhit: BOT_TOKEN, KV_REST_API_URL, KV_REST_API_TOKEN, SITE_URL, ADMIN_SECRET, ADMIN_CHAT_ID"""
import asyncio
import os
from aiogram import Bot, Dispatcher
from omad_support import router


async def main():
    bot = Bot(os.environ["BOT_TOKEN"])
    dp = Dispatcher()
    dp.include_router(router)
    await bot.delete_webhook(drop_pending_updates=False)
    await dp.start_polling(bot, allowed_updates=["message", "callback_query"])


if __name__ == "__main__":
    asyncio.run(main())
