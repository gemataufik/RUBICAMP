import Mahasiswa from '../models/mahasiswa.js'
import UserController from "./user.js"
import { rl, line } from '../views/util.js';
import JurusanController from './jurusan.js';
import { menuMahasiswa,tableMahasiswa } from '../views/mahasiswa.js';


export default class MahasiswaController {

    static menuMahasiswa() {
        
        menuMahasiswa()
        rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
            switch (answer) {
                case '1':
                    MahasiswaController.daftarMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;
    
                case '2':
                    MahasiswaController.cariMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;
    
                case '3':
                    MahasiswaController.tambahMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;
    
                case '4':
                    MahasiswaController.hapusMahasiswa(() => {
                        MahasiswaController.menuMahasiswa()
                    })
                    break;
    
                case '5':
                   UserController.menuUtama()
                    break;
    
                default:
                    console.log('Opsi yang dimasukkan salah !!!')
                   MahasiswaController.menuMahasiswa()
                    break;
            }
        })
    }
    
    static daftarMahasiswa(next) {
    
            Mahasiswa.daftar((data)=>{
    
           tableMahasiswa(data)
            next()
        })
    
    }
    
    static cariMahasiswa(next) {
        rl.question('Masukan NIM Mahasiswa :', (nim) => {
            
                
                Mahasiswa.cari(nim,(data)=>{
                
    
                if (data.length == 0) {
                    console.log(`Mahasiswa dengan NIM "${nim}" tidak terdaftar`)
    
                } else {
    
                    console.log(`
Detail mahasiswa dengan NIM '${nim}' :
NIM         : ${data[0].nim}
Nama        : ${data[0].Nama}    
Alamat      : ${data[0].Alamat}
Jurusan     : ${data[0].id_jurusan}
            `)
    
                }
    
                line()
                next()
    
            })
        })
    }
    
    
    static tambahMahasiswa(next) {
        console.log('Lengkapi data dibawah ini :')
        MahasiswaController.daftarMahasiswa(() => {
            rl.question('NIM : ', nim => {
                rl.question('Nama : ', Nama => {
                    rl.question('Tanggal Lahir : ', tanggallahir => {
                        rl.question('Alamat : ', Alamat => {
    
                            JurusanController.daftarJurusan(() => {
                                rl.question('Kode Jurusan : ', id_jurusan => {
                                    
                                   Mahasiswa.tambah(nim, Nama, tanggallahir, Alamat, id_jurusan,()=>{
                                            
                                        MahasiswaController.daftarMahasiswa(() => {
                                                next()
                                            })
    
                                        })
                                })
    
    
                            })
    
    
                        })
                    })
                })
            })
        })
    }
    
    static hapusMahasiswa(next) {
        rl.question('Masukan NIM Mahasiswa :', nim => {
            Mahasiswa.hapus(nim, ()=>{
             next()
    
            })
        })
    }

}