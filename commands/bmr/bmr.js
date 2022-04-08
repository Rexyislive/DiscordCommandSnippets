const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { dietary, util } = require('health-calculator');

module.exports = { //Slash command setup
	data: new SlashCommandBuilder()
		.setName('bmr')
		.setDescription('Calculates your Basal metabolic rate!')
        .addStringOption(option => option.setName('gender').setDescription("Enter gender."))
        .addStringOption(option => option.setName('age').setDescription("How old are you?"))
        .addStringOption(option => option.setName('weight').setDescription("Enter weight. (kg or lb, enter just the number)."))
        .addStringOption(option => option.setName('height').setDescription("Enter height. (cm or in, enter just the number)")),


	async execute(interaction) {
        //Get inouts from user and set variables
        const genderInput = interaction.options.getString('gender');
        const ageInput = interaction.options.getString('age');
        const weightInput = interaction.options.getString('weight');
        const heightInput = interaction.options.getString('height');
        
        var corHeight;
        var corWeight;

        //if height is < 50, then convert from imperial to metric
        if (heightInput < 50){
            corHeight = util.inchToCm(heightInput);
            console.log(`input: ${heightInput}, correction: ${corHeight}`)
            corWeight = util.lbToKg(weightInput)
            console.log(`input: ${weightInput}, correction: ${corWeight}`)
        } else {
            //else just use metric
            corHeight = heightInput;
            corWeight = weightInput;
        }

        // Calculate using different formulae
        var resultBMR1 = dietary.bmr(genderInput,ageInput,corWeight,corHeight,false,'mifflin');
        var resultBMR2 = dietary.bmr(genderInput,ageInput,corWeight,corHeight,false,'rozaAndShizgal');
        var resultBMR3 = dietary.bmr(genderInput,ageInput,corWeight,corHeight,false,'harrisBenedict');

        const bmrEmbed = new MessageEmbed()
        .setColor('#000')
        .setTitle('BMR - Basal Metabolic Rate ')
        .setDescription(`Below is your calculated BMR with various formulas.\n\nBMR is the minimum amount of energy (or calories) that your body consumes to complete its vital functions.`)
        .addFields(
            { name: 'Mifflin: ', value: `${resultBMR1}`, inline: true },
            { name: 'Roza and Shizgal: ', value: `${resultBMR2}`, inline: true },
            { name: 'Harris Benedict: ', value: `${resultBMR3}`, inline: true}
        )
        .setImage('https://upload.wikimedia.org/wikipedia/commons/8/81/Postprandial_thermogenesis.png')
        .setFooter({ text: 'Image Attribution: pharmpedia.com (Attribution 2.5 Generic license) - Postprandial thermogenesis by type of food.' });
        
        //reply with data in an Embed
		await interaction.reply(
            {
                embeds: [bmrEmbed]
            }
        );

	},
};