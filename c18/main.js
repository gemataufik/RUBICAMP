import readline from  'readline';
import sqlite3 from 'sqlite3';
import Table from 'cli-table';

const db = new sqlite3.Database('c15.db');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function line() {
    console.log('===============================================')
}

function welcome() {
    line()
    console.log('Welcome to University Of Oxford');
    console.log('Manchester, Jl. Cikoneng No.449')
    line()
    username()
}

function username() {
    rl.question('username: ', answer => {
        db.all('SELECT * FROM user WHERE username = ?', [answer], (err, rows) => {
            if (err) throw err
            if (rows.length == 0) {
                console.log('username not found')
                username()
            } else {
                password(rows[0])
            }

        })
    })
}

function password(user) {
    rl.question('password : ', answer => {
        if (user.password === answer) {
            line()
            console.log(`welcom ${user.username}. Your access level is : ${user.role}`)
            line()
            menuUtama()
        } else {
            console.log('password salah')
            password(user)
        }
    })
}

function menuUtama() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
    `)
    line()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                menuMahasiswa()
                break;

            case '2':
                menuJurusan()
                break;

            case '3':
                menuKontrak()
                break;

            case '4':
                console.log('masuk mahasiswa')
                break;

            case '5':
                console.log('masuk mahasiswa')
                break;

            case '6':
                process.exit(0)
                break;

            default:
                break;
        }
    })
}

function menuMahasiswa(){
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Mahasiswa
[2] Cari Mahasiswa
[3] Tambah Mahasiwa
[4] Hapus Mahasiswa
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                daftarMahasiswa(()=>{
                    menuMahasiswa()
                })
                break;

            case '2':
                cariMahasiswa(()=>{
                    menuMahasiswa()
                })
                break;

            case '3':
                tambahMahasiswa(()=>{
                    menuMahasiswa()
                })
                break;

            case '4':
                hapusMahasiswa(()=>{
                    menuMahasiswa()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuMahasiswa()
                break;
        }
    })
}

function daftarMahasiswa (next){
 
    db.all('SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, jurusan.Nama_Jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan;  ', (err, rows)=>{
        if(err) {
            return console.log('Ambil data mahasiswa gagal !')
        }
        // console.log(rows)
        let table = new Table({
            head: ['Nim', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
        });

        rows.forEach((mahasiswa)=>{
            table.push(
                [mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan,  mahasiswa.Nama_Jurusan]
            );
        })
        console.log(table.toString());
        next()
    })
    
}

function cariMahasiswa(next){
rl.question('Masukan NIM Mahasiswa :', (nim)=>{
    db.all('SELECT * FROM mahasiswa WHERE nim = ?', (nim), (err, rows)=>{ 
        console.log(rows)
        if(err) {
            return console.log('Cari data mahasiswa gagal !')
        }

        if (rows.length == 0){
         console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`)
        
    }else{

        console.log(`
Detail mahasiswa dengan NIM '${nim}' :
NIM         : ${rows[0].nim}
Nama        : ${rows[0].Nama}    
Alamat      : ${rows[0].Alamat}
Jurusan     : ${rows[0].id_jurusan}
        `)
      
        }

        line()
        next()

    })
})
}


