## Description 
> This command allows users to calculate their Macronutrients based on goals

*Note: This command follows the discord.js v13 guide format*

## Packages used
[fitness-calculator](https://github.com/manas3874/fitness-calculator) - `npm i fitness-calculator`


```js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fitness = require('fitness-calculator');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('macros')
		.setDescription('Get diet plans based on macronutrients')
        .addStringOption(option => option.setName('gender').setDescription("Enter gender."))
        .addStringOption(option => option.setName('age').setDescription("How old are you?"))
        .addStringOption(option => option.setName('weight').setDescription("Enter weight. (kg - just the digits)"))
        .addStringOption(option => option.setName('height').setDescription("Enter weight. (cm - just the digits)."))
        .addStringOption(option => option.setName('activity').setDescription('How active are you? (sedentary, light, moderate, active, extreme)'))
        .addStringOption(option => option.setName('goal').setDescription("What's your goal? (balance, mildWeightLoss, mildWeightGain, heavyWeightLoss, heavyWeightGain)")),

	async execute(interaction) {
        //User inputs
        const genderInput = interaction.options.getString('gender');
        const ageInput = interaction.options.getString('age');
        const weightInput = interaction.options.getString('weight');
        const heightInput = interaction.options.getString('height');
        const actInput = interaction.options.getString('activity');
        const goalInput = interaction.options.getString('goal');

        let res;
        let converted;

        let ageC = parseFloat(ageInput);
        let heightC = parseFloat(heightInput);
        let weightC = parseFloat(weightInput);
        
        //calculate Macronutrient data and Caloric needs data from fitness-calculator
        res = fitness.macros(genderInput,ageC,heightC,weightC,actInput,goalInput);
        calres = fitness.calorieNeeds(genderInput,ageC,heightC,weightC,actInput);

        //Simpler vars to work with
        let goalNewVal;
        let Ubalance = calres.balance;
        let UmildWeightLoss = calres.mildWeightLoss;
        let UmildWeightGain = calres.mildWeightGain;
        let UheavyWeightLoss = calres.heavyWeightLoss;
        let UheavyWeightGain = calres.heavyWeightGain;

        //if user choice is x then set that as goal
        if (goalInput === 'balance'){goalNewVal = Ubalance;}
        if (goalInput === 'mildWeightLoss'){goalNewVal=UmildWeightLoss;}
        if (goalInput === 'mildWeightGain'){goalNewVal=UmildWeightGain;}
        if (goalInput === 'heavyWeightLoss'){goalNewVal=UheavyWeightLoss;}
        if (goalInput === 'heavyWeightGain'){goalNewVal=UheavyWeightGain;}

        converted = goalNewVal*4.184

        const maEmbed = new MessageEmbed()
        .setColor('#000')
        .setTitle('Macronutrients')
        .setDescription(`Below are your calculated Macros based on your activity level and goal.\n\n
        The *four* types of macros are **fat**, **protein** and **carbohydrates**.
        `)
        .addFields( 
            { name: 'Total Calories ', value: `${goalNewVal} cal / ${converted} kJ`, inline:true},
            { name: 'Balanced Diet Plan: ', value: `__Carbs:__ ${res.balancedDietPlan.carb}g
                                                    __Protein:__ ${res.balancedDietPlan.protein}g 
                                                    __Fat:__ ${res.balancedDietPlan.fat}g`},
            { name: 'Low Carb Diet Plan: ', value: `__Carbs:__ ${res.lowCarbDietPlan.carb}g
                                                    __Protein:__ ${res.lowCarbDietPlan.protein}g 
                                                    __Fat:__ ${res.lowCarbDietPlan.fat}g`,inline:true},
            { name: 'High Carb Diet Plan: ', value: `__Carbs:__ ${res.highCarbDietPlan.carb}g
                                                    __Protein:__ ${res.highCarbDietPlan.protein}g 
                                                    __Fat:__ ${res.highCarbDietPlan.fat}g`},
            { name: 'High Protein Diet Plan: ', value: `__Carbs:__ ${res.highProteinDietPlan.carb}g
                                                        __Protein:__ ${res.highProteinDietPlan.protein}g 
                                                        __Fat:__ ${res.highProteinDietPlan.fat}g`,inline:true},
            { name: 'Low Fat Diet Plan: ', value:   `__Carbs:__ ${res.lowFatDietPlan.carb}g
                                                    __Protein:__ ${res.lowFatDietPlan.protein}g 
                                                    __Fat:__ ${res.lowFatDietPlan.fat}g`}
        )
        .setFooter({text:'Remember these results should not replace the advice of a health professional.'})
    
        //reply with Embed
        await interaction.reply({
            embeds: [maEmbed]
        });
	},
};
```
