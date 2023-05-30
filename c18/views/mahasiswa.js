import { line } from '../views/util.js';
import Table from 'cli-table3';


export function menuMahasiswa(){
    console.log(`
    Silahkan pilih opsi di bawah ini :
    [1] Daftar Mahasiswa
    [2] Cari Mahasiswa
    [3] Tambah Mahasiwa
    [4] Hapus Mahasiswa
    [5] Kembali
        `)
    line()
}

export function tableMahasiswa(data){
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