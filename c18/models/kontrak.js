import {db} from "./connect.js"


export default class Kontrak{
   
   
    static daftar (next){
        db.all('SELECT jadwal.num,jadwal.nim, mahasiswa.Nama, mata_kuliah.nama_matkul, dosen.nama_dosen, jadwal.nilai FROM jadwal INNER JOIN mahasiswa ON jadwal.nim = mahasiswa.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul INNER JOIN dosen ON jadwal.nip = dosen.nip;', (err, rows) => {

            if (err) {
                return console.log('Ambil Daftar Kontrak gagal !')
            }
            next(rows)
        })
    }

    static cari (nim, next){
        db.all('SELECT * FROM jadwal WHERE nim = ?', (nim), (err, rows) => {
            if (err) 
                return console.log('Cari daftar kontrak mahasiswa gagal !')
               
                next(rows)          
        })
    }


    static tambah (nim, id_matkul, nip,next){
        db.run('INSERT INTO jadwal (nim, id_matkul, nip) VALUES (?,?,?)',
        [nim, id_matkul, nip],
            err => {
                if (err)
                return console.log('Tambah KONTRAK gagal !')

                console.log('KONTRAK telah ditambahkan')
                
                next()
        })
    }

    static detailMahasiswa(next){
        db.all('SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, jurusan.Nama_Jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan; ', (err, rows) => {

            if (err) 
                return console.log('Ambil Daftar Kontrak gagal !')
                
                next(rows) 
        })
    }


    static detailMatkul(next){
        db.all('SELECT * FROM mata_kuliah; ', (err, rows) => {

            if (err) 
                return console.log('Ambil data MATKUL gagal !')

                next(rows)
       })
    }


    static detailDosen(next){
        db.all('SELECT * FROM dosen; ', (err, rows) => {

            if (err) 
                return console.log('Ambil data DOSEN gagal !')
                
                next(rows)
      })
    }


    static detailNilai(nim,next){
        db.all('SELECT jadwal.num, mata_kuliah.nama_matkul, jadwal.nilai FROM jadwal INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul WHERE jadwal.nim = ? ;',[nim],(err, rows) => {
       
            if (err) 
                return console.log('Ambil data gagal !')

                next(rows)           
        })
    }


    static hapus(num,next){
        db.run("DELETE FROM jadwal WHERE num = ?", [num], err => {
            if (err)
                return console.log('Hapus Data KONTRAK gagal !')
            
            console.log(`Data KONTRAK Dengan ID '${num}', telah di HAPUS`)
            
            next()
        })
    }

    static update(nilai, num,next){
        db.run('UPDATE jadwal SET nilai = ? WHERE num = ?', [nilai, num], err => {
            if (err)
                return console.log('Tambah KONTRAK gagal !')

            console.log('KONTRAK telah ditambahkan')
            
            next()
       })
    }
}
