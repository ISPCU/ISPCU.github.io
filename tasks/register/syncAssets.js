module.exports = function (grunt) {
	grunt.registerTask('syncAssets', [
		'jst:dev',
        'compass:dev',
		// 'less:dev',
		'sync:dev',
		'coffee:dev'
	]);
};
