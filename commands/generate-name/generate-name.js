/*****************************
*
*  Coded by Dexter Roderick
*  Github: @Rexyislive     
*  Discord: Rexyislive#2550
*
*****************************/

const { SlashCommandBuilder } = require('@discordjs/builders');
var random_name = require('node-random-name');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate-name')
		.setDescription('Generates a name, useful for RP servers')
        .addStringOption(option => option.setName('gender').setDescription("Enter gender.").setRequired(true)),
	async execute(interaction) {
        //Get user input for Gender
        const gender = interaction.options.getString('gender');

        let f; //first name variable
        let l; //last name variable
        let fn; //Full Name variable

        //See if the given gender is male or female, then generate a name
        if (gender == 'male'){
            f = random_name({ first: true, last: true, gender: "male" });
            l = random_name({ last: true, gender: "male" });
            fn = f + ' ' + l;
        }
        if (gender == 'female'){
            f = random_name({ first: true, gender: "female" });
            l = random_name({ last: true, gender: "female" });
            fn = f + ' ' + l;
        } 
        else if (gender != 'male' && gender != 'female'){ f = `No`;l = `Name`; fn = f + ' ' + l;}

        //post name as a message
		await interaction.reply(fn);
	},
};