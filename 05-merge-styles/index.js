const fs = require('fs');
const path = require('path');



const ws = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'),'utf8');

fs.readdir(path.join(__dirname, 'styles'), (error, data)=>{
  if(error) console.log(error);
  for (let file of data){
    fs.stat(path.join(__dirname, 'styles', file), (err, stats) =>{ if (stats.isFile() && path.extname(path.join(__dirname, 'styles',file))==='.css'){
      
      (fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8')).pipe(ws);
      
    }
    });
  }
    
});



