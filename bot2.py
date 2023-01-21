import os 
import asyncio
import telegram

async def main():
    bot = telegram.Bot(os.environ['BOT_TOKEN'])
    async with bot :
        print((await bot.get_updates())[0])
        print("_____________________")
        await bot.send_message(text='Hi John!', chat_id=445634207)
if __name__ == '__main__':
    asyncio.run(main())
