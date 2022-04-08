const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { sports } = require('health-calculator');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mhr')
		.setDescription('Calculates your Maximum Heart Rate!')
        .addStringOption(option => option.setName('age').setDescription("How old are you?")),


	async execute(interaction) {

        const ageInput = interaction.options.getString('age');
        //formulaChoice = new Array(["haskell","inbar","nes","oakland","tanaka"]);
        //                            0        1      2       3        4

        var resultHR1 = sports.hrMax(ageInput,'haskell');
        var resultHR2 = sports.hrMax(ageInput,'inbar');
        var resultHR3 = sports.hrMax(ageInput,'nes');
        var resultHR4 = sports.hrMax(ageInput,'oakland');
        var resultHR5 = sports.hrMax(ageInput,'tanaka');

        const mhrEmbed = new MessageEmbed()
        .setColor('#000')
        .setTitle('MHR - Maximum Heart Rate ')
        .setDescription(`Below is your calculated MHR with various formulas.\n\nMHR is the maximum heart rate your body should reach at 100% intensity, this means 50% will be about what moderate exercise should look like..`)
        .addFields(
            { name: 'Haskell: ', value: `${resultHR1} BPM`, inline: true },
            { name: 'Inbar: ', value: `${resultHR2} BPM`, inline: true },
            { name: 'Nes: ', value: `${resultHR3} BPM`, inline: true},
            { name: 'Oakland: ', value: `${resultHR4} BPM`, inline: true},
            { name: 'Tanaka: ', value: `${resultHR5} BPM`, inline: true}
        );

		await interaction.reply(
            {
                embeds: [mhrEmbed]
            }
        );

	},
};