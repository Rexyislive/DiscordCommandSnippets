const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { dietary, util } = require('health-calculator');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tdee')
		.setDescription('Calculate your Total Daily Energy Expenditure')
        .addStringOption(option => option.setName('gender').setDescription("Enter gender."))
        .addStringOption(option => option.setName('age').setDescription("How old are you?"))
        .addStringOption(option => option.setName('weight').setDescription("Enter weight. (kg or lb, enter just the number)"))
        .addStringOption(option => option.setName('height').setDescription("Enter height. (cm or in, enter just the number) "))
        .addStringOption(option => option.setName('activitylevel').setDescription("How active are you? (Sedentary,Light,Moderate,Active,Extra)")),



	async execute(interaction) {
        //Get user inputs
        const genderInput = interaction.options.getString('gender');
        const ageInput = interaction.options.getString('age');
        const weightInput = interaction.options.getString('weight');
        const heightInput = interaction.options.getString('height');
        const actInput = interaction.options.getString('activitylevel');
        
        var corHeight;
        var corWeight;

        //if less than 50 then use Imperial
        if (heightInput < 50){
            corHeight = util.inchToCm(heightInput);
            console.log(`input: ${heightInput}, correction: ${corHeight}`)
            corWeight = util.lbToKg(weightInput)
            console.log(`input: ${weightInput}, correction: ${corWeight}`)
        } else {
            //otherwise use metric
            corHeight = heightInput;
            corWeight = weightInput;
        }

        //results using different formulae
        var resultTDEE1 = dietary.tdee(genderInput,ageInput,corWeight,corHeight,actInput,false,'mifflin')
        var resultTDEE2 = dietary.tdee(genderInput,ageInput,corWeight,corHeight,actInput,false,'rozaAndShizgal')
        var resultTDEE3 = dietary.tdee(genderInput,ageInput,corWeight,corHeight,actInput,false,'harrisBenedict')

        const tdeeEmbed = new MessageEmbed()
        .setColor('#000')
        .setTitle('TDEE - Total Daily Energy Expenditure ')
        .setDescription(`Below is your calculated TDEE with various formulas.\n\nTDEE is the amount of calories you would burn in a day doing your daily activities going about your day, though it is an estimate.`)
        .addFields(
            { name: 'Mifflin: ', value: `${resultTDEE1}`, inline: true },
            { name: 'Roza and Shizgal: ', value: `${resultTDEE2}`, inline: true },
            { name: 'Harris Benedict: ', value: `${resultTDEE3}`, inline: true}
        );


        //reply with Embed
        await interaction.reply(
            {
                embeds: [tdeeEmbed]
            }
        );
	},
};