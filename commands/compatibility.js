module.exports = {
    help: 'Check compatibility between two users',
    func: (Client, msg, args) => {
        // Check for errors
        if (args[1] == undefined || args[2] == undefined) return sendError('Give two tags after the command \n !compatibility <user1> <user2>');
        if (args[1] == args[2]) return sendError("Users can't be the same person");
        if (args[1].substring(0,3) !== "<@!" && args[2].substring(0,3) !== "<@!") return sendError('Given users need to be tagged (for now)');

        // Throw error
        function sendError(error) {
            msg.reply(error);
        }

        // Cut <@! from beginning and > from end of tag. Example tag: <@!136856906139566081>
        var compatibility_user1 = args[1].substring(19, args[1].length - 1);
        var compatibility_user2 = args[2].substring(19, args[2].length - 1);
        // Now the tag is only the last two numbers which we'll use for this function

        // Add id last two numbers together and use them for compatibility percent
        var compatibility = parseInt(compatibility_user1) + parseInt(compatibility_user2);

        // If compatibility is higher than 100 cut the first number off
        if (compatibility > 100) compatibility = compatibility.toString().substring(1,3);
        // Send result to sendReply()
        sendReply(compatibility);

        // Reply embed stuff
        function sendReply(compatibility) {
            msg.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: Client.bot.user.username,
                        icon_url: Client.bot.user.avatarURL
                    },
                    title: "https://github.com/Microoo/fewbewki",
                    url: "https://github.com/Microoo/fewbewki",
                    // IDEA: Add random flavor text from array
                    description: "Cool description here :)",
                    fields: [{
                            name: "Compatibility",
                            value: args[1] + " " + compatibility + "% " + args[2],
                        },
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: Client.bot.user.avatarURL,
                        text: "Fewbewki"
                    }
                }
            });
        }
    }
}
