
import readline from 'readline';

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export function line() {
    console.log('=================================================================================================')
}

export function welcome (){
    line()
    console.log('Welcome to University Of Oxford');
    console.log('Jl. Manchester No.449')
    line()
    
}