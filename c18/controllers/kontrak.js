import Kontrak from '../models/kontrak.js'
import UserController from "./user.js"
import { rl, line } from '../views/util.js';
import { menuKontrak, tableCari, tableDetailMahasiswa, tableKontrak,tableDetailMatkul, tableDetailDosen, tableDetailNilai} from '../views/kontrak.js';



export default class KontrakController { 

static menuKontrak() {

    menuKontrak()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                KontrakController.daftarKontrak(() => {
                    KontrakController.menuKontrak()
                })
                break;

            case '2':
                KontrakController.cariKontrak(() => {
                    KontrakController.menuKontrak()
                })
                break;

            case '3':
                KontrakController.tambahKontrak(() => {
                    KontrakController.menuKontrak()
                })
                break;

            case '4':
                KontrakController.hapusKontrak(() => {
                    KontrakController.menuKontrak()
                })
                break;

            case '5':
                KontrakController.updateNilai(() => {
                    KontrakController.menuKontrak()
                })
                break;

            case '6':
                UserController.menuUtama()
                break;

            default:
                console.log('Opsi yang dimasukkan salah !!!')
                KontrakController.menuKontrak()
                break;

            }
        })
    }


    static daftarKontrak(next) {

        Kontrak.daftar((data)=>{
        tableKontrak(data)
        next()

        })
    }

    static cariKontrak(next) {
        rl.question('Masukan NIM Mahasiswa : ', (nim) => {
            
                Kontrak.cari(nim,(data)=>{

                if (data.length == 0) {
                    console.log(`Mahasiswa dengan NIM '${nim}' tidak terdaftar`)
    
                } else {
                    console.log(`Daftar Kontrak Mahasiswa Dengan NIM '${nim}' adalah :`)
    
                    tableCari(data)
                }
                
                line()
                next()
    
            })
        })
    }



    static tambahKontrak(next) {
        console.log('Lengkapi data dibawah ini :')
        KontrakController.detailMahasiswa(() => {
            rl.question('Masukan NIM : ', nim => {
                KontrakController.detailMatkul(() => {
                    rl.question('Masukan Kode Mata Kuliah : ', id_matkul => {
                        KontrakController.detailDosen(() => {
                            rl.question('Masukan Nip Dosen : ', nip => {
    
                                        Kontrak.tambah(nim, id_matkul, nip,()=>{
                                            KontrakController.detailMahasiswa(() => {
                                            next()
                                        })
                                    })
                            })
                        })
                    })
                })
            })
        })
    }


    static detailMahasiswa(next) {

        Kontrak.detailMahasiswa((data)=>{
            tableDetailMahasiswa(data)
           
            next()    
        })
    }


    static detailMatkul(next) {

        Kontrak.detailMatkul((data)=>{
            tableDetailMatkul(data)

            next()
        })
    }


    static detailDosen(next) {

        Kontrak.detailDosen((data)=>{
            tableDetailDosen(data)
    
            next()
        })
    }


    static detailNilai(nim,next) {

            Kontrak.detailNilai(nim,(data)=>{  /// catatan nim
                tableDetailNilai(data)
    
            next()
        })
    }

    static hapusKontrak(next) {
        rl.question('Masukan ID Kontrak :', num => {
            Kontrak.hapus(num, ()=>{
            
            next()
            })
        })
    }


    static updateNilai(next) {
       KontrakController.daftarKontrak(() => {
            rl.question('Masukan Nim Mahasiswa : ', nim => {
                line()
                console.log(`Detail Mahaiswa Dengan NIM '${nim}' :`)
                KontrakController.detailNilai(nim,() => {
                    line()
                    rl.question('Masukan id yang ingin dirubah nilainya : ', num => {
                        line()
                            rl.question('Tulis nilai yang baru : ', nilai => {
                                line()
    
                                        Kontrak.update(nilai, num,()=>{
                                            KontrakController.daftarKontrak(() => {
                                            line()
                                            next()
                                })   
                            })
                        })                      
                    })
    
                })
    
            })
        })
    }


}