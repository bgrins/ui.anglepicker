
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '// ui.anglepicker v<%= pkg.version %>\n' +
        '// https://github.com/bgrins/ui.anglepicker\n' +
        '// <%= grunt.template.today("yyyy-mm-dd") %>, Brian Grinstead, MIT License\n'
    },

    uglify: {
      options: {
        mangle: false,
        banner: '<%= meta.banner %>'
      },
      dist: {
        files: {
          'dist/ui.anglepicker.min.js': ['ui.anglepicker.js']
        }
      }
    },

    qunit: {
      all: ['test/index.html']
    },

    jshint: {
      options: {
          jshintrc: '.jshintrc'
      },
      all: [
          'ui.anglepicker.js'
      ]
    },

    watch: {
      qunit: {
          files: ['test/tests.js', 'ui.anglepicker.js'],
          tasks: ['qunit']
      }
    }

  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('default', ['jshint', 'qunit']);
  grunt.registerTask('build', ['jshint', 'qunit', 'uglify']);

};
