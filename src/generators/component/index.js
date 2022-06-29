const path = require( 'path' );
const fs = require( 'fs' );

const featuresDir = path.join( process.cwd(), 'src/features' );
const features = fs.readdirSync( featuresDir );

module.exports = {
    actions: ( answers ) => {
        const componentGeneratePath =
      !answers.feature || answers.feature === 'ROOT'
          ? 'src/components/{{folder}}'
          : 'src/features/{{feature}}/components';
        return [
            {
                path:         componentGeneratePath + '/{{properCase name}}/index.ts',
                templateFile: 'generators/component/index.ts.hbs',
                type:         'add'
            },
            {
                path:         componentGeneratePath + '/{{properCase name}}/{{properCase name}}.tsx',
                templateFile: 'generators/component/Component.tsx.hbs',
                type:         'add'
            },
            {
                path:         componentGeneratePath + '/{{properCase name}}/{{properCase name}}.stories.tsx',
                templateFile: 'generators/component/Component.stories.tsx.hbs',
                type:         'add'
            }
        ];
    },
    description: 'Component Generator',
    prompts:     [
        {
            message: 'component name',
            name:    'name',
            type:    'input'
        },
        {
            choices: [ 'ROOT', ...features ],
            message: 'Which feature does this component belong to?',
            name:    'feature',
            type:    'list',
            when:    () => features.length > 0
        },
        {
            message: 'folder in components',
            name:    'folder',
            type:    'input',
            when:    ({ feature }) => !feature || feature === 'ROOT'
        }
    ]
};
