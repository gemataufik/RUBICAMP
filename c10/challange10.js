const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tulis Kalimatmu disini> ',
});

rl.prompt();

rl.on('line', (line) => {
    function kataKata(line) {
        let vokal = ["a", "i", "u", "e", "o"];
        let kalimat = line.split(" ");

        let result = [];

        for (let i = 0; i < kalimat.length; i++) {


            if (kalimat[i].charAt(0) == vokal[0]) {
                result.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[1]) {
                result.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[2]) {
                result.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[3]) {
                result.push(kalimat[i])
            } else if (kalimat[i].charAt(0) == vokal[4]) {
                result.push(kalimat[i])
            } else {
                let konsonan = kalimat[i].substring(1) + kalimat[i].charAt(0) + "nyo"
                result.push(konsonan)
            }

        }
        return result.join(" ")
    }
    console.log('Hasil Konversi:',kataKata(line))

    rl.prompt();
}).on('close', () => {
    console.log('Good bye!');
    process.exit(0);
});