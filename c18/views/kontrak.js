import { line } from '../views/util.js';
import Table from 'cli-table3';


export function menuKontrak(){
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
}

export function tableKontrak(data){
    let table = new Table({
        head: ['ID', 'Nim', 'Nama', 'Mata Kuliah', 'Dosen', 'Nilai']
    });

    data.forEach((jadwal) => {
        table.push(
            [jadwal.num, jadwal.nim, jadwal.Nama, jadwal.nama_matkul, jadwal.nama_dosen, jadwal.nilai]
        );
    })
    console.log(table.toString());
   
}

export function tableCari(data){
    let table = new Table({
        head: ['ID', 'Nim', 'Kode Matkul', 'Nip', 'Nilai']
    });

    data.forEach((jadwal) => {
        table.push(
            [jadwal.num, jadwal.nim, jadwal.id_matkul, jadwal.nip, jadwal.nilai]
        );
    })
    console.log(table.toString());
}


export function tableDetailMahasiswa(data){
    let table = new Table({
        head: ['Nim', 'Nama', 'Tanggal Lahir', 'Alamat', 'Kode Jurusan', 'Nama Jurusan']
    });

    data.forEach((mahasiswa) => {
        table.push(
            [mahasiswa.nim, mahasiswa.Nama, mahasiswa.tanggallahir, mahasiswa.Alamat, mahasiswa.id_jurusan, mahasiswa.Nama_Jurusan]
        );
    })
    console.log(table.toString());
}


export function tableDetailMatkul(data){
    let table = new Table({
        head: ['Kode Matkul', 'Nama Matkul']
    });

    data.forEach((mata_kuliah) => {
        table.push(
            [mata_kuliah.id_matkul, mata_kuliah.nama_matkul]
        );
    })
    console.log(table.toString());
}


export function tableDetailDosen(data){
    let table = new Table({
        head: ['NIP', 'Nama Dosen']
    });

    data.forEach((dosen) => {
        table.push(
            [dosen.nip, dosen.nama_dosen]
        );
    })
    console.log(table.toString());
}


export function tableDetailNilai(data){
    let table = new Table({
        head: ['ID', 'Mata Kuliah', 'Nilai']
    });

    data.forEach((jadwal) => {
        table.push(
            [jadwal.num, jadwal.nama_matkul, jadwal.nilai]
        );
    })
    console.log(table.toString());
}