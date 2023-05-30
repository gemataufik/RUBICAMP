
import Jurusan from "../models/jurusan.js";
import UserController from "./user.js"
import { rl, line } from '../views/util.js';
import { menuJurusan,tableJurusan } from '../views/jurusan.js';



export default class JurusanController{


    static menuJurusan() {
      
        menuJurusan()
        rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
            switch (answer) {
                case '1':
                    JurusanController.daftarJurusan(() => {
                       JurusanController.menuJurusan()
                    })
                    break;
    
                case '2':
                    JurusanController.cariJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;
    
                case '3':
                    JurusanController.tambahJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;
    
                case '4':
                    JurusanController.hapusJurusan(() => {
                        JurusanController.menuJurusan()
                    })
                    break;
    
                case '5':
                    UserController.menuUtama()
                    break;
    
                default:
                    console.log('Opsi yang dimasukkan salah !!!')
                    JurusanController.menuJurusan()
                    break;
            }
        })
    }

static daftarJurusan(next) {

        Jurusan.daftar((data)=>{

            tableJurusan(data)
        
            next()
        })

    }

    static cariJurusan(next) {
        rl.question('Masukan Kode Jurusan :', (id_jurusan) => {
            
                Jurusan.cari(id_jurusan,(data)=>{

                if (data.length == 0) {
                    console.log(`Mahasiswa dengan Kode Jurusan '${id_jurusan}' tidak terdaftar`)
    
                } else {
    
                    console.log(`
Detail Jurusan Dengan Kode '${id_jurusan}' :
Kode Jurusan        : ${data[0].id_jurusan}
Nama Jurusan        : ${data[0].Nama_Jurusan}    
                `)
    
                }
    
                line()
                next()
    
            })
        })
    }

    static tambahJurusan(next) {
        console.log('Lengkapi data dibawah ini :')
        JurusanController.daftarJurusan(() => {
            rl.question('Kode Jurusan : ', id_jurusan => {
                rl.question('Nama Jurusan : ', Nama_Jurusan => {
                    
                        Jurusan.tambah(id_jurusan,Nama_Jurusan,() =>{
                            
                            JurusanController.daftarJurusan(() => {
                                next()
                            })
                            
    
                        })
                    })
                })
            })
        }


  static hapusJurusan(next) {
     rl.question('Masukan Kode Jurusan :', id_jurusan => {
        Jurusan.hapus(id_jurusan, ()=>{
            next()
            
            })  
        })
    }
}