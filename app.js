//discord , main
const Discord = require('discord.js');
const config = require('./config.json');

//discord , commands 
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const axios = require('axios');

const commandes = require("./commands.json");


//demarage du bot
const client = new Discord.Client({intents: config.droit});
client.login(config.token);

//ajout du rest api pour envoyer les commandes
const rest = new REST({ version: '9' }).setToken(config.token);

client.on('ready', async () => {
    client.user.setActivity(config.activity, { type: 'PLAYING' });
    console.log(`Logged in as ${client.user.tag}!`);

    console.log("creation des commandes ...");
    let commands = [];
    for (let i = 0 ; i < commandes.length;i++){
        //ajout des premier detailes
        let current = new SlashCommandBuilder();
        current.setName(commandes[i].name);
        current.setDescription(commandes[i].description);

        //ajout des arguments (si besoins)
        for(let j = 0 ; j < commandes[i].args.length;j++){
            let curArg = commandes[i].args[j];
            switch(curArg.type){
                case "int":
                    current.addIntegerOption(option =>
                        option.setName(curArg.name)
                            .setDescription(curArg.description)
                            .setRequired(curArg.needed)
                    );
                break;
                case "bool":
                    current.addBooleanOption(option =>
                        option.setName(curArg.name)
                            .setDescription(curArg.description)
                            .setRequired(curArg.needed)
                    );
                break;
                case "mention":
                    current.addMentionableOption(option =>
                        option.setName(curArg.name)
                            .setDescription(curArg.description)
                            .setRequired(curArg.needed)
                    );
                break;
                case "role":
                    current.addRoleOption(option =>
                        option.setName(curArg.name)
                            .setDescription(curArg.description)
                            .setRequired(curArg.needed)
                    );
                break;
                case "string":
                    current.addStringOption(option =>
                        option.setName(curArg.name)
                            .setDescription(curArg.description)
                            .setRequired(curArg.needed)
                    );
                break;
                case "channel":
                    current.addChannelOption(option =>
                        option.setName(curArg.name)
                            .setDescription(curArg.description)
                            .setRequired(curArg.needed)
                    );
                break;
            }
        }
        commands.push(current);
    }

    //creation des routes

    await rest.put(
        Routes.applicationCommands(config.bot),
        { body: commands },
    );

    console.log("commandes cree !");
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    let options = interaction.options._hoistedOptions;
    let args = {};

    for(let i = 0 ; i < options.length; i++){
        args[options[i].name] = options[i].value;
    }

    eval(interaction.commandName+"(interaction,args)");
})

//embed maker
function embed_maker (data){
    /*
    data : {
        "title":"title",
        "description":"description",
        "url":"url",
        "color":"color",
        "icon":"icon",
        "footer":"footer",
        "fields":[
            {
                "name":"name",
                "value":"value",
                "inline":true
            }
        ]
    }
    */
    let embed = new Discord.MessageEmbed();
    embed.setTitle(data.title);
    embed.setDescription(data.description);
    embed.setURL(data.url);
    embed.setColor(data.color);
    embed.setThumbnail(data.icon);
    for(let i = 0 ; i < data.fields.length;i++){
        embed.addField(data.fields[i].name,data.fields[i].value,data.fields[i].inline);
    }
    return embed;
}


//commandes
function ping(int, args){
    int.reply("pong");
}

function rand(int, args){
    int.reply((Math.floor(Math.random() * args.max) + 1).toString()+" / "+args.max);
}

function testembed(int, args){
    int.reply({embeds:[embed_maker({
        title:args["title"],
        description:args["description"],
        url:"https://discord.js.org/",
        color:"#ff0000",
        fields:[
            {
                "name":"name",
                "value":"value",
                "inline":true
            }
        ]
    })]});
}