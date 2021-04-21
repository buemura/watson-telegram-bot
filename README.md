# Watson Telegram Bot

A chatbot using IBM Watsom integrating with telegram using Node.js

## Setup

Firstly you can clone by using the command below:

```bash
git clone https://github.com/BrunoUemura/watson-telegram-bot.git
```

Or download the zip file directly from [Github](https://github.com/BrunoUemura/watson-telegram-bot.git) and unzip it.

After downloaded, navigate to the root directory of the project:

```bash
cd watson-telegram-bot
```

and install all the dependencies:

```bash
npm install
```

Remember to change the file **.env** variables values according to your needs.

```bash
ASSISTANT_VERSION=YYYY-MM-DD <current_date>
ASSISTANT_APIKEY=<watsom_assistant_apikey>
ASSISTANT_URL=<watsom_assistant_url>
ASSISTANT_ID=<watsom_assistant_id>
TELEGRAM_TOKEN="" <telegram_bot_token>
```

### To run the project

```bash
npm start
```

## How it works

After the application is started, send the following messages to the bot.

- Olá
- Agendamento
- Agendamento consulta
- Status
- Status consulta
- Obrigado

## External link
- Youtube video (Portuguese): [YouTube](https://www.youtube.com/watch?v=nRghqU6htCs)
