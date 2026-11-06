const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

const client = new line.Client(config);
const app = express();

app.get('/', (req, res) => {
  res.send('CoachSync 系統運行中！');
});

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;
    for (let event of events) {
      if (event.type === 'message' && event.message.text === '查詢堂數') {
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: '目前剩餘堂數：8 堂（系統連線成功！）'
        });
      }
    }
    res.status(200).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

app.listen(process.env.PORT || 3000, () => console.log('服務已啟動'));
