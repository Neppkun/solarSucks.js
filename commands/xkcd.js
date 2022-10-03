const ddg = require('duck-duck-scrape');

module.exports = {
    data: {
        name: 'xkcd',
        description: 'Solar sucks pepepoint',
        options: [
            {
                name: 'name',
                description: 'The name of the xkcd comic',
                type: 3,
                required: true
            }
        ]
    },

    async execute(interaction, client) {
        const comic = interaction.options.getString('name');
        const funny = await ddg.search(`${comic} site:xkcd.com`);
        console.log(funny);
        if (funny.noResults === true) {
            await interaction.reply({
                content: 'No results found. Devastating.',
                ephemeral: true
            })
        } else {
            await interaction.reply({
                content: funny.results[0].url,
                ephemeral: false
            })
        }
    }
}