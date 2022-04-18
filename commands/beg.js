module.exports = async (args, message, users, initAcc, addCoins) => {

  // define .random function
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }


  // Init Account if not exists
  await initAcc(message.author.id);

  success = [true, false].random();
  if ( success === true ) {

    earnings = Math.floor(Math.random() * 900);

    await addCoins(message.author.id, earnings)

    const em = {
      title: 'success!',
      description: `You earned ${earnings} coins (random messages will be added later)`,
      color: '#fde65e'
    }

    await message.reply( { embeds: [ em ] } )
  } else {
    const em = {
      title: 'failed',
      description: 'You failed to earn any coins (random messages will be added later)',
      color: '#fc382a'
    }

    await message.reply( { embeds: [ em ] } )
  }
}
