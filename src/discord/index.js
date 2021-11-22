const { Client, Intents, WebhookClient, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });
const feedbackWebhook = new WebhookClient({ url: process.env.FEEDBACK_WEBHOOK_URL });

var promiseResolve;
var clientReadyPromise = new Promise(function(resolve, reject){
  promiseResolve = resolve;
});

promiseResolve();

client.on('ready', async () => {
    const member = await (
        await (
            await client.guilds.fetch('609752473204293643')
        )
            .members.fetch('416147488643481610')
    )
    promiseResolve(client);
});



module.exports = {
    async initClient() {
        client.login(process.env.DISCORD_TOKEN);
        return clientReadyPromise
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
        }
        )
    }
}