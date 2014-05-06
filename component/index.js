'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var fs = require('fs');

var ComponentGenerator = yeoman.generators.NamedBase.extend({

  init: function () {
    this.nameContext = {
      name: this.name,
      className: this._.classify(this.name)
    }

    this.paths = {
      dirName: path.dirname(this.name),
      fileName: path.basename(this.name)
    }

    this.tests = [];

    this.destinationRoot(this.sourceRoot().split('/node_modules')[0])
  },

  createFiles: function(){
    var path = "app/scripts/" + this.name + "/";
    console.log(chalk.green('Creating the model, view and controller'));
    this.mkdir(path);
    this.template("_view.coffee", path + "view.coffee", this.nameContext);
    this.template("_model.coffee", path + "model.coffee", this.nameContext);
    this.template("_collection.coffee", path + "collection.coffee", this.nameContext);
  },

  createStyle: function(){
    console.log(chalk.green('Creating the styles'));

    if(this.paths.dirName != '.'){
      var loc = path.join('app/styles/components/', this.paths.dirName + "/");
    }
    else{
      var loc = "app/styles/components/";
    }
    this.template("style/_component.sass", loc + this.paths.fileName + ".sass", {name:this._.classify(this.paths.fileName)});
  },

  createTests: function(){
    var path = "test/unit/spec/" + this.name + "/";
    console.log(chalk.green('Creating the unit tests'));
    this.mkdir(path);
    this.template("test/_view.coffee", path + "view.coffee", {});
    this.template("test/_model.coffee", path + "model.coffee", {});
    this.template("test/_collection.coffee", path + "collection.coffee", this.nameContext);

    this.tests.push(this.name + '/view.coffee');
    this.tests.push(this.name + '/model.coffee');
    this.tests.push(this.name + '/collection.coffee');
  },

  addTestsToSuite: function(){
    var suite = this.readFileAsString("test/unit/suite.coffee");
    var path = "/test/unit/suite.coffee";
    var insert = '';
    this.tests.forEach(function(val, index, arr){
      insert+= '    \''+ val + '\'\n'
    });
    var absPath = this.destinationRoot() + path;
    var data = suite.replace('  ]', '\n' + insert+'\n  ]');
    // using node native methods to prevent yeoman-generator conflicter from prompting
    fs.writeFile(absPath, data, function (err) {
      if (err) throw err;
      console.log(chalk.green('Tests added to the suite!'));
    });
  }
});

module.exports = ComponentGenerator;
