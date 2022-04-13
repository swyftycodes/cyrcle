const { MongoClient } = require("mongodb");

const Discord = require('discord.js');
const { Intents } = require('discord.js')

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

    const exec = require(`./commands/${command}.js`)
    await exec(message, users, initAcc)
});

client.login(credentials.token)
