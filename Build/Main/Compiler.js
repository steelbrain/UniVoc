"use strict";var _prototypeProperties=function(e,i,r){i&&Object.defineProperties(e,i),r&&Object.defineProperties(e.prototype,r)},_classCallCheck=function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")},Promise=require("a-promise"),FS=require("fs"),Compiler=function(){function e(){_classCallCheck(this,e);var i=require("./Plugins/Compiler-JS");this.Map={JS:{Compiler:i,Opts:{Compiler:"Babel"}},JSX:{Compiler:i,Opts:{Compiler:"Babel"}},TAG:{Compiler:i,Opts:{Compiler:"Riot"}}}}return _prototypeProperties(e,null,{Compile:{value:function(e,i,r){return new Promise(function(t,o){FS.exists(e,function(n){if(!n)return o("Source file "+e+" doesn't exist");var p=e.split(".").pop().toUpperCase(),s=this.Map[p].Opts;return s.TargetFile=i||null,s.SourceMap=r||null,this.Map.hasOwnProperty(p)?void this.Map[p].Compiler.Process(e,s).then(function(e){return s=e.Opts,s.TargetFile?void FS.writeFile(s.TargetFile,e.Content,function(i){return i?o(i):void(s.SourceMap?FS.writeFile(s.SourceMap,e.SourceMap,t):t())}):t(e)})["catch"](o):o("The given file type is not recognized")}.bind(this))}.bind(this))},writable:!0,configurable:!0}}),e}();module.exports=Compiler;