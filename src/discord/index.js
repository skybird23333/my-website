const { Client, Intents, WebhookClient, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });
const feedbackWebhook = new WebhookClient({ url: process.env.FEEDBACK_WEBHOOK_URL });

module.exports = {
    async initClient() {
        client.login(process.env.DISCORD_TOKEN);
        return new Promise(function (resolve) {
            client.on('ready', async () => {
                await (await client.guilds.fetch('609752473204293643')).members.fetch('416147488643481610')
                resolve(client);
            });
        });
    },
    async getSkybirdPresence() {
        const member = await (
            await (
                await client.guilds.fetch('609752473204293643')
            )
                .members.fetch('416147488643481610')
        )

        if (!member.presence) return 'offline'
        else return member.presence.status
    },
    async postFeedbackMessage(message, email) {
        feedbackWebhook.send({
            embeds: [
                new MessageEmbed()
                    .setAuthor(email)
                    .setDescription(message)
                    .setTimestamp(Date.now())
            ]
        })
    },
    async postLoginAttemptMessage(email, ip, success) {
        feedbackWebhook.send({
            embeds: [
                new MessageEmbed()
                    .setTitle((success ? 'Successful' : 'Failed') + ' Login Attempt')
                    .setFooter(ip)
                    .setDescription('Used email ' + email)
                    .setTimestamp(Date.now())
                    .setColor(success ? '#00ff00' : '#ff0000')
            ]
        })

    }
}