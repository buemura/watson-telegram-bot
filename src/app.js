const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const { Telegraf } = require("telegraf");
require("dotenv").config();

const assistant = new AssistantV2({
  version: process.env.ASSISTANT_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY,
  }),
  serviceUrl: process.env.ASSISTANT_URL,
});

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

function watsonResponse(ctx) {
  let userInput = ctx.update.message.text;

  assistant
    .messageStateless({
      assistantId: process.env.ASSISTANT_ID,
      input: {
        message_type: "text",
        text: userInput,
      },
    })
    .then((res) => {
      showMessage(ctx, res);
    });
}

function showMessage(ctx, res) {
  if (res.result.output.intents[0].intent === "saudar") {
    ctx.reply(res.result.output.generic[0].title);
  } else if (res.result.output.generic[0].title) {
    ctx.reply(`${res.result.output.generic[0].title} \n
    Consulta - ${res.result.output.generic[0].options[0].label} \n
    Exame    - ${res.result.output.generic[0].options[1].label} \n
    Retorno  - ${res.result.output.generic[0].options[2].label}`);
  } else {
    ctx.reply(res.result.output.generic[0].text);
  }
}

bot.on("text", (ctx) => {
  watsonResponse(ctx);
});

bot.launch();