function tambahMahasiswa(next){
    console.log('Lengkapi data dibawah ini :')
    daftarMahasiswa(()=>{
        rl.question ('NIM : ', nim => {
            rl.question ('Nama : ', Nama => {
                rl.question ('Tanggal Lahir : ', tanggallahir => {
                    rl.question ('Alamat : ', Alamat =>{

                        daftarJurusan(() => {
                            rl.question('Kode Jurusan : ', id_jurusan => {
                                db.run('INSERT INTO mahasiswa (nim, nama, tanggallahir, alamat, id_jurusan) VALUES (?,?,?,?,?)',
                                [nim, Nama, tanggallahir, Alamat, id_jurusan],
                                err => {
                                    if(err) 
                                        return console.log('Tambah data mahasiswa gagal !')
                                        
                                        console.log('Mahasiswa telah ditambahkan')
                                        daftarMahasiswa(()=>{
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

function hapusMahasiswa (next){
rl.question('Masukan NIM Mahasiswa :', nim => {
    db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], err => {
        if(err) 
            return console.log('Hapus Data Mahasiswa gagal !')
        
        console.log(`Data Mahasiswa ini "${nim}" telah di HAPUS`)
        next()
        
    })
})
}

                    /////   BAGIAN MENU JURUSAN     /////


function menuJurusan(){
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Jurusan
[2] Cari Jurusan
[3] Tambah Jurusan
[4] Hapus Jurusan
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                daftarJurusan(()=>{
                    menuJurusan()
                })
                break;

            case '2':
                cariJurusan(()=>{
                    menuJurusan()
                })
                break;

            case '3':
                tambahJurusan(()=>{
                    menuJurusan()
                })
                break;

            case '4':
                hapusJurusan(()=>{
                    menuJurusan()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
               menuJurusan()
                break;
        }
    })
}



function daftarJurusan (next){
 
    db.all('SELECT * FROM jurusan;  ', (err, rows)=>{
        if(err) {
            return console.log('Ambil data JURUSAN gagal !')
        }
        
        let table = new Table({
            head: ['Kode Jurusan', 'Nama Jurusan']
        });

        rows.forEach((jurusan) => {
            table.push(
                [jurusan.id_jurusan, jurusan.Nama_Jurusan]
            );
        })
        console.log(table.toString());
        next()
    })
    
}

function cariJurusan(next){
    rl.question('Masukan Kode Jurusan :', (id_jurusan)=>{
        db.all('SELECT * FROM jurusan WHERE id_jurusan = ?', (id_jurusan), (err, rows)=>{
            if(err) {
                return console.log('Cari Kode Jurusan gagal !')
            }
    
            if (rows.length == 0){
             console.log(`Mahasiswa dengan Kode Jurusan ${id_jurusan} tidak terdaftar`)
            
        }else{
    
            console.log(`
    Detail mahasiswa dengan Kode Jurusan '${id_jurusan}' :
    Kode Jurusan        : ${rows[0].id_jurusan}
    Nama Jurusan        : ${rows[0].Nama_Jurusan}    
            `)
          
            }
    
            line()
            next()
    
        })
    })
    }

    function tambahJurusan(next){
        console.log('Lengkapi data dibawah ini :')
        daftarJurusan(()=>{
            rl.question ('Kode Jurusan : ', id_jurusan => {
                rl.question ('Nama Jurusan : ', Nama_Jurusan => {
                    db.run('INSERT INTO jurusan (id_jurusan, Nama_jurusan) VALUES (?,?)',
                        [id_jurusan, Nama_Jurusan],
                            err => {
                             if(err) 
                                return console.log('Tambah data JURUSAN gagal !')
                                            
                            console.log('JURUSAN Baru Telah diambahkan Ke Data Base')
                            daftarJurusan(()=>{
                            next()
                            })  
    
                        })
                                
                })
            })
        })
    }


function hapusJurusan (next){
rl.question('Masukan Kode Jurusan :', id_jurusan => {
    db.run("DELETE FROM jurusan WHERE id_jurusan = ?", [id_jurusan], err => {
        if(err) 
            return console.log('Hapus Data JURUSAN gagal !')
        
        console.log(`Data JURUSAN "${id_jurusan}" telah di HAPUS`)
        next()
        
    })
})
}



 /// //  /   /          LINE DOSEN         / / /   /// ///

             
             
function menuKontrak(){
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Kontrak
[2] Cari Kontrak
[3] Tambah Kontrak
[4] Hapus Kontrak
[5] Update Nilai
[6] Kembali
             `)


             line()
            rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
                switch (answer) {
                    case '1':
                        daftarKontrak(()=>{
                            menuKontrak()
                        })
                        break;
            
                    case '2':
                        cariKontrak(()=>{
                            menuKontrak()
                        })
                        break;
            
                    case '3':
                        tambahKontrak(()=>{
                            menuKontrak()
                        })
                        break;
            
                    case '4':
                        console.log('Hapus Kontrak')
                        break;

                    case '5':
                        console.log('Update Nilai')
                        break;
            
                    case '6':
                        menuUtama()
                        break;
            
                    default:
                        console.log('opsi yang dimasukkan salah')
                        menuJadwal()
                        break;
                     }
                  })
                }


 
 
 
 
 
function daftarKontrak (next){
 
    db.all('SELECT jadwal.num,jadwal.nim, mahasiswa.Nama, mata_kuliah.nama_matkul, dosen.nama_dosen, jadwal.nilai FROM jadwal INNER JOIN mahasiswa ON jadwal.nim = mahasiswa.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul INNER JOIN dosen ON jadwal.nip = dosen.nip;', (err, rows)=>{
        
        if(err) {
            return console.log('Ambil Daftar Kontrak gagal !')
        }
        
        let table = new Table({
            head: ['ID', 'Nim', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai' ]
        });

        rows.forEach((jadwal) => {
            table.push(
                [jadwal.num, jadwal.nim, jadwal.Nama, jadwal.nama_matkul, jadwal.nama_dosen, jadwal.nilai]
            );
        })
        console.log(table.toString());
        next()
    })
    
}

function cariKontrak(next){
    rl.question('Masukan NIM Mahasiswa : ',  (nim)=>{
        db.all('SELECT * FROM jadwal WHERE nim = ?', (nim), (err, rows)=>{
            if(err) {
                return console.log('Cari daftar kontrak mahasiswa gagal !')
            }
    
            if (rows.length == 0){
             console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`)
            
        }else{
           console.log( `Daftar Kontrak Mahasiswa Dengan NIM ${nim} adalah :`)

            let table = new Table({
                head: ['ID', 'Nim', 'Kode Matkul', 'Nip', 'Nilai']
            });
    
            rows.forEach((jadwal) => {
                table.push(
                    [jadwal.num, jadwal.nim, jadwal.id_matkul, jadwal.nip, jadwal.nilai]
                );
            })
            console.log(table.toString());
          
            }
    
            line()
            next()
    
        })
    })
    }


    function tambahKontrak(next){
        console.log('Lengkapi data dibawah ini :')
        daftarKontrak(()=>{
            rl.question ('Masukan NIM : ', nim => {
                rl.question ('Masukan Kode Mata Kuliah : ', id_matkul => {
                    rl.question ('Masukan Nip Dosen : ', nip => {
                        
                                    db.run('INSERT INTO mahasiswa (nim, id_matkul, nip) VALUES (?,?,?)',
                                    [nim, id_matkul,nip],
                                    err => {
                                        if(err) 
                                            return console.log('Tambah KONTRAK gagal !')
                                            
                                            console.log('KONTRAK telah ditambahkan')
                                            daftarKontrak(()=>{
                                                next()
                                            })  
    
                                    })
                                
                                
    
                           
    
           
                        
                    })
                })
            })
        })
    }

welcome()



/// PERTANYAAN 



