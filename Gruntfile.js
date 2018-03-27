module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['public/assets/src/js/*.js'],
                tasks: ['copy', 'shell:rollupDev']
            }
        },
        shell: {
            rollupDev: {
                command: 'export BABEL_ENV=dev && ./node_modules/.bin/rollup -c rollup-dev.config.js'
            },
            removeBuild: {
                command: 'rm -rf public/assets/build'
            },
            tests: {
                command: 'export BABEL_ENV=test && ./node_modules/.bin/babel-tape-runner tests/*.test.js | ./node_modules/.bin/tap-spec'
            },
            coverage: {
                command: 'export BABEL_ENV=test && ./node_modules/.bin/nyc ./node_modules/.bin/babel-tape-runner tests/*.test.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/material-design-icons/iconfont/',
                        src: ['**'],
                        dest: 'public/assets/build/fonts/material-design-icons/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/materialize-css/dist/css/materialize.min.css',
                            'public/assets/src/css/site.css'
                        ],
                        dest: 'public/assets/build/css/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/jquery/dist/jquery.min.js',
                            'node_modules/materialize-css/dist/js/materialize.min.js'
                        ],
                        dest: 'public/assets/build/js/',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['shell:removeBuild', 'copy:main', 'shell:rollupDev']);
    grunt.registerTask('dev', ['shell:removeBuild', 'copy:main', 'shell:rollupDev', 'watch']);
    grunt.registerTask('tests', ['shell:tests']);
    grunt.registerTask('coverage', ['shell:coverage']);
};