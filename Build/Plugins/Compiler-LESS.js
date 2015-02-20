"use strict";var _prototypeProperties=function(e,t,n){t&&Object.defineProperties(e,t),n&&Object.defineProperties(e.prototype,n)},_classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},Promise=require("a-promise"),UglifyCSS=null,LESS=null,FS=require("fs"),Path=require("path"),H=require("../H"),Compiler=null,CompilerLESS=function(){function e(){_classCallCheck(this,e)}return e.RegexAppend=/@(codekit-append|prepros-append|Compiler-Append)/,e.RegexOutput=/@Compiler-Output/,e.RegexSourceMap=/@Compiler-Sourcemap/,e.RegexExtract=/".*"/,_prototypeProperties(e,{init:{value:function(e){Compiler=e},writable:!0,configurable:!0},ExtractValue:{value:function(t){return new Promise(function(n,r){var i=e.RegexExtract.exec(t);return i.length?(i=i[0].substr(1,i[0].length-2),void n(i)):r()})},writable:!0,configurable:!0},ExtractPath:{value:function(t,n){return new Promise(function(r,i){e.ExtractValue(t).then(function(e){e.substr(0,1)!==Path.sep&&":"!==e.substr(1,1)&&(e=n+Path.sep+e),r(e)},i)})},writable:!0,configurable:!0},ParseAppend:{value:function(t,n,r,i){return new Promise(function(o,u){e.ExtractPath(t,n).then(function(e){i?FS.readFile(e,function(t,n){return t?u("The File '"+e+" doesn't exist, It was imported in "+r+"'"):void o(n.toString())}):Compiler.Compile(e).then(function(e){o(e.Content)},u)},u)})},writable:!0,configurable:!0},Parse:{value:function(t,n,r){return new Promise(function(i,o){var u={Content:"",Opts:r},a=Path.dirname(t),c=[];n.forEach(function(i,o){var u;-1!==i.indexOf("//")&&c.push(new Promise(function(c,l){return i=i.trim(),u=i.indexOf("//"),-1===u||0!==u?c():void(e.RegexAppend.test(i)?e.ParseAppend(i,a,t,!!r.SourceMap).then(function(e){n[o]=e,c()},l):e.RegexOutput.test(i)?e.ExtractPath(i,a).then(function(e){r.TargetFile=e,n[o]="",c()},l):e.RegexSourceMap.test(i)?e.ExtractPath(i,a).then(function(e){n[o]="",r.SourceMap=""===e?null:e,c()}):c())}))}),Promise.all(c).then(function(){u.Content=n.join("\n"),i(u)},o)})},writable:!0,configurable:!0},Process:{value:function(t,n){return new Promise(function(r,i){FS.readFile(t,function(o,u){return o?i(o):void e.Parse(t,u.toString().split("\n"),n).then(function(e){n=e.Opts;var t=null!==n.SourceMap,o={Content:"",SourceMap:"",Opts:n};LESS=LESS||require("less"),LESS.render(e.Content,{sourceMap:!0}).then(function(e){o.Content=e.css,t&&(o.SourceMap=e.map),n.SourceMap||(UglifyCSS=UglifyCSS||new(require("clean-css"))({sourceMap:!0}),o.Content=UglifyCSS.minify(o.Content).styles),t&&(o.Content+="/*# sourceMappingURL="+H.Relative(Path.dirname(n.TargetFile),n.SourceMap)+" */"),r(o)},i)},i)})})},writable:!0,configurable:!0}}),e}();module.exports=CompilerLESS;