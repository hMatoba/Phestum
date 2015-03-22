var system = require("system");
var fs = require("fs");

var phestumLib = (function() {/*
var Tests = {};

var phestum = {
    _isEqual : function (a, b) {
        if (typeof(a) !== typeof(b)) {
            return false;
        } else if (a === undefined && b === undefined){
            return true;
        } else if (a instanceof Array && b instanceof Array) {
            if (a.length !== b.length) {
                return false;
            }
            for (var p=0; p<a.length; p++) {
                if (!phestum._isEqual(a[p], b[p])){
                    return false;
                }
            }
            return true;
        } else if (typeof(a) === "object" && typeof(b) === "object") {
            if (a === null && b === null) {
                return true;
            }
            var propA = Object.getOwnPropertyNames(a);
            var propB = Object.getOwnPropertyNames(b);
            propA.sort();
            propB.sort();

            // check property names equality
            if (propA.length !== propB.length) {
                return false;
            } else {
                for (var p=0; p<propA.length; p++) {
                    if (!phestum._isEqual(propA[p], propB[p])){
                        return false;
                    }
                }
            }

            // check object value equality
            for (var p=0; p<propA.length; p++) {
                var prop = propA[p];
                if (!phestum._isEqual(a[prop], b[prop])){
                    return false;
                }
            }
            return true;
        } else if (typeof(a) === "string" || typeof(a) === "number") {
            if (a === b) {
                return true;
            } else {
                return false;
            }
        } else {
            throw("Got variable that cannot compare.");
        }
    },

    assertEqual : function (a, b) {
        if (!phestum._isEqual(a, b)) {
            throw("! " + JSON.stringify(a) + " != " + JSON.stringify(b));
        }
    },

    assertNotEqual : function (a, b) {
        if (phestum._isEqual(a, b)) {
            throw("! " + JSON.stringify(a) + " == " + JSON.stringify(b));
        }
    },
    
    assertFail : function (func) {
        var failed = false;
        try {
            func();
        } catch (e) {
            failed = true;
        }
        
        if (!failed) {
            throw("'phestum.assertFail' error. Given function didn't failed.")
        }
    },
};
*/}).toString().match(/\/\*([^]*)\*\//)[1];

eval(phestumLib);


// tests/files
if (fs.isDirectory("tests/files")) {
    Tests._files = {};
    var optionFiles = fs.list("tests/files/")
            .filter(function(item) {
                return [".", ".."].indexOf(item) == -1;
            })
            .map(function (item) {
                return item;
            });

    console.log("files: " + JSON.stringify(optionFiles));
    for (var p=0; p<optionFiles.length; p++) {
        Tests._files[optionFiles[p]] = fs.read("tests/files/" + optionFiles[p], {charset: "LATIN-1"});
    }
}

// prepare libraries
Tests._libs = [];
if (system.args.length > 1) {
    var libFiles = system.args.slice(1);
    console.log("lib: " + JSON.stringify(libFiles));
    Tests._libs = libFiles.map(function (i) {
        return fs.read(i);
    });
}
Tests._libs.unshift(phestumLib);

// prepare tests
Tests._tests = fs.list("tests/")
        .filter(function(item) {
            return item.indexOf(".js") !== -1;
        })
        .map(function (item) {
            return fs.read('tests/' + item);
        });

// load tests
for (Tests._counter=0; Tests._counter<Tests._tests.length; Tests._counter++) {
    eval(Tests._tests[Tests._counter]);
}
Tests._testNames = Object.keys(Tests).filter(function (item) {
    return (item[0] !== "_" &&
            typeof(Tests[item]) === "function" &&
            item.indexOf("Test") > -1);
});
console.log("test: " + JSON.stringify(Tests._testNames));

var pass = 0;
var fail = 0;
var scripts = Tests._libs.concat(Tests._tests);
for (var tCount=0; tCount<Tests._testNames.length; tCount++) {
    var testName = Tests._testNames[tCount];
    var gotError = false;
    var page = require('webpage').create();
    console.log("\n\n" + testName);
    console.log("=============");
    page.content = "<html><body></body></html>";
    page.onError = function (msg, trace) {
        var msgStack = ['ERROR: ' + msg];
        if (trace && trace.length) {
            msgStack.push('**TRACE:');
            trace.forEach(function(t) {
              msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            });
        }
        console.error("**" + msgStack.join('\n'));
        gotError = true;
    };

    page.onConsoleMessage = function(msg, lineNum, sourceId) {
        console.log('' + msg);
    };

    for (var p=0; p<scripts.length; p++) {
        page.evaluate(function (script) {
            var scrEl = document.createElement("script");
            scrEl.text = script;
            document.body.appendChild(scrEl);
        }, scripts[p]);
    }

    var testRun = "Tests." + testName + "();";
    page.evaluate(function (obj) {Tests.files = obj;}, Tests._files);
    page.evaluate(function (script) {
        var scrEl = document.createElement("script");
        scrEl.text = script;
        document.body.appendChild(scrEl);
    }, testRun);

    
    console.log("=============");
    if (gotError) {
        fail += 1;
        console.log("fail");
    } else {
        pass += 1;
        console.log("pass");
    }
}

console.log("\n\nPassed: " + pass);
console.log("Failed: " + fail);
if (fail) {
    phantom.exit(1);
} else {
    phantom.exit();
}
