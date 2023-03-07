function kataKata(param) {
    let vokal = ["a", "i", "u", "e", "o"];
    let kalimat = param.split(" ");

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
    console.log(result.join(" "));
}
kataKata("ibu pergi ke pasar bersama aku")

