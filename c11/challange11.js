const fs = require('fs');
const readline = require('readline');


const data = fs.readFileSync('data.json', 'utf-8');
const parsedData = JSON.parse(data);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tebakan : ',
});

let i = 0;
console.log('Selamat datang di permainan tebak kata, silahkan isi dengan jawaban yang benar ya!')

console.log(`Pertanyaan : ${parsedData[i].definition}`)


rl.prompt();

rl.on('line', (line) => {
  if (line === parsedData[i].term) {
    console.log('Selamat Anda Benar!')
    i++
  } else {
    console.log('Wkwkwk, Anda kurang beruntung!')
  }

  if (i === parsedData.length) {
    console.log('Hore Anda Menang!')
    rl.close()
  }
  console.log(`pertanyaan : ${parsedData[i].definition}`)
  rl.prompt();
}).on('close', () => {
  // console.log('Good bye!');
  process.exit(0);
});

