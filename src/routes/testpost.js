module.exports = {
    "id": "minecraft-server-starter-kit",
    "title": "Making a starter kit in MCPE",
    "subtitle": "",
    "author": "skybird23333",
    "published": 1636721379960,
    "content": `
::: info 
This guide is for Minecraft Bedrock Edition/Minecraft PE realms/vanilla servers.
:::

# Starter Kit with a chest
This is the easiest type of starter kit to make.
The starter kit items be placed in a chest near the spawn and players can collect them as they join the server.
The chest is then refilled by cloning from a hidden chest where the starter kit items are placed.

To make a starter kit with a chest:
1. Place a chest at where the players will collect them, and another one in a hidden location, which will be cloned from. Note their location by standing on top of them.

::: error
Make sure you do not put the hidden chest too close to the accessible one. Hack clients can allow opening the chest even if it's not in the player's sight.
:::

2. Place down a command block near the two chests. It can be retrived by using \`/give @s command_block \` command.

3. Set the command block's settings to the following:

   Type: Repeat (This repeatly runs the command)

   Conditional: Unconditional (This command will run every time)

   Redstone: Always active (This command block will be triggered without needing a redstone)

4. Write the following command:
   
   \`\`\`
   clone pos1 pos1 pos2
   \`\`\`
   Where \`pos1\` is the location of the hidden chest,
   and \`pos2\` is the location of the accessible chest.

::: warn
Do not include the commas in the command.
:::

5. You can now add the starter kit items to the hidden chest. Verify that it is working by opening the accessible chest.

And that's it!

## Starter kit with a chest: extention

However, this starter kit is not very good. It is lacking a few features that makes it accessible to players.

### Adding clone delays

If you are testing this in your own world, or just have a very fast internet, you will not have any issues when using the starter kit.

However, for those who have a limited connection, they will have trouble picking up any items at all due to Minecraft preventing item trasaction.

This is fixable, though - we just need to make it clone the chest less often.

1. In your command block, set the options to the following:
   
   Delay in ticks: 10 (This will make it execute every half a second)

::: info
Minecraft has a TPS of 20. This means that commands and everything in the game world is processed 20 times per second.
:::

2. Test out the chest again. You will notice that the items are refilled less often.


### Preventing accidental item placement

Imagine the accessible chest as a void. If you accidentally place items in it, it will be immediately replaced and will be gone for a really long time!

To prevent this, we can fill the rest of the chest up with an item like barrier or stained glass.
Then to prevent players from taking them, we can clear them from the player's inventory.

1. Fill the rest of your chest up with barrier blocks. You can obtain them by using \`/give @s barrier \` command.

2. Place another command block with the same setting as the initial command block.

::: info
When playing with a mouse and keyboard, you can clone the command by middle clicking on it. Holding down ctrl then clicking will also copy the commands over.
:::

3. Write the following command:

    \`\`\`
    clear @a barrier
    \`\`\`

    This will remove barrier blocks from every player's inventory.

`
}