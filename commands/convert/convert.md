## Description 
> This command allows users to convert units to other units

*Note: This command follows the discord.js v13 guide format*

## Packages used
[health-calculator](https://github.com/gedex/health-calculator) - `npm i health-calculator`


```js
/*****************************
*
*  Coded by Dexter Roderick
*  Github: @Rexyislive     
*  Discord: Rexyislive#2550
*
*****************************/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { util } = require('health-calculator')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('convert different units!')
		.addStringOption(option => option.setName('amount').setDescription('Amount to convert'))
    .addStringOption(option => option.setName('first').setDescription('First unit. cm/in/kg/lb/cal/kj/l/oz/gal'))
		.addStringOption(option => option.setName('second').setDescription('Second unit. cm/in/kg/lb/cal/kj/l/oz/gal')),

	async execute(interaction) {

		const numInput = interaction.options.getString('amount');
    const firstInput = interaction.options.getString('first');
    const secondInput = interaction.options.getString('second');
    
		let res;
		let snum;
		let imsg;

		if (firstInput === 'kg' && secondInput === 'lb' || secondInput === 'lbs'){
			//convert kg to lb
			snum = parseFloat(numInput);
			res = util.kgToLb(snum);
			imsg = `${numInput} kg => ${res} lb`
		}

		if (firstInput === 'lb' || firstInput === 'lbs' && secondInput === 'kg'){
			//convert lb to kg
			snum = parseFloat(numInput);
			res = util.lbToKg(snum);
			imsg = `${numInput} lb => ${res} kg`
		}

		if (firstInput === 'cm' && secondInput === 'in'){
			//convert cm to in
			let resN;
			snum = parseFloat(numInput);
			res = util.cmToInch(snum);
			resN = res.toFixed(2)
			imsg = `${numInput} cm => ${resN} in`
		}

		if (firstInput === 'in' && secondInput === 'cm'){
			//convert in to cm
			let resN;
			snum = parseFloat(numInput);
			res = util.inchToCm(snum);
			resN = res.toFixed(2)
			imsg = `${numInput} in => ${resN} cm`
		}

		if (firstInput === 'cal' && secondInput === 'kJ' || secondInput === 'kj'){
			//convert cal to kJ
			let resN;
			snum = parseFloat(numInput);
			res = snum*4.184
			resN = res.toFixed(2)
			imsg = `${numInput} cal => ${resN} kJ`
		}

		if (firstInput === 'kj' || firstInput === 'kJ' && secondInput === 'cal'){
			//convert cm to in
			let resN;
			snum = parseFloat(numInput);
			res = snum/4.184
			resN = res.toFixed(2)
			imsg = `${numInput} kJ => ${resN} cal`
		}

		if (firstInput === 'l' || firstInput === 'L' || firstInput === 'litre' && secondInput === 'oz' || secondInput === 'ounces' || secondInput === 'fl oz'){
			//convert ounces
			let resN;
			snum = parseFloat(numInput);
			res = snum/33.814
			resN = res.toFixed(2)
			imsg = `${numInput} l => ${resN} oz`
		}

		if (firstInput === 'oz' || firstInput === 'fl oz' || firstInput === 'ounces' && secondInput === 'L' || secondInput === 'l' || secondInput === 'litre'){
			//convert litre
			let resN;
			snum = parseFloat(numInput);
			res = snum*33.814
			resN = res.toFixed(2)
			imsg = `${numInput} oz => ${resN} l`
		}

		if (firstInput === 'gal' || firstInput === 'gallon' && secondInput === 'l' || secondInput === 'litre' || secondInput === "L"){
			//convert gallon
			let resN;
			snum = parseFloat(numInput);
			res = snum*4.54609
			resN = res.toFixed(2)
			imsg = `${numInput} gal => ${resN} l`
		}

		if (firstInput === 'l' || firstInput === 'L' || firstInput === 'litre' && secondInput === 'gal' || secondInput === 'gallon'){
			//convert litre
			let resN;
			snum = parseFloat(numInput);
			res = snum/4.546
			resN = res.toFixed(2)
			imsg = `${numInput} l => ${resN} gal`
		}

		if (numInput <= 0){
			res = 0;
			imsg = 'Amount cannot be zero or less than zero'
		}

		if (res == undefined){
			imsg = 'There was an error😔 - please make sure unit types are not clashing. If the error persists, please make a bug report in our discord so we can fix it'
		}

		const cEmbed = new MessageEmbed()
        .setColor('#000')
        .addFields(
            { name: 'Result', value: `${imsg}`}
        );

		//console.log(numInput+firstInput+secondInput+res)		
        await interaction.reply({
            embeds: [cEmbed]
        });
	},
};
```
