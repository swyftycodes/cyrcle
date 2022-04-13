module.exports = async (message, users, initAcc) => {
    await initAcc(message.author.id)
    
    userDetails = await users.findOne({id: message.author.id})
    console.log(userDetails.coins)
}