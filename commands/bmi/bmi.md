## Description 
> This command allows users to calculate their BMI (Body Mass Index) and replies with an Embed and MessageButton

*Note: This command follows the discord.js v13 guide format*

## Packages used
[body-mass-index](https://github.com/brh55/body-mass-index#readme) - `npm install --save body-mass-index`

```js
/*****************************
*
*  Coded by Dexter Roderick
*  Github: @Rexyislive     
*  Discord: Rexyislive#2550
*
*****************************/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const bodyMassIndex = require('body-mass-index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bmi')
		.setDescription('Calculates your BMI!')
        .addStringOption(option => option.setName('weight').setDescription("Enter Weight (eg. 75kg, 107lb)"))
        .addStringOption(option => option.setName('height').setDescription("Enter Height (eg. 170cm, 1.85m, 5ft 9in)")),

	async execute(interaction) {

        const gInput1 = interaction.options.getString('weight');
        const gInput2 = interaction.options.getString('height');

        var res = bodyMassIndex(`${gInput1}`,`${gInput2}`);

        let resI;
        if (res < 16){
            resI = "Underweight (Severe thinness)";
        } else if (res > 16.0 && res < 16.9){
            resI = "Underweight (Moderate thinness)";
        } else if (res > 17 && res < 18.4){
            resI = "Underweight (Mild thinness)";
        } else if (res > 18.5 && res < 24.9){
            resI = "Normal Range";
        } else if (res > 25 && res < 29.9){
            resI = "Overweight";
        } else if (res > 30 && res < 34.8){
            resI = "Obese (Class I)";
        } else if (res > 35 && res < 39.9){
            resI = "Obese (Class II)";
        } else if (res > 39.91){
            resI = "Obese (Class III)"
        }
        //console.log(resI);

        const bmiEmbed = new MessageEmbed()
        .setColor('#000')
        .setTitle('BMI - Body Mass Index')
        .setDescription(`Your calculated BMI is: ${res} \n
                        Remember, BMI is a convenient method used to broadly categorize a person based on tissue mass (muscle, fat, and bone) and height.`)
        .addFields(
            { name: 'Weight:', value: `${gInput1}`, inline: true },
            { name: 'Height:', value: `${gInput2}`, inline: true },
            { name: 'Category:', value: `${resI}`, inline: true },
        )
        .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/BMI_chart.png/1024px-BMI_chart.png')
        .setFooter({ text: 'Image Attribution: nagualdesign (CC BY-SA 4.0)' });

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('Wikipedia: Body Mass Index')
                .setStyle('LINK')
                .setEmoji('ℹ️')
                .setURL('https://en.wikipedia.org/wiki/Body_mass_index'),
                
        );
        

        await interaction.reply({
            embeds: [bmiEmbed],
            components: [row]
        });

        //console.log(gInput1,gInput2,res)

		//await interaction.reply(`**Your Calculated BMI is** ${res} \n **BMI Chart:** https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/BMI_chart.png/1024px-BMI_chart.png`);
	
    },
};


```
