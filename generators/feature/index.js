export const featureConfig = {
    actions: function({ featureName, needs }) {
        const featureRootIndex = needs
            .map( ( s ) => `export * from './${s}'` )
            .join( "\n" );

        return needs.reduce(
            ( acc, k ) =>
                acc.concat({
                    path:     `src/features/${featureName}/${k}/index.jsx`,
                    template: `export const ${k} = "I think Plop.js is neat.";`,
                    type:     "add"
                }),
            [
                {
                    path:     `src/features/${featureName}/index.jsx`,
                    template: featureRootIndex,
                    type:     "add"
                }
            ]
        );
    },
    description: "Feature Generator",
    prompts:     [
        {
            message: "Feature name",
            name:    "featureName",
            type:    "input"
        },
        {
            choices: [
                { name: "Routes", value: "routes" },
                { name: "Store", value: "store" },
                { name: "Components", value: "components" },
                { name: "API", value: "api" }
            ],
            message: "What do you need",
            name:    "needs",
            type:    "checkbox"
        }
    ]
};
