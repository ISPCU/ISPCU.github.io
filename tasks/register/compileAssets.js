module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
        // 'less:dev',
		'compass:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
