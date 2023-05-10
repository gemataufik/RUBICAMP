

CREATE TABLE jurusan (
id_jurusan CHARACTER(3) PRIMARY KEY NOT NULL,
Nama_Jurusan VARCHAR(100) NOT NULL
);

INSERT INTO jurusan VALUES
("P01","Teknik Pangan");

CREATE TABLE mahasiswa (
nim CHARACTER(8) PRIMARY KEY NOT NULL,
Nama VARCHAR(100) NOT NULL,
Alamat text NOT NULL,
id_jurusan CHARACTER(3) NOT NULL,
FOREIGN KEY (id_jurusan) REFERENCES jurusan (id_jurusan)
);

INSERT INTO mahasiswa VALUES
("41815172", "Riqki", "JL. Priok Baru", "P01");

CREATE TABLE jadwal (
num INTEGER PRIMARY KEY AUTOINCREMENT,
nim CHARACTER(8) NOT NULL,
nip CHARACTER(3) NOT NULL,
id_matkul CHARACTER(3) NOT NULL,
FOREIGN KEY (nim) REFERENCES mahasiswa (nim),
FOREIGN KEY (id_matkul) REFERENCES mata_kuliah (id_matkul),
FOREIGN KEY (nip) REFERENCES dosen (nip)
);

INSERT INTO jadwal(num,nim,nip,id_matkul)VALUES(1, "41815172", "001", "X01");

CREATE TABLE mata_kuliah (
    id_matkul CHARACTER(3) PRIMARY KEY NOT NULL,
    nama_matkul VARCHAR(100) NOT NULL,
    sks INTEGER NOT NULL,
    nip CHARACTER(3) NOT NULL,
    FOREIGN KEY (nip) REFERENCES dosen (nip)
);

INSERT INTO mata_kuliah VALUES
("X01", "Pengantar IP", 3, "001");

CREATE TABLE dosen (
    nip CHARACTER(3) PRIMARY KEY NOT NULL,
    nama VARCHAR(100) NOT NULL,
    id_matkul CHARACTER(3) NOT NULL,
    FOREIGN KEY (id_matkul) REFERENCES mata_kuliah(id_matkul)
);

INSERT INTO dosen VALUES
("001", "Rubi Henjaya", "X01");

