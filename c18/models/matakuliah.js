import {db} from "./connect.js"

export default class Matkul{
    
    static daftar (next){
        db.all('SELECT * FROM mata_kuliah;  ', (err, rows) => {
            if (err) {
                return console.log('Ambil data MATKUL gagal !')
            }
            next(rows)
        })
    }

    static cari (id_matkul,next){
        db.all('SELECT * FROM mata_kuliah WHERE id_matkul = ?', (id_matkul), (err, rows) => {
            if (err) 
                return console.log('Cari Kode MATKUL gagal !')
                next(rows)        
        })
    }


    static tambah (id_matkul, nama_matkul, sks, next){
        db.run('INSERT INTO mata_kuliah (id_matkul, nama_matkul, sks) VALUES (?,?,?)',
        [id_matkul, nama_matkul, sks], err => {
            if (err)
              return console.log('Tambah data MATKUL gagal !')

                console.log('MATKUL Baru Telah diambahkan Ke Data Base')
                next()
        })
    }

    static hapus (id_matkul,next){
        db.run("DELETE FROM mata_kuliah WHERE id_matkul = ?", [id_matkul], err => {
            if (err)
                return console.log('Hapus Data MATKUL gagal !')

                console.log(`Data MATKUL '${id_matkul}' telah di HAPUS`)
                
                next(next)
            })
        }
        
}