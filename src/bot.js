// require('dotenv').config()
const Discord = require("discord.js")
const GClient = require('giphy-js-sdk-core')
const { prefix, token, giphy_token } = require('../config.json')
const client = new Discord.Client()
const giphy = GClient(giphy_token )
// const embed = new Discord.RichEmbed().setColor('#F3DE8A');

client.once('ready', () => {
    console.log("Connected as " + client.user.tag);
    console.log("Ready to send waffles!")
})
client.on('message', message => {
	if(message.content.startsWith(`${prefix}waffles`)){
        let member = message.mentions.members.first();
        if(!!member){
            // message.channel.send(`Sending Waffles to @${member.displayName} :cookie:`)
            //console.log(message.author)
            // let wafflesEmbed = embed.addField(`Sending Waffles to ${member.displayName} from ${message.author.username}`, ':cookie:')
            
            // Look for a waffles GIF
            giphy.search('gifs', {'q': 'breakfast waffles' }).then((r) => {
                let random = Math.floor((Math.random() * 10) + 1) % r.data.length
                let gif = r.data[random]
                message.channel.send(`Sending Waffles to ${member} from ${message.author}`, {
                    files: [gif.images.fixed_height.url]
                })
            })
        }
        else{
            message.channel.send("Please mention a user to send waffles")
        }
    }
})

client.login(token)