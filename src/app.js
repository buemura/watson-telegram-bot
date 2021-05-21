const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const { Telegraf } = require("telegraf");
require("dotenv").config();

// Connecting to Watson Assistant
const assistant = new AssistantV2({
  version: process.env.ASSISTANT_VERSION,
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_APIKEY,
  }),
  serviceUrl: process.env.ASSISTANT_URL,
});

// Creating a telegram bot object
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

const watsonResponse = (ctx) => {
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
};

const showMessage = (ctx, res) => {
  const response = res.result.output.generic[0];
  console.log(response);

  if (response.response_type === "text") {
    const message = response.text;
    ctx.reply(message);
  } else if (response.response_type === "option") {
    let message = `${response.title}\n\n`;

    for (let i = 0; i < response.options.length; i += 1) {
      message += `∘ ${response.options[i].label}\n`;
    }
    ctx.reply(message);
  }
};

bot.on("text", (ctx) => {
  watsonResponse(ctx);
});

bot.launch();
