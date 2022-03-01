const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#4cc9f0",
							"@font-size-base": "16px"
						},
						javascriptEnabled: true
					}
				}
			}
		}
	]
};
