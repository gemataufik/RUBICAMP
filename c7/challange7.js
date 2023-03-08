function faktorial(n) {
    let string = n.toString()
    let angka = string.split("")
    let result = 1

    if (angka.length === 1) {
        return string

    } else {

        for (let i = 0; i < angka.length; i++) {
            result *= angka[i]
        }
        return faktorial(result)
    }
}
console.log(faktorial(39));
console.log(faktorial(999));
console.log(faktorial(3));