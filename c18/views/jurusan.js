import { line } from '../views/util.js';
import Table from 'cli-table3';


export function menuJurusan(){
    console.log(`
    Silahkan pilih opsi di bawah ini :
    [1] Daftar Jurusan
    [2] Cari Jurusan
    [3] Tambah Jurusan
    [4] Hapus Jurusan
    [5] Kembali
        `)
    line()
}


export function tableJurusan(data){
    let table = new Table({
        head: ['Kode Jurusan', 'Nama Jurusan']
    });

    data.forEach((jurusan) => {
        table.push(
            [jurusan.id_jurusan, jurusan.Nama_Jurusan]
        );
    })
    console.log(table.toString());

}