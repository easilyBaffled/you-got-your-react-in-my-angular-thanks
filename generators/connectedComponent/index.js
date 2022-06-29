import { getFeatureList } from "../getFeatureList.js";
import { detab } from "../detab.js";

export const connectedComponent = {
    actions: function({ name, featureName }) {
        const sourceDir = `src/features/${featureName}/components/`;
        const indexFile = sourceDir + `index.jsx`;
        const componentFile = sourceDir + `${name}.jsx`;
        console.log( indexFile, componentFile );
        const componentName = name.replace( /^(\w)/, ( $1 ) => $1.toUpperCase() );
        return [
            {
                path:     indexFile,
                pattern:  /($)/,
                template: `$1\nexport * from "./${name}";`,
                type:     "modify"
            },
            {
                path:     componentFile,
                template: detab`
					import { connect } from "react-redux";
					import { actions, selectors } from "../store";

					export const _${componentName} = () => (
						<>
						</>
					);

					export const ${componentName} = connect(
						(state, ownProps) => ({}),
						(dispatch, ownProps) => ({})
					)( _${componentName} );
                `,
                type: "add"
            }
        ];
    },
    description: "Feature Generator",
    prompts:     [
        {
            message: "Component name",
            name:    "name",
            type:    "input"
        },
        {
            choices: getFeatureList(),
            message: "Feature Name",
            name:    "featureName",
            type:    "rawlist"
        }
    ]
};
