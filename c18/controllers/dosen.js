import Dosen from '../models/dosen.js'
import UserController from "./user.js"
import { rl, line } from '../views/util.js';
import { menuDosen,tableDosen } from '../views/dosen.js';




export default class DosenController {


    static menuDosen() {

    menuDosen()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                DosenController.daftarDosen(() => {
                    DosenController.menuDosen()
                })
                break;

            case '2':
                DosenController.cariDosen(() => {
                    DosenController.menuDosen()
                })
                break;

            case '3':
                DosenController.tambahDosen(() => {
                    DosenController.menuDosen()
                })
                break;

            case '4':
                DosenController.hapusDosen(() => {
                    DosenController.menuDosen()
                })
                break;

            case '5':
                UserController.menuUtama()
                break;

            default:
                console.log('Opsi yang dimasukkan salah !!!')
                DosenController.menuDosen()
                break;
            }
        })
    }


    static daftarDosen(next) {

        Dosen.daftar((data)=>{

        tableDosen(data)
        next()
        })

    }


    static cariDosen(next) {
        rl.question('Masukan NIP Dosen :', (nip) => {
            
                Dosen.cari(nip,(data) =>{

                if (data.length == 0) {
                    console.log(`Dosen dengan Kode Nip '${nip}' tidak terdaftar`)
    
                } else {
       
                console.log(`
                    
Detail Dosem dengan Kode NIP '${nip}' :
Nip Dosen         : ${data[0].nip}
Nama Dosen        : ${data[0].nama_dosen}    
                `)
    
                }
    
                line()
                next()
    
              })
         })
    }

    static tambahDosen(next) {
        console.log('Lengkapi data dibawah ini :')
        DosenController.daftarDosen(() => {
            rl.question('Nip Dosen : ', nip => {
                rl.question('Nama Dosen : ', nama_dosen => {

                    Dosen.tambah(nip,nama_dosen, ()=>{     

                        DosenController.daftarDosen(() => {
                        next()
                           
    
                        })
                    })
                })
            })
        })
    }
    

    static hapusDosen(next) {
        rl.question('Masukan NIP Dosen :', nip => {
            Dosen.hapus(nip, ()=>{
            next()
            
            })
        })
    }

}