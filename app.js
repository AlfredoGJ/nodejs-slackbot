const { App } = require('@slack/bolt');
const Channel = require('./models/channel')

var mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

const karmabotData = {
  enabled:true,
  channelId:null,
  users:{
    'U152VABBJ':5,
    'UNTRAJLLU':2
  }
};

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('karma', ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  const requestMessage = message.text;
  const startPos = requestMessage.indexOf('<@') +2;
  const endPos = requestMessage.indexOf('>', startPos);
  const idUser = requestMessage.substring(startPos, endPos);
  console.log(message.text);
  //say(`Hey there <@${message.user}>!`);
  
  const karmaInfo = Channel.findOne({
    channelId: message.channel
  })
  .then(channel => {
    console.log(channel)
    console.log(channel.users[idUser])
    say(`User karma is: ${channel.users[idUser]}`)
    //say(`Hey there <@${message.user}>!`)
  });
  
});



(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();