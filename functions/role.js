module.exports = {
  addRole: async (client) => {
    client.on('guildMemberAdd', async (member) => {
      const guild = member.guild
      const role = await guild.roles.cache.find(role => role.name === process.env.NEW_MEMBER_ROLE_NAME);

      await member.roles.add(role)
    });
  }
}