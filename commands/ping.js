module.exports = (args, talkedRecently, message) => {
  if ( talkedRecently.has(message.author.id) ) {
    message.reply(`ur on a cooldown, frick off`);
    return
  }

  message.reply('hello test')

  talkedRecently.add(message.author.id);

  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 5000)
}
