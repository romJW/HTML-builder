const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (error, data)=>{

  for (const file of data){
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) =>{ if (stats.isFile()) console.log(file.split('.')[0] + ' - ' + path.extname(file) + ' - ' + stats.size);});
  }
}
);



