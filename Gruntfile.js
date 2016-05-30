module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        typescript:{
            class:{
                generateTsConfig:true,
                src:['src/*.ts'],
                dest:'bin/jsAFlag.js',
                options:{
                    module:'none',
                    target:'es6',
                    sourceMap:true,
                    removeComments:true,
                    declaration:true,
                }
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-typescript');
    
    grunt.registerTask('build-class',['typescript:class']);
    grunt.registerTask('default',['build-class']);
}