import { line } from '../views/util.js';
import Table from 'cli-table3';


export function menuDosen(){

    console.log(`
silahkan pilih opsi di bawah ini :
[1] Daftar Dosen
[2] Cari Dosen
[3] Tambah Dosen
[4] Hapus Dosen
[5] Kembali
    `)
    line()

}

export function tableDosen (data){
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