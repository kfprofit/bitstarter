#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var rest = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var URL_DEFAULT = "http://pacific-hollows-1415.herokuapp.com";
var TEMP_FILE= "temp.tmp";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
	console.log("% does not exists.Exiting.",instr);
	process.exit(1);
    }
    return instr;
};

var cheerioHtmlFile = function(htmlfile){
    return cheerio.load(fs.readFileSync(htmlfile));
};


var loadChecks = function(checksfile) {

    return JSON.parse(fs.readFileSync(checksfile));
};

var  checkHtmlFile = function(htmlfile, checksfile) {

    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
	var present = $(checks[ii]).length > 0;
	out[checks[ii]]=present;

    }
    return out;

};

var url_exists = function(url){

return url;
};

var clone = function(fn) {
   // Workaround for commander.js issue/
   // htts://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
     program
       .option('-c, --checks <check_file>','Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
       .option('-f, --file <html_file>','Path to index.html',clone(assertFileExists))
       .option('-u, --url <URL>','URL for parsing')
       .parse(process.argv);
      // Add the Choice between --url and --file options.

if ((program.url)&&(program.file))
    {  console.log("Enter either file or url. Both parameters are unsupported.");
       process.exit(2);}

if (program.file) {var checkJson= checkHtmlFile(program.file,program.checks);
                   var outJson =JSON.stringify(checkJson,null,4);
                   console.log(outJson);}   


if (program.url){
    rest.get(program.url).on('complete',function(result){
       fs.writeFileSync(TEMP_FILE,result);
       var checkJson = checkHtmlFile(TEMP_FILE, program.checks);
       var outJson = JSON.stringify(checkJson, null, 4);
       console.log(outJson);
          }); 
   }   
    
} else {
     exports.checkHtmlFile = checkHtmlFile;
}

