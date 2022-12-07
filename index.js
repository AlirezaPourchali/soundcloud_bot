import 'dotenv/config';
import telegraf from 'telegraf';
import childProcess from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

import DB from "./models/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bot = new telegraf.Telegraf(process.env.BOT_TOKEN, { polling: true });

bot.start(ctx => {
    ctx.reply("Hello.welcome to souncloud bot");
});

bot.command("likes", async ctx => {
    console.log(ctx.update.message.chat.username);
    try {
        ctx.reply("loading data").then(res => {
            childProcess.exec(`./bash.sh ${ctx.update.message.text.split(" ")[1].trim()}`, (err, stdout, stderr) => {
                if (err) {
                    ctx.reply(err.message);
                } else {
                    DB.connect(async (client) => {
                        const result = await DB.addLinks(ctx.update.message.text.split(" ")[1].trim(), stdout.split("\n")).catch(e => ctx.reply(e.message));
                        if (result.join("\n") !== '') {
                            ctx.reply(result.join("\n"));
                        } else {
                            ctx.reply("No new liked songs")
                        }
                        client.close();
                    }).catch(e => {
                        ctx.reply(e.message);
                    });
                }
            });
        })
    } catch (e) {
        ctx.reply(e.message);
    }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));