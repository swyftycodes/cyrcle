module.exports = async ( args, talkedRecently, message, users, initAcc, addCoins, removeCoins ) => {
  await initAcc(message.author.id);

  const userDetails = await users.findOne( { id: message.author.id } );

  const items = require('../items.json');
  const item = args[0];
  let amount = args[1];

  if ( amount === undefined ) {
    amount = 1
  };

  if ( !items.hasOwnProperty(item) ) {
    await message.reply('this item does not exist');
    return;
  }

  if ( userDetails.coins < items[item].price * amount) {
    const em = {
      title: 'Poor Child',
      description: 'you do not have enough coins for this/these items.',
      color: '#fde65e'
    }

    await message.reply( { embeds: [em] } );
    return;
  }

  await removeCoins(message.author.id, items[item].price * amount)

  query = `items.${item}`

  if (!userDetails.items.hasOwnProperty(item)) {
    await users.updateOne( { id: message.author.id }, { $set: { [query]: amount } } );
  } else {
    await users.updateOne( { id: message.author.id }, { $set: { [query]: userDetails.items[item] + amount }} )
  }

  const em = {
    title: 'Success!',
    description: `you bought ${amount} **${item}**`,
    color: '#fde65e'
  }

  await message.reply( { embeds: [em] } );
}
