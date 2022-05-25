const fs = require('fs');
const fsPromises = require('fs/promises');
const { constants } = require('fs');
const { copyFile } = require('fs/promises');
const path = require('path');

(async()=>{  
  await fsPromises.rm(path.join(__dirname, 'copied-files'), {recursive: true, force: true});
  await fs.promises.mkdir(path.join(__dirname, 'copied-files'),{ recursive: true });
  fs.readdir(path.join(__dirname, 'files'), (error, data)=>{
    for (const file of data){
      fs.promises.copyFile(path.join(__dirname, 'files', file),path.join(__dirname, 'copied-files', file));
    }
  }
  );
})();