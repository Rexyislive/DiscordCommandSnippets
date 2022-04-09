/*****************************
*
*  Coded by Dexter Roderick
*  Github: @Rexyislive     
*  Discord: Rexyislive#2550
*
*****************************/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const grabLink = require('youtube-thumbnail-grabber');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thumbnail')
		.setDescription('Grabs the thumbnail image of a YouTube video')
        .addStringOption(option => option.setName('video').setDescription("Youtube Video URL")),

	async execute(interaction) {
        //Get user input and set to q variable
        const q = interaction.options.getString('video');

        //console.log(grabLink(`${q}`, 'max')) //UTL goes to console

        //Grab the thumbnail URL and set as a 
        let a = grabLink(`${q}`, 'max');

        //Put image in Embed
        const tEmbed = new MessageEmbed()
        .setImage(a);

        //Send reply with Embed
		await interaction.reply({
            embeds: [tEmbed]
        });
	},
};