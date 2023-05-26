import readline from 'readline';
import sqlite3 from 'sqlite3';
import Table from 'cli-table3';

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
                menuDosen()
                break;

            case '4':
                menuMatkul()
                break;

            case '5':
                menuKontrak()
                break;

            case '6':
                process.exit(0)
                break;

            default:
                break;
        }
    })
}

function menuMahasiswa() {
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
                daftarMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '2':
                cariMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '3':
                tambahMahasiswa(() => {
                    menuMahasiswa()
                })
                break;

            case '4':
                hapusMahasiswa(() => {
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

function daftarMahasiswa(next) {

    db.all('SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, jurusan.Nama_Jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan;  ', (err, rows) => {
        if (err) {
            return console.log('Ambil data mahasiswa gagal !')
        }

        let table = new Table({
            head: ['Nim', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
        });

        rows.forEach((mahasiswa) => {
            table.push(
                [mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, mahasiswa.Nama_Jurusan]
            );
        })
        console.log(table.toString());
        next()
    })

}

function cariMahasiswa(next) {
    rl.question('Masukan NIM Mahasiswa :', (nim) => {
        db.all('SELECT * FROM mahasiswa WHERE nim = ?', (nim), (err, rows) => {
            console.log(rows)
            if (err) {
                return console.log('Cari data mahasiswa gagal !')
            }

            if (rows.length == 0) {
                console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`)

            } else {

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


function tambahMahasiswa(next) {
    console.log('Lengkapi data dibawah ini :')
    daftarMahasiswa(() => {
        rl.question('NIM : ', nim => {
            rl.question('Nama : ', Nama => {
                rl.question('Tanggal Lahir : ', tanggallahir => {
                    rl.question('Alamat : ', Alamat => {

                        daftarJurusan(() => {
                            rl.question('Kode Jurusan : ', id_jurusan => {
                                db.run('INSERT INTO mahasiswa (nim, nama, tanggallahir, alamat, id_jurusan) VALUES (?,?,?,?,?)',
                                    [nim, Nama, tanggallahir, Alamat, id_jurusan],
                                    err => {
                                        if (err)
                                            return console.log('Tambah data mahasiswa gagal !')

                                        console.log('Mahasiswa telah ditambahkan')
                                        daftarMahasiswa(() => {
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

function hapusMahasiswa(next) {
    rl.question('Masukan NIM Mahasiswa :', nim => {
        db.run("DELETE FROM mahasiswa WHERE nim = ?", [nim], err => {
            if (err)
                return console.log('Hapus Data Mahasiswa gagal !')

            console.log(`Data Mahasiswa ini "${nim}" telah di HAPUS`)
            next()

        })
    })
}

/////   BAGIAN MENU JURUSAN     /////


function menuJurusan() {
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
                daftarJurusan(() => {
                    menuJurusan()
                })
                break;

            case '2':
                cariJurusan(() => {
                    menuJurusan()
                })
                break;

            case '3':
                tambahJurusan(() => {
                    menuJurusan()
                })
                break;

            case '4':
                hapusJurusan(() => {
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



function daftarJurusan(next) {

    db.all('SELECT * FROM jurusan;  ', (err, rows) => {
        if (err) {
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

function cariJurusan(next) {
    rl.question('Masukan Kode Jurusan :', (id_jurusan) => {
        db.all('SELECT * FROM jurusan WHERE id_jurusan = ?', (id_jurusan), (err, rows) => {
            if (err) {
                return console.log('Cari Kode Jurusan gagal !')
            }

            if (rows.length == 0) {
                console.log(`Mahasiswa dengan Kode Jurusan ${id_jurusan} tidak terdaftar`)

            } else {

                console.log(`
    Detail Jurusan Dengan Kode '${id_jurusan}' :
    Kode Jurusan        : ${rows[0].id_jurusan}
    Nama Jurusan        : ${rows[0].Nama_Jurusan}    
            `)

            }

            line()
            next()

        })
    })
}

function tambahJurusan(next) {
    console.log('Lengkapi data dibawah ini :')
    daftarJurusan(() => {
        rl.question('Kode Jurusan : ', id_jurusan => {
            rl.question('Nama Jurusan : ', Nama_Jurusan => {
                db.run('INSERT INTO jurusan (id_jurusan, Nama_jurusan) VALUES (?,?)',
                    [id_jurusan, Nama_Jurusan],
                    err => {
                        if (err)
                            return console.log('Tambah data JURUSAN gagal !')

                        console.log('JURUSAN Baru Telah diambahkan Ke Data Base')
                        daftarJurusan(() => {
                            next()
                        })

                    })

            })
        })
    })
}


function hapusJurusan(next) {
    rl.question('Masukan Kode Jurusan :', id_jurusan => {
        db.run("DELETE FROM jurusan WHERE id_jurusan = ?", [id_jurusan], err => {
            if (err)
                return console.log('Hapus Data JURUSAN gagal !')

            console.log(`Data JURUSAN "${id_jurusan}" telah di HAPUS`)
            next()

        })
    })
}



/// //  /   /          LINE DOSEN         / / /   /// ///


function menuDosen() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                daftarDosen(() => {
                    menuDosen()
                })
                break;

            case '2':
                cariDosen(() => {
                    menuDosen()
                })
                break;

            case '3':
                tambahDosen(() => {
                    menuDosen()
                })
                break;

            case '4':
                hapusDosen(() => {
                    menuDosen()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuDosen()
                break;
        }
    })
}

function daftarDosen(next) {

    db.all('SELECT * FROM dosen;  ', (err, rows) => {
        if (err) {
            return console.log('Ambil data DOSEN gagal !')
        }

        let table = new Table({
            head: ['NIP', 'Nama Dosen']
        });

        rows.forEach((dosen) => {
            table.push(
                [dosen.nip, dosen.nama_dosen]
            );
        })
        console.log(table.toString());
        next()
    })

}


function cariDosen(next) {
    rl.question('Masukan NIP Dosen :', (nip) => {
        db.all('SELECT * FROM dosen WHERE nip = ?', (nip), (err, rows) => {
            if (err) {
                return console.log('Cari NIP DOSEN gagal !')
            }

            if (rows.length == 0) {
                console.log(`Dosen dengan Kode Nip ${nip} tidak terdaftar`)

            } else {


                console.log(`
                
Detail Dosem dengan Kode NIP '${nip}' :
Nip Dosen         : ${rows[0].nip}
Nama Dosen        : ${rows[0].nama_dosen}    
            `)

            }

            line()
            next()

        })
    })
}




function tambahDosen(next) {
    console.log('Lengkapi data dibawah ini :')
    daftarDosen(() => {
        rl.question('Nip Dosen : ', nip => {
            rl.question('Nama Dosen : ', nama_dosen => {
                db.run('INSERT INTO dosen (nip, nama_dosen) VALUES (?,?)',
                    [nip, nama_dosen],
                    err => {
                        if (err)
                            return console.log('Tambah data DOSEN gagal !')

                        console.log('DOSEN Baru Telah diambahkan Ke Data Base')
                        daftarDosen(() => {
                            next()
                        })

                    })

            })
        })
    })
}


function hapusDosen(next) {
    rl.question('Masukan NIP Dosen :', nip => {
        db.run("DELETE FROM dosen WHERE nip = ?", [nip], err => {
            if (err)
                return console.log('Hapus Data DOSEN gagal !')

            console.log(`Data DOSEN "${nip}" telah di HAPUS`)
            next()

        })
    })
}




//  //  //  //  //  //  //          LINE MATA KULIAH    //  //  //  //  // //

function menuMatkul() {
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Matkul
[2] Cari Matkul
[3] Tambah Matkul
[4] Hapus Matkul
[5] Kembali
    `)
    line()
    rl.question('masukkan salah satu no. dari opsi di atas : ', answer => {
        switch (answer) {
            case '1':
                daftarMatkul(() => {
                    menuMatkul()
                })
                break;

            case '2':
                cariMatkul(() => {
                    menuMatkul()
                })
                break;

            case '3':
                tambahMatkul(() => {
                    menuMatkul()
                })
                break;

            case '4':
                hapusMatkul(() => {
                    menuMatkul()
                })
                break;

            case '5':
                menuUtama()
                break;

            default:
                console.log('opsi yang dimasukkan salah')
                menuMatkul()
                break;
        }
    })
}


function daftarMatkul(next) {

    db.all('SELECT * FROM mata_kuliah;  ', (err, rows) => {
        if (err) {
            return console.log('Ambil data MATKUL gagal !')
        }

        let table = new Table({
            head: ['KODE', 'Nama Matkul', 'SKS']
        });

        rows.forEach((mata_kuliah) => {
            table.push(
                [mata_kuliah.id_matkul, mata_kuliah.nama_matkul, mata_kuliah.sks]
            );
        })
        console.log(table.toString());
        next()
    })

}



function cariMatkul(next) {
    rl.question('Masukan Kode MATKUL :', (id_matkul) => {
        db.all('SELECT * FROM mata_kuliah WHERE id_matkul = ?', (id_matkul), (err, rows) => {
            if (err) {
                return console.log('Cari Kode MATKUL gagal !')
            }

            if (rows.length == 0) {
                console.log(`Mata Kuliah dengan Kode ${id_matkul} tidak terdaftar`)

            } else {


                console.log(`
                
Detail Mata Kuliah dengan Kode  '${id_matkul}' :
Kode Matkul         : ${rows[0].id_matkul}
Nama Matkul         : ${rows[0].nama_matkul}    
Jumlah SKS          : ${rows[0].sks}
            `)

            }

            line()
            next()

        })
    })
}


function tambahMatkul(next) {
    console.log('Lengkapi data dibawah ini :')
    daftarMatkul(() => {
        rl.question('Kode Matkul : ', id_matkul => {
            rl.question('Nama Matkul : ', nama_matkul => {
                rl.question('Jumlah SKS : ', sks => {

                db.run('INSERT INTO mata_kuliah (id_matkul, nama_matkul, sks) VALUES (?,?,?)',
                    [id_matkul, nama_matkul, sks],
                    err => {
                        if (err)
                            return console.log('Tambah data MATKUL gagal !')

                        console.log('MATKUL Baru Telah diambahkan Ke Data Base')
                        daftarMatkul(() => {
                            next()
                        })

                    })
                })
            })
        })
    })
}

function hapusMatkul(next) {
    rl.question('Masukan Kode Matkul :', id_matkul => {
        
        db.run("DELETE FROM mata_kuliah WHERE id_matkul = ?", [id_matkul], err => {
            if (err)
                return console.log('Hapus Data MATKUL gagal !')

            console.log(`Data MATKUL "${id_matkul}" telah di HAPUS`)
            next()

        })
    })
}







///////                      LINE MENU KONTRAK            /////////


function menuKontrak() {
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
                daftarKontrak(() => {
                    menuKontrak()
                })
                break;

            case '2':
                cariKontrak(() => {
                    menuKontrak()
                })
                break;

            case '3':
                tambahKontrak(() => {
                    menuKontrak()
                })
                break;

            case '4':
                hapusKontrak(() => {
                    menuKontrak()
                })
                break;

            case '5':
                updateNilai(() => {
                    menuKontrak()
                })
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







function daftarKontrak(next) {

    db.all('SELECT jadwal.num,jadwal.nim, mahasiswa.Nama, mata_kuliah.nama_matkul, dosen.nama_dosen, jadwal.nilai FROM jadwal INNER JOIN mahasiswa ON jadwal.nim = mahasiswa.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul INNER JOIN dosen ON jadwal.nip = dosen.nip;', (err, rows) => {

        if (err) {
            return console.log('Ambil Daftar Kontrak gagal !')
        }

        let table = new Table({
            head: ['ID', 'Nim', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
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

function cariKontrak(next) {
    rl.question('Masukan NIM Mahasiswa : ', (nim) => {
        db.all('SELECT * FROM jadwal WHERE nim = ?', (nim), (err, rows) => {
            if (err) {
                return console.log('Cari daftar kontrak mahasiswa gagal !')
            }

            if (rows.length == 0) {
                console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`)

            } else {
                console.log(`Daftar Kontrak Mahasiswa Dengan NIM ${nim} adalah :`)

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


function tambahKontrak(next) {
    console.log('Lengkapi data dibawah ini :')
    detailMahasiswa(() => {
        rl.question('NIM : ', nim => {
            detailMatkul(() => {
                rl.question('Masukan Kode Mata Kuliah : ', id_matkul => {
                    detailDosen(() => {
                        rl.question('Masukan Nip Dosen : ', nip => {

                            db.run('INSERT INTO jadwal (nim, id_matkul, nip) VALUES (?,?,?)',
                                [nim, id_matkul, nip],
                                err => {
                                    if (err)
                                        return console.log('Tambah KONTRAK gagal !')

                                    console.log('KONTRAK telah ditambahkan')

                                    detailMahasiswa(() => {
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



function detailMahasiswa(next) {

    db.all('SELECT mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, jurusan.Nama_Jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan; ', (err, rows) => {

        if (err) {
            return console.log('Ambil Daftar Kontrak gagal !')
        }

        let table = new Table({
            head: ['Nim', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
        });

        rows.forEach((mahasiswa) => {
            table.push(
                [mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, mahasiswa.Nama_Jurusan]
            );
        })
        console.log(table.toString());
        next()
    })

}

function detailMatkul(next) {

    db.all('SELECT * FROM mata_kuliah; ', (err, rows) => {

        if (err) {
            return console.log('Ambil data MATKUL gagal !')
        }

        let table = new Table({
            head: ['Kode Matkul', 'Nama Matkul']
        });

        rows.forEach((mata_kuliah) => {
            table.push(
                [mata_kuliah.id_matkul, mata_kuliah.nama_matkul]
            );
        })
        console.log(table.toString());
        next()
    })

}


function detailDosen(next) {

    db.all('SELECT * FROM dosen; ', (err, rows) => {

        if (err) {
            return console.log('Ambil data DOSEN gagal !')
        }

        let table = new Table({
            head: ['NIP', 'Nama Dosen']
        });

        rows.forEach((dosen) => {
            table.push(
                [dosen.nip, dosen.nama_dosen]
            );
        })
        console.log(table.toString());
        next()
    })

}


function hapusKontrak(next) {
    rl.question('Masukan ID Kontrak :', num => {
        db.run("DELETE FROM jadwal WHERE num = ?", [num], err => {
            if (err)
                return console.log('Hapus Data KONTRAK gagal !')

            console.log(`Data KONTRAK Dengan ID ${num}, telah di HAPUS`)
            next()

        })
    })
}


function detailNilai(next) {

    db.all('SELECT jadwal.num, mata_kuliah.nama_matkul, jadwal.nilai FROM jadwal INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul; ', (err, rows) => {

        if (err) {
            return console.log('Ambil data gagal !')
        }

        let table = new Table({
            head: ['ID', 'Mata Kuliah', 'Nilai']
        });

        rows.forEach((jadwal) => {
            table.push(
                [jadwal.num, jadwal.nama_matkul, jadwal.nilai]
            );
        })
        console.log(table.toString());
        next()
    })

}

function updateNilai(next) {
    daftarKontrak(() => {
        rl.question('Masukan Nim Mahasiswa : ', nim => {
            line()

            console.log(`Detail Mahaiswa Dengan NIM '${nim}' :`)
            detailNilai(() => {

                rl.question('Masukan Kode Mata Kuliah : ', id_matkul => {
                    detailDosen(() => {
                        rl.question('Masukan Nip Dosen : ', nip => {

                            db.run('INSERT INTO jadwal (nim, id_matkul, nip) VALUES (?,?,?)',
                                [nim, id_matkul, nip],
                                err => {
                                    if (err)
                                        return console.log('Tambah KONTRAK gagal !')

                                    console.log('KONTRAK telah ditambahkan')

                                    detailMahasiswa(() => {
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

welcome()





