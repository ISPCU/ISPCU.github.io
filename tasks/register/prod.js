module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
        'compass:dev',
        'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);
};
