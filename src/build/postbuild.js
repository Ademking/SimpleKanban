/*
* Add css styling at the end of the index.html to remove FOUC (Flash of Unstyled Content)
* https://stackoverflow.com/a/30408388/10388753
*/

var fs = require('fs');
var path = require('path');
var inputFilePath = path.join(__dirname, '../../dist/simple-kanban/index.html');

fs.readFile(inputFilePath, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  var result = data.replace('</style>', '.myApp {display: none;}</style>');
  result = result.replace('<body>', '<body class="myApp">');
  result = result.replace('</body></html>', '<style>.myApp {display:block;}</style></body></html>');

  fs.writeFile(inputFilePath, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});