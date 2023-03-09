function pola (n) {
    let arr = n.split(" ")
    let gabung1 = n.split(" ")
    let gabung2 = n.split(" ")
    let gabung3 = n.split(" ")
    let result = []


    for (let i = 0; i < 10; i++) {

        for (let j = 0; j < 10; j++) {
            if (parseInt(gabung1[0].replace('#', i)) * parseInt(gabung2[2]) === parseInt(gabung3[4].replace("#", j)))
                result.push(i, j)

        }
    }
    return result
}
console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));