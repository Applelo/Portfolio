module.exports = {
    plugins: [
        "gatsby-plugin-stylus",
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography.js`,
            },
        },
    ],
}