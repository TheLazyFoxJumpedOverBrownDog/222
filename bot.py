import asyncio
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters import Command
import phonenumbers
from phonenumbers import geocoder, carrier

TOKEN = "8493879498:AAFCxtDnRpczPRBoaOaM5biaZtrdbvXF92k"

bot = Bot(token=TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer("👋 Привіт! Введіть номер у форматі +380...")

@dp.message(F.text)
async def analyze_phone(message: types.Message):
    text = message.text.strip()
    if not text.startswith("+"):
        await message.answer("❌ Номер має починатися з +")
        return
    try:
        phone_obj = phonenumbers.parse(text)
        if not phonenumbers.is_valid_number(phone_obj):
            await message.answer("❌ Номер недійсний")
            return
        country = geocoder.description_for_number(phone_obj, "uk") or "Невідомо"
        operator = carrier.name_for_number(phone_obj, "uk") or "Невідомо"
        await message.answer(f"🌍 Країна: {country}\n📱 Оператор: {operator}")
    except:
        await message.answer("❌ Помилка. Формат: +380671234567")

async def main():
    print("Бот запущено...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
