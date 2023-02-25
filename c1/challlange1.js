function sum () {
    let hasil = 0
for (let i = 0; i < arguments.length; i++) {
    hasil += arguments [i];
}
return hasil;

}

console.log(sum(1,2,7))
console.log(sum(1,4))
console.log(sum(11))
console.log(sum(10,3,6,7,9))


