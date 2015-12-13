
var NUM = 1000;

var sh = require('execSync');
var result = sh.exec('clouddrive find .jpg');




var lines = result.stdout.split("\n");

// console.log(lines[3].split(" ")[15]);

var latestFetch = [];


// clean files
sh.exec("rm -rf *.jpg && rm -rf *.JPG");

//sync cloud drive
console.log(sh.exec("clouddrive sync").stdout);

lines.forEach(function (line) {
	var split = line.replace(/\s+/g, ' ').split(" ");

	var available = split[4];
	var fileName = split[7];

	if (fileName != undefined  && available != undefined && fileName.indexOf('IMG') < 0 && fileName.indexOf('iOS') < 0 && available == "AVAILABLE")
		latestFetch.push(fileName);
});


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
}



currSelection = getRandom(latestFetch, NUM);


currSelection.forEach(function(sel) {
	sh.exec("clouddrive download " + sel + " . ");
});
