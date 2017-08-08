const patron = require('patron.js');
const db = require('../../database');
const util = require('../../utility');

class SetMutedRole extends patron.Command {
  constructor() {
    super({
      names: ['setmutedrole', 'setmuterole', 'setmute', 'setmuted'],
      groupName: 'administration',
      description: 'Sets the muted role.',
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Muted',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await db.guildRepo.upsertGuild(msg.guild.id, { $set: { 'roles.muted': args.role.id } });

    return util.Messenger.reply(msg.channel, msg.author, 'You have successfully set the muted role to ' + args.role + '.');
  }
}

module.exports = new SetMutedRole();
