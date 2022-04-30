module.exports = async ( args, talkedRecently, message, users, initAcc ) => {
  const userDetails = await users.findOne( { id: message.author.id } );

  let output = '';

  const items = require('../items.json');

  for ( const item in userDetails.items ) {
    output += `**${item}**: ${userDetails.items[item]}\n${items[item].description}\n\n`;
  }

  // checks if inventory is empty
  if ( output === "" ) {
    const em = {
      title: `${message.author.tag}'s inventory`,
      description: '\nempty inventory...',
      color: '#fde65e'
  }

    await message.reply( { embeds: [em] } );
    return;
  }

  const em = {
    title: `${message.author.tag}'s inventory`,
    description: '\n' + output,
    color: '#fde56e'
  }

  await message.reply( { embeds: [em] } );
}
