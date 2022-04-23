// Import required packages
const { MongoClient } = require("mongodb");

const Discord = require('discord.js');
const { Intents } = require('discord.js')

const fs = require('fs');

// Initialization
const credentials = require('./config.json');
const prefix = '.'

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

const dbclient = new MongoClient(credentials.mongouri)
const users = dbclient.db('cyrcle').collection('users')

const talkedRecently = new Set();

async function initMongo() {
    await dbclient.connect()
}

async function initAcc(userId) {
    const result = await check(userId)

    if ( result === false ) {
        await users.insertOne({ id: userId, coins: 0, items: {} });
    } else {
        return
    }
}

async function check(userId) {
    const result = await users.findOne({ id: userId });

    if ( result === null ) {
        return false;
    } else {
        return true;
    }
}

async function addCoins(userId, amount) {
    const userDetails = await users.findOne( { id: userId } );
    const coins = userDetails.coins;

    await users.updateOne( { id: userId }, { $set: { coins: coins + amount } } );
}

client.on('ready', async () => {
    await initMongo();
    console.log('MongoDB Init Complete.')

    await initAcc('deeznuts')
    console.log('Init Complete.')
})

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if ( fs.existsSync(`./commands/${command}.js`) === false ) {
        const em = {
            title: 'Error',
            description: 'This command does not exist.',
            color: '#fc382a'
        }

        await message.reply( { embeds: [em] } );
        return;
    }

    const exec = require(`./commands/${command}.js`)
    await exec(args, talkedRecently, message, users, initAcc, addCoins)
});

client.login(credentials.token)
