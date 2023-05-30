import {db} from "./connect.js"

export default class Mahasiswa {


   static daftar(next){
        db.all('SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, jurusan.Nama_Jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan ORDER BY nim;  ', (err, rows) => {
            if (err) {
                return console.log('Ambil data mahasiswa gagal !')
            }

            next(rows)
        })
    }
    
    static cari (nim,next){
        db.all('SELECT * FROM mahasiswa WHERE nim = ?', (nim), (err, rows) => {

            if (err) 
                return console.log('Cari data mahasiswa gagal !')
                next (rows)
        })
    }


    static tambah (nim, Nama, tanggallahir, Alamat, id_jurusan,next){
        db.run('INSERT INTO mahasiswa (nim, nama, tanggallahir, alamat, id_jurusan) VALUES (?,?,?,?,?)',
        [nim, Nama, tanggallahir, Alamat, id_jurusan], 
        err => {
            if (err)
                return console.log('Tambah data mahasiswa gagal !')

            console.log('Mahasiswa telah ditambahkan')
            next()
        })
    }

    static hapus (nim,next) {

        db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], err => {
            if (err)
                return console.log('Hapus Data Mahasiswa gagal !')

            console.log(`Data Mahasiswa ini "${nim}" telah di HAPUS`)
            next()
         })        
    }
    
}