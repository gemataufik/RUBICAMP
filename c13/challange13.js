const fs = require('node:fs');
const process = require('node:process');

const args  = process.argv
const args1 = process.argv[2];
const args2 = process.argv[3];


const daftarList = `>>>> JS TODO <<<<
$ node daftar.js <command>
$ node daftar.js list
$ node daftar.js task <task_id>
$ node daftar.js add <task_content
$ node daftar.js delete <task_id>
$ node daftar.js completed <task_id>
$ node daftar.js uncompleted (task_id)
$ node daftar.js list:outstanding asc|desc
$ node daftar.js list:completed asc|desc
$ node daftar.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node daftar.js filter:<tag_name>`


let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata)

if(args1 === undefined){
    console.log(daftarList)
}else{
    if(args1 === "help"){
        console.log(daftarList);
    }else if(args1 === "list"){
        console.log("Daftar pekerjaan");
        for (let i = 0; i < data.length; i++) {
            console.log(`${i+1}. [${data[i].status ? 'X' : ' '}] ${data[i].task_content}`)    
        }
    }else if(args1 === 'task'){
        console.log("Daftar Pekerjaan")
        for (let i = 0; i < data.length; i++){
            if(args2 == data[i].task_id){
                console.log(`task_id : ${data[i].task_id} [${data[i].status ? 'X' : ' '}] ${data[i].task_content}`)
            }else if( args2 == undefined){
                console.log("Masukkan id task")
            }
        }
    }else if(args1 === 'add'){
        let sentence = ''
        let index = 1;
        for (let i = 0; i < data.length; i++) {
            index++;   
        }
        for (let i = 3; i < args.length; i++) {
            sentence += args[i] + ' ';
        }
        data.push({
            "task_id" : index,
            "task_content" : sentence.trim(),
            "status" : false,
            "tag"   : []
        })
        fs.writeFileSync('data.json', JSON.stringify(data,null,4))
        console.log(`"${sentence.trim()}" telah di tambahkan`)
    }else if(args1 === 'delete'){
        let indexDelete = parseInt(args2) - 1;
        //console.log(indexDelete)
        let dataItem = data[indexDelete];
        data.splice(indexDelete, 1);
        fs.writeFileSync('data.json', JSON.stringify(data,null,4))
        console.log(`${dataItem.task_content} telah di hapus dari daftar`)
    }else if(args1 === 'complete'){
        let indexComplete = parseInt(args2) - 1;
        let dataItem = data[indexComplete];
        let complete = data[indexComplete].status = true;
        fs.writeFileSync('data.json', JSON.stringify(data,null,4))
        console.log(`"${dataItem.task_content}" telah selesai`)
    }else if(args1 === 'uncomplete'){
        let indexComplete = parseInt(args2) - 1;
        let dataItem = data[indexComplete];
        let complete = data[indexComplete].status = false;
        fs.writeFileSync('data.json', JSON.stringify(data,null,4))
        console.log(`"${dataItem.task_content}" status selesai dibatalkan`)
    }else if(args1 === 'list:outstanding'){
        if(args2 == 'asc'){
            console.log("Daftar Pekerjaan")
            for (let i = 0; i < data.length; i++) {
                if(data[i].status === false){
                    console.log(`${i+1}.[ ] ${data[i].task_content}`)    
                }   
            }
        }else{
            console.log("Daftar Pekerjaan")
            for (let j = data.length -1 ; j >= 0; j--) {
                if(data[j].status === false){
                    console.log(`${j+1}.[ ] ${data[j].task_content}`)    
                }
            }
        }
    }else if(args1 === 'list:completed'){
        if(args2 == 'desc'){
            console.log("Daftar Pekerjaan")
            for (let i = 0; i < data.length; i++) {
                if(data[i].status === true){
                    console.log(`${i+0}.[X] ${data[i].task_content}`)    
                }
            }
        }else{
            console.log("Daftar Pekerjaan")
            for (let j = data.length -1 ; j >= 0; j--) {
                if(data[j].status === true){
                    console.log(`${j+0}.[X] ${data[j].task_content}`)    
                }
            }
        }
    }else if(args1 === 'tag'){
        let indexTags = parseInt(args2) - 1;
        let words = '';
        let tags = data[indexTags].tag;
        let tag = data[indexTags]
        for (let i = 4; i < args.length; i++) {
                tags.push(args[i]);
                console.log(args[i])
                words += args[i] + ' ';
        }   
        fs.writeFileSync('data.json', JSON.stringify(data, null, 4));
        console.log(`Tags '${words.trim()}' telah ditambahkan ke daftar ${tag.task_content}`)
    }else{
        const filter = args1.split(':');
        if (filter[0] === 'filter') {
            console.log("Daftar Pekerjaan")
            for (let i = 0; i < data.length; i++) {
                if (data[i].tag.includes(filter[1])) {
                    console.log(`${i+1}. [${data[i].status ? 'X' : ' '}] ${data[i].task_content}`)
                }               
            }
        }else{
            console.log(daftarList)
        }
    }
}