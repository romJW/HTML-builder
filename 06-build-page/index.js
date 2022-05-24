const fs = require('fs');
// const fsPromises = require('fs').promises;
const fsPromises = require('fs/promises');
const path = require('path');
const nameArr = ['header', 'articles', 'footer'];
const fileArr = ['header.html', 'articles.html', 'footer.html'];

(async ()=>{ 
  
  await fsPromises.rm(path.join(__dirname, 'project-dist'), {recursive: true, force: true});
  let templateFile = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf8', );


  for (let i=0; i<3; i++) {
    templateFile = templateFile.replace(`\{\{${nameArr[i]}\}\}`, await fsPromises.readFile(path.join(__dirname, 'components',fileArr[i] ), 'utf-8'));
  }
  await fsPromises.mkdir(path.join(__dirname, 'project-dist'),{ recursive: true });
  await fsPromises.mkdir(path.join(__dirname, 'project-dist','assets'),{ recursive: true });
 
  async function recursiveCopy(dir,dirCopy){
    const data = await fsPromises.readdir(path.join(dir),{withFileTypes: true});
    
    for (const file of data){
      // const pathFile = path.join(dir);
      // const pathFileCopy = path.join(__dirname, 'project-dist','assets',file.name);
      if (file.isDirectory()) {
        await fsPromises.mkdir(path.join(dirCopy,file.name),{ recursive: true });
        await recursiveCopy(path.join(dir, file.name), path.join(dirCopy,file.name));
      }
      else {   await fs.promises.copyFile(path.join(dir, file.name),path.join( dirCopy, file.name));
      }
    }
      
  }
    
  const assetsPath = path.join(__dirname, 'assets');
  const assetsCopyPath = path.join(__dirname, 'project-dist','assets');
  await recursiveCopy(assetsPath, assetsCopyPath);

  await fsPromises.writeFile(path.join(__dirname, 'project-dist','index.html'), templateFile);
  
  const ws = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'),'utf8');

  fs.readdir(path.join(__dirname, 'styles'),  (error, data)=>{
    if(error) console.log(error);
    for (let file of data){
      fs.stat(path.join(__dirname, 'styles', file), (err, stats) =>{ if (stats.isFile() && path.extname(path.join(__dirname, 'styles',file))==='.css'){
      
        (fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8')).pipe(ws);
      
      }
      });
    }
    
  });
  

})();
