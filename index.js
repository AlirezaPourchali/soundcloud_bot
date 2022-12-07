import 'dotenv/config';
import telegraf from 'telegraf';
import childProcess from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN, { polling: true });

bot.start(ctx => {
    ctx.reply("Hello.welcome to souncloud bot");
});

bot.command("likes", async ctx => {
    console.log(ctx.update.message.chat.username);
    try {
        const msg = await ctx.reply("loading data")
        childProcess.exec(`./bash.sh ${ctx.update.message.text.split(" ")[1].trim()}`, async (err, stdout, stderr) => {
            if (err) {
                console.log("Error");
                ctx.reply("an error occured");
            } else {
                fs.writeFileSync(`./files/${ctx.update.message.chat.username}.txt`, stdout, "utf-8");
                await ctx.telegram.sendDocument(ctx.chat.id, {
                    source: fs.createReadStream(`./files/${ctx.update.message.chat.username}.txt`),
                    filename: "links.txt",
                }).catch(e => console.log(e.message));
                await ctx.telegram.deleteMessage(msg.chat.id, msg.message_id);
                fs.unlinkSync(`./files/${ctx.update.message.chat.username}.txt`);
            }
        });
    } catch (e) {
        ctx.reply("an error has occured");
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));