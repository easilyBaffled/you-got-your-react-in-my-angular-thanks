const componentGenerator = require('./generators/component/index');
const featureConfig = require('./generators/feature/index.js')
const sliceConfig = require('./generators/slice/index.js')
const connectedComponent = require('./generators/connectedComponent/index.js')

module.exports = function (plop) {
	plop.setGenerator('component', componentGenerator);
	plop.setGenerator("feature", featureConfig);
	plop.setGenerator("slice", sliceConfig);
	plop.setGenerator("connectedComponent", connectedComponent);
};
