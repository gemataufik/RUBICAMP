import { line } from '../views/util.js';
import Table from 'cli-table3';


export function menuMatkul(){
    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Matkul
[2] Cari Matkul
[3] Tambah Matkul
[4] Hapus Matkul
[5] Kembali
    `)
    line()
}


export function tableMatkul(data){
    let table = new Table({
        head: ['KODE', 'Nama Matkul', 'SKS']
    });

    data.forEach((mata_kuliah) => {
        table.push(
            [mata_kuliah.id_matkul, mata_kuliah.nama_matkul, mata_kuliah.sks]
        );
    })
    console.log(table.toString());
}