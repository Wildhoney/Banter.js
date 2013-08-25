module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['demo/client/js/banter.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'demo/client/js/banter.js',
                dest: 'dist/banter-<%= pkg.version %>.min.js'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'nested'
                },
                files: {
                    'dist/banter-<%= pkg.version %>.css': 'demo/client/sass/default.scss'
                }
            }
        },
        jasmine: {
            pivotal: {
                src: 'demo/client/js/banter.js',
                options: {
                    specs: 'tests/client/spec.js',
                    helpers: ['demo/client/js/vendor/*', 'tests/client/vendor/angular-mocks-*.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Testing.
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('build', ['uglify', 'sass']);

    // Build.
    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'sass']);

};