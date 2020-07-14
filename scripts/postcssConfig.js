const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        rucksack(),
        autoprefixer({
            overrideBrowserslist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        })
    ]
};