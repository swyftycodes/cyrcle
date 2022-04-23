module.exports = async (args, talkedRecently, message, users, initAcc) => {
  await initAcc(message.author.id);

  // require items.json
  const items = require('../items.json');

  if ( typeof args[0] === 'undefined' ) {
    // sets output to string and adds each item
    let output = '';
    for ( const item in items ) {
      output += `**${item}**: ${items[item].price}\n${items[item].description}\n`
    }

    output += '\n use `.shop <item>` for more details';

    const em = {
      title: 'The Shop',
      description: output,
      color: '#fde65e'
    }

    await message.reply( { embeds: [em] } );

  } else {
    const item = args[0];

    if ( item in items ) {
      const em = {
        title: item,
        description: `**buy price:** ${items[item].price}\n**sell price:** ${items[item].sellPrice}\n**Long Description:** ${items[item].longDesc}`,
        color: '#fde65e'
      }

      await message.reply( { embeds: [em] } );
    } else {

      const em = {
        title: 'Error',
        description: 'This item does not exist.',
        color: '#fc382a'
      }

      await message.reply( { embeds: [em] } );
    }
  }
}
