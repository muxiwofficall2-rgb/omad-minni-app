"""Omad Tour: мижоз сўрови -> админга inline «Ответить» -> жавоб иловага (чат + push).
Ulash (bot asosiy faylida, boshqa router'lardan OLDIN):
    from omad_support import router as support_router
    dp.include_router(support_router)
requirements.txt ga: httpx
Muhit o'zgaruvchilari: KV_REST_API_URL, KV_REST_API_TOKEN, SITE_URL, ADMIN_SECRET, ADMIN_CHAT_ID (admin user ID, vergul bilan bir nechta)"""
import os
import httpx
from aiogram import Router, F
from aiogram.filters import BaseFilter
from aiogram.types import (Message, CallbackQuery, ForceReply,
                           InlineKeyboardMarkup, InlineKeyboardButton)

KV_URL, KV_TOKEN = os.environ["KV_REST_API_URL"], os.environ["KV_REST_API_TOKEN"]
SITE, SECRET = os.environ["SITE_URL"].rstrip("/"), os.environ["ADMIN_SECRET"]
ADMINS = {int(x) for x in os.environ["ADMIN_CHAT_ID"].split(",") if x.strip()}
router = Router()
http = httpx.AsyncClient(timeout=15)


async def kv(*cmd):
    r = await http.post(KV_URL, headers={"Authorization": f"Bearer {KV_TOKEN}"}, json=list(cmd))
    return r.json().get("result")


def reply_kb(cid: str, text: str = "✉️ Ответить"):
    return InlineKeyboardMarkup(inline_keyboard=[[InlineKeyboardButton(text=text, callback_data=f"r:{cid}")]])


class Pending(BaseFilter):
    """Faqat admin «Ответить» bosgan bo'lsa ishlaydi; boshqa xabarlar va buyruqlarga tegmaydi."""
    async def __call__(self, m: Message):
        if not (m.from_user and m.from_user.id in ADMINS and m.text):
            return False
        if m.text.startswith("/") and m.text.split()[0] != "/cancel":
            return False
        cid = await kv("GET", f"adm:{m.from_user.id}")
        return {"cid": cid} if cid else False


@router.callback_query(F.data.startswith("r:"), F.from_user.id.in_(ADMINS))
async def ask(c: CallbackQuery):
    await kv("SET", f"adm:{c.from_user.id}", c.data[2:], "EX", 1800)
    await c.answer()
    await c.message.answer("✍️ Напишите ответ клиенту. Отмена: /cancel",
                           reply_markup=ForceReply(input_field_placeholder="Ответ клиенту…"))


@router.message(Pending())
async def send(m: Message, cid: str):
    await kv("DEL", f"adm:{m.from_user.id}")
    if m.text.startswith("/cancel"):
        return await m.answer("Отменено")
    r = await http.post(f"{SITE}/api/chat", headers={"x-secret": SECRET},
                        json={"action": "reply", "cid": cid, "text": m.text})
    if r.status_code == 200:
        await m.answer("✅ Отправлено клиенту", reply_markup=reply_kb(cid, "✉️ Ответить ещё"))
    else:
        await m.answer("⚠️ Не удалось отправить", reply_markup=reply_kb(cid, "🔁 Повторить"))
