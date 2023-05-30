import Matkul from '../models/matakuliah.js'
import UserController from "./user.js"
import { rl, line } from '../views/util.js';

import { menuMatkul, tableMatkul } from '../views/matakuliah.js';



export default class MatkulController{
    
    static menuMatkul(){

        menuMatkul()
        rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
            switch (answer) {
                case '1':
                    MatkulController.daftarMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;

                case '2':
                    MatkulController.cariMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;

                case '3':
                    MatkulController.tambahMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;

                case '4':
                    MatkulController.hapusMatkul(() => {
                        MatkulController.menuMatkul()
                    })
                    break;

                case '5':
                    UserController.menuUtama()
                    break;

                default:
                    console.log('Opsi yang dimasukkan salah !!!')
                    MatkulController.menuMatkul()
                    break;
           }
        })
    }

    static daftarMatkul(next) {

        Matkul.daftar((data)=>{
       
        tableMatkul(data)    
        next()

        })
    }

    static cariMatkul(next) {
        rl.question('Masukan Kode MATKUL :', (id_matkul) => {
            
                Matkul.cari(id_matkul,(data)=>{
                if (data.length == 0) {
                    console.log(`Mata Kuliah dengan Kode '${id_matkul}' tidak terdaftar`)
    
                    
                } else {

                    console.log(`
                    
Detail Mata Kuliah dengan Kode  '${id_matkul}' :
Kode Matkul         : ${data[0].id_matkul}
Nama Matkul         : ${data[0].nama_matkul}    
Jumlah SKS          : ${data[0].sks}
                `)
    
                }
    
                line()
                next()
    
            })
        })
    }

    static tambahMatkul(next) {
        console.log('Lengkapi data dibawah ini :')
        MatkulController.daftarMatkul(() => {
            rl.question('Kode Matkul : ', id_matkul => {
                rl.question('Nama Matkul : ', nama_matkul => {
                    rl.question('Jumlah SKS : ', sks => {
    
                        Matkul.tambah(id_matkul,nama_matkul,sks,()=>{
                        MatkulController.daftarMatkul(() => {
                                next()
                            })
    
                        })
                    })
                })
            })
        })
    }


    static hapusMatkul(next) {
        rl.question('Masukan Kode Matkul :', id_matkul => {
            Matkul.hapus(id_matkul,()=>{
            next()
    
                
    
            })
        })
    }
    
}