import {db} from "./connect.js"

export default class Jurusan {

    static daftar(next){
        db.all('SELECT * FROM jurusan;  ', (err, rows) => {
            if (err) {
                return console.log('Ambil data JURUSAN gagal !')
            }

            next(rows)
        })
    }

    static cari(id_jurusan, next){
        db.all('SELECT * FROM jurusan WHERE id_jurusan = ?', (id_jurusan), (err, rows) => {
            if (err) 
                return console.log('Cari Kode Jurusan gagal !')

                next(rows)
        })
    }

    static tambah (id_jurusan, Nama_Jurusan, next){
        db.run('INSERT INTO jurusan (id_jurusan, Nama_jurusan) VALUES (?,?)',
        [id_jurusan, Nama_Jurusan],
        err => {
            if (err)
                return console.log('Tambah data JURUSAN gagal !')

                console.log('JURUSAN Baru Telah diambahkan Ke Data Base')
               
                next()
         })
    }


    static hapus (id_jurusan,next){
    db.run("DELETE FROM jurusan WHERE id_jurusan = ?", [id_jurusan], err => {
        if (err)
            return console.log('Hapus Data JURUSAN gagal !')

            console.log(`Data JURUSAN '${id_jurusan}' telah di HAPUS`)
        
            next()

         })
    }

}