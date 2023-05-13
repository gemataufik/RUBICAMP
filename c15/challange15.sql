CREATE TABLE jurusan (
id_jurusan CHARACTER(3) PRIMARY KEY NOT NULL,
Nama_Jurusan VARCHAR(100) NOT NULL
);

INSERT INTO jurusan VALUES
("P01","Teknik Pangan"),
("P02","Sistem Informasi"),
("P03","Ilmu Komunikasi"),
("P04","Sastra"),
("P05","DKV");

CREATE TABLE mahasiswa (
nim CHARACTER(8) PRIMARY KEY NOT NULL,
Nama VARCHAR(100) NOT NULL,
Alamat text NOT NULL,
id_jurusan CHARACTER(3) NOT NULL,
FOREIGN KEY (id_jurusan) REFERENCES jurusan (id_jurusan)
);

INSERT INTO mahasiswa VALUES
("41815172", "Riqki", "JL. Priok Baru", "P01"),
("41815180", "Fahmi", "JL. Raya Cibiru No.29", "P03"),
("41815190", "Yudi", "JL. Sitohang", "P04"),
("41815223", "Marsinah", "JL. Merdeka", "P05"),
("41815333", "Budi", "JL. Jendral Sudirman", "P05"),
("41815100", "Rocky", "Jl. Tanpa Nama", "P02");

ALTER TABLE mahasiswa ADD COLUMN umur INTEGER;

UPDATE mahasiswa SET umur = 23 WHERE nim = 41815172;
UPDATE mahasiswa SET umur = 28 WHERE nim = 41815180;
UPDATE mahasiswa SET umur = 19 WHERE nim = 41815190;
UPDATE mahasiswa SET umur = 17 WHERE nim = 41815223;
UPDATE mahasiswa SET umur = 29 WHERE nim = 41815333;
UPDATE mahasiswa SET umur = 18 WHERE nim = 41815100;

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

ALTER TABLE jadwal ADD COLUMN nilai CHARACTER (1);

INSERT INTO jadwal(nim,nip,id_matkul,nilai)VALUES
("41815180", "001", "X01", "B"),
("41815190", "002", "X03", "A"),
("41815223", "005", "X05", "A"),
("41815333", "005", "X05", "C"),
("41815100","004", "X03", "D");

INSERT INTO jadwal (nim,nip,id_matkul,nilai)VALUES
("41815223", "003", "X03", "B"),
("41815223", "001", "X01", "A"),
("41815100","002", "X02", "B"),
("41815100","005", "X05", "C");

UPDATE jadwal SET nilai = "E" WHERE num = 1;  

CREATE TABLE mata_kuliah (
    id_matkul CHARACTER(3) PRIMARY KEY NOT NULL,
    nama_matkul VARCHAR(100) NOT NULL,
    sks INTEGER NOT NULL
);

INSERT INTO mata_kuliah VALUES
("X01", "Pengantar IP", 3),
("X02", "Basic SQL", 2),
("X03", "Data Maining", 4),
("X04", "Bhs Inggris", 3),
("X05", "Ilmu Sosial", 5);

CREATE TABLE dosen (
    nip CHARACTER(3) PRIMARY KEY NOT NULL,
    nama_dosen VARCHAR(100) NOT NULL
);

INSERT INTO dosen VALUES
("001", "Rubi Henjaya"),
("002", "Tan Malaka"),
("003", "Siti Djenar"),
("004", "Munir"),
("005", "Wiji Tukul");

--Soal 1
SELECT nim,nama,alamat,umur,jurusan.id_jurusan,jurusan.Nama_Jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.id_jurusan = jurusan.id_jurusan;
--Soal 2
SELECT nim,nama,alamat,umur,jurusan.id_jurusan,jurusan.Nama_Jurusan FROM jurusan INNER JOIN mahasiswa ON mahasiswa.id_jurusan = jurusan.id_jurusan WHERE mahasiswa.umur <20;
--Soal 3
SELECT nama,mata_kuliah.nama_matkul, nilai FROM MAHASISWA INNER JOIN jadwal ON mahasiswa.nim = jadwal.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul WHERE jadwal.nilai = "A" OR "B";
--Soal 4
SELECT mahasiswa.*,(mata_kuliah.sks) as total_sks FROM mahasiswa INNER JOIN jadwal ON jadwal.nim = mahasiswa.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul GROUP BY mahasiswa.nim HAVING SUM (mata_kuliah.sks) >10;
--Soal 5

-- SELECT mahasiswa.nama, mata_kuliah.nama_matkul FROM mahasiswa INNER JOIN jadwal ON jadwal.nim = mahasiswa.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul WHERE mata_kuliah.nama_matkul LIKE "%Data Maining%"; 

SELECT mahasiswa.nama, mata_kuliah.nama_matkul FROM mahasiswa INNER JOIN jadwal ON jadwal.nim = mahasiswa.nim INNER JOIN mata_kuliah ON jadwal.id_matkul = mata_kuliah.id_matkul WHERE mata_kuliah.nama_matkul = "Data Maining"; 

SELECT DISTINCT dosen.nama_dosen as dosen, COUNT (mahasiswa.nama) as total_mahasiswa FROM dosen INNER JOIN jadwal ON jadwal.nip = dosen.nip INNER JOIN mahasiswa ON jadwal.nim = mahasiswa.nim GROUP BY dosen.nama_dosen; 

SELECT nama,umur FROM mahasiswa ORDER BY umur asc;

SELECT mata_kuliah.nama_matkul, 