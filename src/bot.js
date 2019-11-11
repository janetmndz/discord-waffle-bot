// require('dotenv').config()
const Discord = require("discord.js")
const GClient = require('giphy-js-sdk-core')
const { prefix, token, giphy_token } = require('../config.json')
const client = new Discord.Client()
const giphy = GClient(giphy_token )

// Fn to create a new Embed with default color
const createEmbed = () => {
    let embed = new Discord.RichEmbed().setColor('#F3DE8A')
    return embed
}

client.once('ready', () => {
    console.log("Connected as " + client.user.tag);
    console.log("Ready to send waffles!")
})
client.on('message', message => {
	if(message.content.startsWith(`${prefix}waffles`)){
        // Find the first member in a member list
        let member = message.mentions.members.first();
        // If there is a member mentioned
        if(!!member){
            // Look for a waffles GIF
            giphy.search('gifs', {'q': 'breakfast waffle' }).then((r) => {
                let random = Math.floor((Math.random() * 10) + 1) % r.data.length
                let gif = r.data[random]
                // Send Waffle GIF to user
                message.channel.send(`${member}`, createEmbed().setTitle(`:sparkling_heart:\tYou have recieved waffles from ${message.author.username}`).setImage(gif.images.fixed_height.url).setFooter('Powered by GIPHY','https://media.giphy.com/avatars/studiosoriginals/j3JBzK5twdv8.jpg'))
            })
        }
        // Send error messsage to specify a member
        else{
            message.channel.send(createEmbed().setTitle(':no_entry:\tPlease mention a user to send waffles'))
        }
    }
})

client.login(token)