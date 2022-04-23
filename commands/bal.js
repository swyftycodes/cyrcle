module.exports = async (args, talkedRecently, message, users, initAcc) => {
    await initAcc(message.author.id)
    
    userDetails = await users.findOne({id: message.author.id})

    const em = {
        color: '#fde65e',
        title: `${message.author.tag}'s balance'`,
        description: `wallet: ${userDetails.coins}`
    }

    message.reply({ embeds: [em] });
}
