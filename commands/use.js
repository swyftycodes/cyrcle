module.exports = async ( args, talkedRecently, message, users, initAcc ) => {
  const userDetails = await users.findOne( { id: message.author.id });

  const items = require('../items.json');
  const item = args[0];

  if ( item === undefined ) {
    const em = {
      title: 'Error',
      description: 'Not enough arguments.',
      color: '#fc382a'
    }

    await message.reply( { embeds: [em] } ); return;

  } else if ( !items.hasOwnProperty(item) ) {
    const em = {
      title: 'Error',
      description: 'This item does not exist',
      color: '#fc382a'
    }

    await message.reply( { embeds: [em] } ); return;

  } else if ( userDetails.items[item] === undefined ) {
    const em = {
      title: 'Error',
      description: "you don't have this item.",
      color: '#fc382a'
    }

    await message.reply( { embeds: [em] } ); return;

  } else if ( items[item].useable === false ) {
    const em = {
      title: 'Error',
      description: 'You cannot use this item.',
      color: '#fc382a'
    }

    await message.reply( { embeds: [em] } ); return;
  }

  const exec = require( `../items/${item}.js` );
  await exec(args, talkedRecently, message, users, initAcc);
}
