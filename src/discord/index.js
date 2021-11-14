const { Client, Intents, WebhookClient, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });
const feedbackWebhook = new WebhookClient({ url: process.env.FEEDBACK_WEBHOOK_URL });

client.on('ready', async () => {
    console.log(`Discord: Logged in as ${client.user.tag}`);
    const member = await (
        await (
            await client.guilds.fetch('609752473204293643')
        )
            .members.fetch('416147488643481610')
    )
});

client.login(process.env.DISCORD_TOKEN);

module.exports = {
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