const componentGenerator = require('./generators/component');
const featureConfig = require('./generators/feature');
const sliceConfig = require('./generators/slice');
const connectedComponent = require('./generators/connectedComponent');

module.exports = function (plop) {
	plop.setGenerator('component', componentGenerator);
	plop.setGenerator("feature", featureConfig);
	plop.setGenerator("slice", sliceConfig);
	plop.setGenerator("connectedComponent", connectedComponent);
};
