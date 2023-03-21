const readline = require('readline');
const fs = require('fs');

if (process.argv[2] !== 'data.json') {
    console.log(`tolong sertakan nama file sebagai inputan soal misalnya 'node solution.js data.json'`);
    process.exit();
} else {
    const data = fs.readFileSync('data.json');
    const quizData = JSON.parse(data);

    let i = 0;
    let wrongAnswer = 1;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Jawaban : '
    });

    console.log(`Selamat datang di permainan tebak kata. kamu akan di berikan pertanyaan dari file ini'data.json'.untukbermain,jawablah dengan jawaban yang sesuai.gunakan'skip' untuk menangguhkan pertanyaannya,dan di akhir pertanyaan akan ditanyakan lagi`);
    console.log(`Pertanyaan: ${quizData[i].definition}`);
    rl.prompt();
    rl.on('line', function (answer) {
        if (answer.toLowerCase() == quizData[i].term) {
            console.log('jawaban benar!')
            i++;
            wrongAnswer = 1;
            if (i == quizData.length) {
                console.log('Selamat..Anda beruntung!');
                process.exit();
            }
            console.log("Pertanyaan: " + quizData[i].definition);
            rl.prompt();
        }
        else if (answer.toLocaleLowerCase() == 'skip') {
            quizData.push(quizData[i]);
            i++
            console.log("Pertanyaan: " + quizData[i].definition);
            rl.prompt();
        }
        else {
            console.log(`Wkwkwkwk anda kurang beruntung! anda salah ${wrongAnswer} kali, silahkan coba lagi.`);
            wrongAnswer++;
            rl.prompt();
        }
    });
}