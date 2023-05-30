import { rl,welcome, line } from '../views/util.js';
import User from '../models/user.js'
import MahasiswaController from './mahasiswa.js';
import { menuUtama } from '../views/user.js';
import JurusanController from './jurusan.js';
import DosenController from './dosen.js';
import MatkulController from './matakuliah.js';
import KontrakController from './kontrak.js';

export default class UserController {


    static start(){
        welcome()
        UserController.askUsername()
    }

    
    static askUsername(){
        rl.question('username: ', username => {
            User.username(username,(users)=>{
   
            if (users.length == 0) {
                console.log('username not found')
                UserController.askUsername()
            } else {
                UserController.askPassword(users[0])
            }

            })

        })
    }


    static askPassword(user) {
        rl.question('password : ', answer => {
            if (user.password === answer) {
                line()
                console.log(`Welcome ${user.username}. Your access level is : ${user.role}`)
                line()
                UserController.menuUtama()
            } else {
                console.log('password salah')
                UserController.askPassword(user)
            }
        })
    }

    static menuUtama() {
        menuUtama()
        rl.question('Masukkan salah satu no. dari opsi di atas : ', answer => {
            switch (answer) {
                case '1':
                    MahasiswaController.menuMahasiswa()
                    break;
    
                case '2':
                    JurusanController.menuJurusan()
                    break;
    
                case '3':
                    DosenController.menuDosen()
                    break;
    
                case '4':
                    MatkulController.menuMatkul()
                    break;
    
                case '5':
                    KontrakController.menuKontrak()
                    break;
    
                case '6':
                    process.exit(0)
                    break;
    
                default:
                    console.log('Anda salah memasukan pilihan !!!')
                    UserController.menuUtama()
                    break;
            }
        })
    }

}