

const Discord = require('discord.js');
const bot = new Discord.Client();
const RustPlus = require('rustplus-api');
var rustplus = new RustPlus(hostname, serverip, steamid, port);

console.log("Complete")
bot.login(token);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

rustplus.on('message', (message) => {
    console.log("message received: " + JSON.stringify(message));
});
const prefix = "!";
// when connected to rust server
rustplus.on('connected', () => {
	//all rust commands inside here
    rustplus.getEntityInfo(1234567, (message) => {
        console.log("getEntityInfo response message: " + JSON.stringify(message));
        return true;
    });

    bot.on('message', function(message) {
    	if (message.author.bot) return;
    	if (!message.content.startsWith(prefix)) return;

    	const commandBody = message.content.slice(prefix.length);
  		const args = commandBody.split(' ');
  		const command = args.shift().toLowerCase();
  		if (command == "sendteammessage") {
  			rustplus.sendteammessage(args[0]);
  			message.reply("Team message sent");
  		}
  		else if (command == "getmap") {
  			rustplus.sendRequest({
    			getMap: {}
			}, (message) => {
    			console.log(message);
			});
  		}
    });

});






bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');
  }
});

