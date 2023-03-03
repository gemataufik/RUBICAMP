function indexPrime (n) {
    let number = 2;
    let result = [];
    while (result.length < n) {
        let stat = true;
        for (let i = 2; i < number; i++) {
            if (number % i == 0){
                stat = false;
                
            }
            
        }
        if (stat === true){
            result.push(number)
           
        }
        number++
       
    }
    return  result [n -1]   
}
console.log(indexPrime(4))
console.log(indexPrime(500))
// console.log(indexPrime(1000))
// console.log(indexPrime(37786))