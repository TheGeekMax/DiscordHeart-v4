# le faire fonctionner

il faut executer cette commande :

```console
foo@bar:~$ npm install discord.js @discordjs/rest axios
```

et creer un `config.json` avec les informations suivantes :

```json
{
  "token": "token de votre bot",
  "author": "id du créateur du bot",
  "bot": "id du bot",
  "droit": ["droits"],
  "activity": "activité du bot"
}
```

## les droits du bot

liste des permisions sur [ce site](https://discord.com/developers/docs/topics/permissions)

valeur par defaut

```json
["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]
```

## les commandes du bot

type d'arguments

| commande | type |
|----------|------|
|"bool"|insert un booléen|
|"int"|insert un nombre entier|
|"mention"|insert une personne/role|
|"role"|insert un role|
|"string"|insert une chaine de caractère|
|"channel"|insert un channel|

