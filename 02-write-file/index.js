// const stream = require('stream');
const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = require('process');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);
const input = readline.createInterface(stdin);

stdout.write('Hello');

input.on('line', (text) => {
  if (text ==='exit'){
    stdout.write('goodbye');
    exit();
  }
  output.write(text + '\n');
    
});

process.on('SIGINT', () => {

  stdout.write('goodbye');
  exit();
});