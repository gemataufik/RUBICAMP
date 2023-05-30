import {db} from "./connect.js"

export default class Dosen{

    static daftar(next){
        db.all('SELECT * FROM dosen;  ', (err, rows) => {
            if (err) {
                return console.log('Ambil data DOSEN gagal !')
            }

            next(rows)
        })
    }


    static cari(nip,next){
        db.all('SELECT * FROM dosen WHERE nip = ?', (nip), (err, rows) => {
           
            if (err) {
                return console.log('Cari NIP DOSEN gagal !')
            }

            next(rows)
        })
    }

    static tambah (nip, nama_dosen,next){

        db.run('INSERT INTO dosen (nip, nama_dosen) VALUES (?,?)',
        [nip, nama_dosen], err => {

        if (err)
            return console.log('Tambah data DOSEN gagal !')

            console.log('DOSEN Baru Telah diambahkan Ke Data Base')
            
            next()  
        })
    }

    static hapus(nip,next){

        db.run("DELETE FROM dosen WHERE nip = ?", [nip], err => {
            if (err)
                return console.log('Hapus Data DOSEN gagal !')

            console.log(`Data DOSEN '${nip}' telah di HAPUS`)
            
            next()
        })
    }

}
