/*****************************
*
*  Coded by Dexter Roderick
*  Github: @Rexyislive     
*  Discord: Rexyislive#2550
*
*****************************/

// one rep max

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { sports } = require('health-calculator');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('onerep')
		.setDescription('Calculates one-repetition maximum (1RM)')
        .addStringOption(option => option.setName('reps').setDescription("Number of repetition of a given weight. [KG]"))
        .addStringOption(option => option.setName('weight').setDescription("Weight being lifted for a given reps.")),


	async execute(interaction) {
        //User inputs
        const repsInput = interaction.options.getString('reps');
        const weightInput = interaction.options.getString('weight');

        //Calculate against different formulae
        var resultEpley = sports.oneRm(repsInput, weightInput, 'epley');
        var resultBrzycki = sports.oneRm(repsInput, weightInput, 'brzycki');
        var resultLombardi = sports.oneRm(repsInput, weightInput, 'lombardi');

        const rpEmbed = new MessageEmbed()
        .setColor('#000')
        .setTitle('1RM - One-repetition maximum')
        .setDescription(`Below is your calculated 1RM with various formulas \n Remember, these are usually just an estimate.`)
        .addFields(
            { name: 'Epley: ', value: `${resultEpley}`, inline: true },
            { name: 'Brzycki: ', value: `${resultBrzycki}`, inline: true },
            { name: 'Lombardi: ', value: `${resultLombardi}`, inline: true}
        )
        .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/One-repetition_maximum_chart.svg/1280px-One-repetition_maximum_chart.svg.png')
        .setFooter({ text: 'Image Attribution: WheyProteinIsolate (CC BY-SA 4.0)' });

        const rowrp = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Wikipedia: One-repetition maximum')
                .setStyle('LINK')
                .setEmoji('ℹ️')
                .setURL('https://en.wikipedia.org/wiki/One-repetition_maximum'),
                
        );
        //reply with Embed and Button
		await interaction.reply({
            embeds: [rpEmbed],
            components: [rowrp]
        });
	},
};