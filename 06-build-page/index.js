const fs = require('fs');
const { readFile } = require('fs/promises');
const { constants } = require('fs');
const { copyFile } = require('fs/promises');
const path = require('path');
const dataArr = ['header', 'articles', 'footer'];

fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, templateContent) => {

  fs.readdir(path.join(__dirname, 'styles',(err, files )=>{ 
    for (let i = 0; i < dataArr.length; i++){
      templateContent = templateContent.replace(`\{\{${dataArr[i]}\}\}`,files[i]);

    }
  } ));


});

