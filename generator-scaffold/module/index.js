'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var chalk = require('chalk');
var fs = require('fs');

var ModuleGenerator = yeoman.generators.NamedBase.extend({
  init: function () {

    this.paths = {
      dirName: path.dirname(this.name),
      fileName: path.basename(this.name)
    }
    if(this.paths.dirName != '.'){
      this.filePath = path.join('app/scripts', this.paths.dirName + "/");
      this.testPath = path.join('test/unit/spec', this.paths.dirName + "/");
    }
    else{
      this.filePath = 'app/scripts/';
      this.testPath = 'test/unit/spec/'
    }

    this.destinationRoot(this.sourceRoot().split('/generators')[0])
  },

  createFolder: function(){
    if(this.paths.dirName != '.'){
      console.log(chalk.green('Nested module detected. Creating folder.'));
      this.mkdir(this.filePath);
      this.mkdir(this.testPath);
    }
  },

  createFile: function(){
    console.log(chalk.green('Creating module'));

    this.template("module.coffee", this.filePath + this.paths.fileName + ".coffee", {});
  },

  createTest: function(){
    console.log(chalk.green('Creating test'));
    this.test = this.paths.fileName + ".coffee";
    this.template("module.coffee", this.testPath + this.test, {});
  },

  addTestToSuite: function(){
    var suite = this.readFileAsString("test/unit/suite.coffee");
    var path = "/test/unit/suite.coffee";

    if(this.paths.dirName != '.'){
      this.test = this.paths.dirName + '/' + this.test
    }

    var insert = '    \''+ this.test + '\'\n'
    var absPath = this.destinationRoot() + path;
    var data = suite.replace('  ]', '\n' + insert+'\n  ]');
    // using node native methods to prevent yeoman-generator conflicter from prompting
    fs.writeFile(absPath, data, function (err) {
      if (err) throw err;
      console.log(chalk.green('Tests added to the suite!'));
    });
  }

});

module.exports = ModuleGenerator;
