const tombolBuat = document.getElementById('buat');
const tombolHitung = document.getElementById('hitung');
const pilihOperasi = document.getElementById('operasi');
const kotakNilaiEkstra = document.getElementById('kotakNilaiEkstra');
const petunjukOperasi = document.getElementById('petunjukOperasi');
const statusOrdo = document.getElementById('statusOrdo');

tombolBuat.addEventListener('click', function() {
    const barisA = parseInt(document.getElementById('barisA').value);
    const kolomA = parseInt(document.getElementById('kolomA').value);
    const barisB = parseInt(document.getElementById('barisB').value);
    const kolomB = parseInt(document.getElementById('kolomB').value);

    if (isNaN(barisA) || isNaN(kolomA)) {
        alert("Tolong isi baris dan kolom Matriks A");
        return;
    } else if (barisA < 1 || kolomA < 1) {
        alert("Masukkan bilangan asli (1,2,3,...)");
        return;
    } else if (barisA > 5 || kolomA > 5) {
        alert("Demi kenyamanan bersama, maksimal ukuran ordonya adalah 5...");
        return;
    }

    let MatriksA = '<p><strong>Matriks A:</strong></p><table class="matriks-tabel">';
    for (let i = 0; i < barisA; i++) {
        MatriksA += '<tr>';
        for (let j = 0; j < kolomA; j++) {
            MatriksA += `<td><input type="number" id="A_${i}_${j}" class="input-matriks" placeholder="0"></td>`;
        }
        MatriksA += '</tr>';
    }
    MatriksA += '</table>';
    document.getElementById('matriksA').innerHTML = MatriksA;

    if (!isNaN(barisB) || !isNaN(kolomB)) {
        if (isNaN(barisB) || isNaN(kolomB)) {
            alert("Tolong isi baris dan kolom Matriks B");
            return;
        } else if (barisB < 1 || kolomB < 1) {
            alert("Masukkan bilangan asli (1,2,3,...)");
            return;
        } else if (barisB > 5 || kolomB > 5) {
            alert("Demi kenyamanan bersama, maksimal ukuran ordonya adalah 5...");
            return;
        }

        let MatriksB = '<p><strong>Matriks B:</strong></p><table class="matriks-tabel">';
        for (let i = 0; i < barisB; i++) {
            MatriksB += '<tr>';
            for (let j = 0; j < kolomB; j++) {
                MatriksB += `<td><input type="number" id="B_${i}_${j}" class="input-matriks" placeholder="0"></td>`;
            }
            MatriksB += '</tr>';
        }
        MatriksB += '</table>';
        document.getElementById('matriksB').innerHTML = MatriksB;
    } else {
        document.getElementById('matriksB').innerHTML = "<p><em>Matriks B tidak dibuat (kosong).</em></p>";
    }
});

tombolHitung.addEventListener('click', function() {
    const operasi = document.getElementById('operasi').value;
    
    const barisA = parseInt(document.getElementById('barisA').value);
    const kolomA = parseInt(document.getElementById('kolomA').value);
    const barisB = parseInt(document.getElementById('barisB').value);
    const kolomB = parseInt(document.getElementById('kolomB').value);

    if (!document.getElementById('A_0_0')) {
        alert("Tolong klik generate dulu baru hitung matriksnya");
        return;
    }

    let MatriksA = [];
    for (let i = 0; i < barisA; i++) {
        let baris = [];
        for (let j = 0; j < kolomA; j++) {
            let elemen = document.getElementById(`A_${i}_${j}`);
            let nilai = elemen ? (elemen.value !== undefined && !isNaN(parseFloat(elemen.value)) ? parseFloat(elemen.value) : (parseFloat(elemen.textContent) || 0)) : 0;
            baris.push(nilai);
        }
        MatriksA.push(baris);
    }

    let MatriksB = [];
    if (!isNaN(barisB) && !isNaN(kolomB)) {
        for (let i = 0; i < barisB; i++) {
            let baris = [];
            for (let j = 0; j < kolomB; j++) {
                let elemen = document.getElementById(`B_${i}_${j}`);
                let nilai = elemen ? (elemen.value !== undefined && !isNaN(parseFloat(elemen.value)) ? parseFloat(elemen.value) : (parseFloat(elemen.textContent) || 0)) : 0;
                baris.push(nilai);
            }
            MatriksB.push(baris);
        }
    }

    let teksHasil = "";

    if (operasi === 'tambah') {
        if (!document.getElementById('B_0_0') || isNaN(barisB) || isNaN(kolomB)) {
            teksHasil = "<span class='pesan-error'>Error: Matriks B belum dibuat.</span>";
        } else if (barisA !== barisB || kolomA !== kolomB) {
            teksHasil = "<span class='pesan-error'>Error: Ordo Matriks A dan B harus sama persis.</span>";
        } else {
            let MatriksHasil = [];
            let langkah = [];
            for (let i = 0; i < barisA; i++) {
                let barisHasil = [];
                for (let j = 0; j < kolomA; j++) {
                    let nilai = MatriksA[i][j] + MatriksB[i][j];
                    barisHasil.push(nilai);
                    langkah.push("Posisi (" + (i + 1) + "," + (j + 1) + ") : " +
                                 MatriksA[i][j] + " + " + MatriksB[i][j] + " = " + nilai);
                }
                MatriksHasil.push(barisHasil);
            }
            teksHasil = buatTabel(MatriksHasil) + buatKotakLangkah(langkah);
        }
    } 
    else if (operasi === 'kurang') {
        if (!document.getElementById('B_0_0') || isNaN(barisB) || isNaN(kolomB)) {
            teksHasil = "<span class='pesan-error'>Error: Matriks B belum dibuat.</span>";
        } else if (barisA !== barisB || kolomA !== kolomB) {
            teksHasil = "<span class='pesan-error'>Error: Ordo Matriks A dan B harus sama persis.</span>";
        } else {
            let MatriksHasil = [];
            let langkah = [];
            for (let i = 0; i < barisA; i++) {
                let barisHasil = [];
                for (let j = 0; j < kolomA; j++) {
                    let nilai = MatriksA[i][j] - MatriksB[i][j];
                    barisHasil.push(nilai);
                    langkah.push("Posisi (" + (i + 1) + "," + (j + 1) + ") : " +
                                 MatriksA[i][j] + " - " + MatriksB[i][j] + " = " + nilai);
                }
                MatriksHasil.push(barisHasil);
            }
            teksHasil = buatTabel(MatriksHasil) + buatKotakLangkah(langkah);
        }
    } 
    else if (operasi === 'kali') {
        if (!document.getElementById('B_0_0') || isNaN(barisB) || isNaN(kolomB)) {
            teksHasil = "<span class='pesan-error'>Error: Matriks B belum dibuat.</span>";
        } else if (kolomA !== barisB) {
            teksHasil = "<span class='pesan-error'>Error: Kolom Matriks A harus sama dengan Baris Matriks B.</span>";
        } else {
            let MatriksHasil = [];
            let langkah = [];
            for (let i = 0; i < barisA; i++) {
                let barisHasil = [];
                for (let j = 0; j < kolomB; j++) {
                    let totalSuku = 0;
                    let rincian = [];
                    for (let k = 0; k < kolomA; k++) {
                        totalSuku = totalSuku + (MatriksA[i][k] * MatriksB[k][j]);
                        rincian.push("(" + MatriksA[i][k] + " x " + MatriksB[k][j] + ")");
                    }
                    barisHasil.push(totalSuku);
                    langkah.push("Posisi (" + (i + 1) + "," + (j + 1) + ") : " +
                                 rincian.join(" + ") + " = " + totalSuku);
                }
                MatriksHasil.push(barisHasil);
            }
            teksHasil = buatTabel(MatriksHasil) + buatKotakLangkah(langkah);
        }
    } 
    else if (operasi === 'determinan') {
        if (barisA !== kolomA) {
            teksHasil = "<span class='pesan-error'>Error: Determinan hanya untuk matriks persegi.</span>";
        } else if (barisA === 1) {
            teksHasil = "<strong>Determinan: </strong>" + MatriksA[0][0];
        } else if (barisA === 2) {
            let determinan = (MatriksA[0][0] * MatriksA[1][1]) - (MatriksA[0][1] * MatriksA[1][0]);
            let langkah = [
                "Rumus 2x2 : (a x d) - (b x c)",
                "= (" + MatriksA[0][0] + " x " + MatriksA[1][1] + ") - (" + MatriksA[0][1] + " x " + MatriksA[1][0] + ")",
                "= " + (MatriksA[0][0] * MatriksA[1][1]) + " - " + (MatriksA[0][1] * MatriksA[1][0]),
                "= " + determinan
            ];
            teksHasil = "<strong>Determinan (2x2): </strong>" + determinan + buatKotakLangkah(langkah);
        } else if (barisA === 3) {
            let s1 = MatriksA[0][0] * MatriksA[1][1] * MatriksA[2][2];
            let s2 = MatriksA[0][1] * MatriksA[1][2] * MatriksA[2][0];
            let s3 = MatriksA[0][2] * MatriksA[1][0] * MatriksA[2][1];
            let s4 = MatriksA[0][2] * MatriksA[1][1] * MatriksA[2][0];
            let s5 = MatriksA[0][0] * MatriksA[1][2] * MatriksA[2][1];
            let s6 = MatriksA[0][1] * MatriksA[1][0] * MatriksA[2][2];

            let determinan = s1 + s2 + s3 - s4 - s5 - s6;

            let langkah = [
                "Aturan Sarrus : tiga diagonal ke kanan dikurangi tiga diagonal ke kiri",
                "Diagonal kanan 1 : " + MatriksA[0][0] + " x " + MatriksA[1][1] + " x " + MatriksA[2][2] + " = " + s1,
                "Diagonal kanan 2 : " + MatriksA[0][1] + " x " + MatriksA[1][2] + " x " + MatriksA[2][0] + " = " + s2,
                "Diagonal kanan 3 : " + MatriksA[0][2] + " x " + MatriksA[1][0] + " x " + MatriksA[2][1] + " = " + s3,
                "Diagonal kiri 1  : " + MatriksA[0][2] + " x " + MatriksA[1][1] + " x " + MatriksA[2][0] + " = " + s4,
                "Diagonal kiri 2  : " + MatriksA[0][0] + " x " + MatriksA[1][2] + " x " + MatriksA[2][1] + " = " + s5,
                "Diagonal kiri 3  : " + MatriksA[0][1] + " x " + MatriksA[1][0] + " x " + MatriksA[2][2] + " = " + s6,
                "= (" + s1 + " + " + s2 + " + " + s3 + ") - (" + s4 + " + " + s5 + " + " + s6 + ")",
                "= " + (s1 + s2 + s3) + " - " + (s4 + s5 + s6),
                "= " + determinan
            ];
            teksHasil = "<strong>Determinan (3x3): </strong>" + determinan + buatKotakLangkah(langkah);
        } else {
            teksHasil = "<span class='pesan-error'>Maksimal ordo 3x3 untuk determinan.</span>";
        }
    }
    else if (operasi === 'transpose') {
        let MatriksHasil = [];
        let langkah = [];
        langkah.push("Setiap elemen ditukar posisi baris dan kolomnya.");

        for (let i = 0; i < kolomA; i++) {
            let barisHasil = [];
            for (let j = 0; j < barisA; j++) {
                barisHasil.push(MatriksA[j][i]);  
                langkah.push("Nilai " + MatriksA[j][i] +
                             " dari posisi (" + (j + 1) + "," + (i + 1) + ")" +
                             " pindah ke posisi (" + (i + 1) + "," + (j + 1) + ")");
            }
            MatriksHasil.push(barisHasil);
        }

        teksHasil = "<strong>Transpose Matriks A:</strong>" +
                    buatTabel(MatriksHasil) + buatKotakLangkah(langkah);
    }
    else if (operasi === 'invers') {
        if (barisA !== kolomA) {
            teksHasil = "<span class='pesan-error'>Error: Invers hanya untuk matriks persegi.</span>";
        } else {
            let MatriksHasil = invertMatrix(MatriksA);
            if (MatriksHasil === null) {
                teksHasil = "<span class='pesan-error'>Error: Matriks singular (determinan = 0), tidak punya invers.</span>";
            } else {
                let MatriksBulat = MatriksHasil.map(baris => baris.map(v => Math.round(v * 10000) / 10000));
                teksHasil = "<strong>Invers Matriks A:</strong>" + buatTabel(MatriksBulat);
            }
        }
    }
else if (operasi === 'skalar') {
    const skalar = parseFloat(document.getElementById('nilaiEkstra').value);
    if (isNaN(skalar)) {
        teksHasil = "<span class='pesan-error'>Error: Isi dulu nilai skalarnya.</span>";
    } else {
        let MatriksHasil = [];
        let langkah = [];
        for (let i = 0; i < barisA; i++) {
            let barisHasil = [];
            for (let j = 0; j < kolomA; j++) {
                let nilai = MatriksA[i][j] * skalar;
                barisHasil.push(nilai);
                langkah.push("Posisi (" + (i + 1) + "," + (j + 1) + ") : " +
                             MatriksA[i][j] + " x " + skalar + " = " + nilai);
            }
            MatriksHasil.push(barisHasil);
        }
        teksHasil = "<strong>Hasil " + skalar + " x Matriks A:</strong>" +
                    buatTabel(MatriksHasil) + buatKotakLangkah(langkah);
    }
}
else if (operasi === 'pangkat') {
    const pangkat = parseInt(document.getElementById('nilaiEkstra').value);
    if (barisA !== kolomA) {
        teksHasil = "<span class='pesan-error'>Error: Pangkat matriks hanya untuk matriks persegi.</span>";
    } else if (isNaN(pangkat) || pangkat < 1) {
        teksHasil = "<span class='pesan-error'>Error: Isi dulu pangkatnya (bilangan bulat positif).</span>";
    } else {
        let MatriksHasil = MatriksA;
        for (let p = 1; p < pangkat; p++) {
            let sementara = [];
            for (let i = 0; i < MatriksHasil.length; i++) {
                let barisHasil = [];
                for (let j = 0; j < MatriksA[0].length; j++) {
                    let total = 0;
                    for (let k = 0; k < MatriksA.length; k++) {
                        total += MatriksHasil[i][k] * MatriksA[k][j];
                    }
                    barisHasil.push(total);
                }
                sementara.push(barisHasil);
            }
            MatriksHasil = sementara;
        }
        teksHasil = "<strong>Matriks A pangkat " + pangkat + ":</strong>" + buatTabel(MatriksHasil);
    }
}

    document.getElementById('tampilanHasil').innerHTML = teksHasil;
});

function invertMatrix(matrix) {
    const n = matrix.length;

    let aug = matrix.map((baris, i) => {
        let identitas = new Array(n).fill(0);
        identitas[i] = 1;
        return [...baris, ...identitas];
    });

    for (let i = 0; i < n; i++) {
        let pivot = aug[i][i];

        if (pivot === 0) {
            let barisTukar = -1;
            for (let k = i + 1; k < n; k++) {
                if (aug[k][i] !== 0) {
                    barisTukar = k;
                    break;
                }
            }
            if (barisTukar === -1) {
                return null;
            }
            [aug[i], aug[barisTukar]] = [aug[barisTukar], aug[i]];
            pivot = aug[i][i];
        }

        for (let j = 0; j < 2 * n; j++) {
            aug[i][j] = aug[i][j] / pivot;
        }

        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let faktor = aug[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    aug[k][j] -= faktor * aug[i][j];
                }
            }
        }
    }

    return aug.map(baris => baris.slice(n));
}

function buatTabel(arrayMatriks) {
    let tabel = '<table class="matriks-tabel">';
    for (let i = 0; i < arrayMatriks.length; i++) {
        tabel += '<tr>';
        for (let j = 0; j < arrayMatriks[i].length; j++) {
            tabel += `<td>${arrayMatriks[i][j]}</td>`;
        }
        tabel += '</tr>';
    }
    tabel += '</table>';
    return tabel;
}

function buatKotakLangkah(daftarLangkah) {
    let isi = '<div class="kotak-langkah">';
    isi += '<p class="judul-langkah">Cara perhitungan:</p>';
    for (let i = 0; i < daftarLangkah.length; i++) {
        isi += '<p>' + daftarLangkah[i] + '</p>';
    }
    isi += '</div>';
    return isi;
}

const aturanOperasi = {
    tambah: {
        butuhB: true,
        persegi: false,
        judul: "Penjumlahan (A + B)",
        isi: "Menjumlahkan setiap angka pada posisi yang sama di kedua matriks.",
        syarat: "Ordo Matriks A dan B harus sama persis.",
        langkah: ["Isi ordo Matriks A dan Matriks B dengan ukuran yang sama.", "Klik Generate, lalu isi angka pada kedua matriks.", "Klik Hitung Matriks."]
    },
    kurang: {
        butuhB: true,
        persegi: false,
        judul: "Pengurangan (A - B)",
        isi: "Mengurangi setiap angka Matriks A dengan angka Matriks B pada posisi yang sama.",
        syarat: "Ordo Matriks A dan B harus sama persis.",
        langkah: ["Isi ordo Matriks A dan Matriks B dengan ukuran yang sama.", "Klik Generate, lalu isi angka pada kedua matriks.", "Klik Hitung Matriks."]
    },
    kali: {
        butuhB: true,
        persegi: false,
        judul: "Perkalian (A x B)",
        isi: "Mengalikan baris Matriks A dengan kolom Matriks B, lalu menjumlahkan hasilnya.",
        syarat: "Jumlah kolom Matriks A harus sama dengan jumlah baris Matriks B.",
        langkah: ["Isi ordo A, lalu isi ordo B dengan baris yang sama dengan kolom A.", "Klik Generate, lalu isi angka pada kedua matriks.", "Klik Hitung Matriks."]
    },
    skalar: {
        butuhB: false,
        persegi: false,
        judul: "Perkalian Skalar (k x A)",
        isi: "Mengalikan seluruh angka pada Matriks A dengan satu bilangan.",
        syarat: "Hanya perlu Matriks A. Ukuran bebas.",
        langkah: ["Isi ordo Matriks A saja, Matriks B boleh dikosongkan.", "Klik Generate, lalu isi angka Matriks A.", "Isi bilangan pengali pada kotak di bawah, lalu klik Hitung Matriks."]
    },
    pangkat: {
        butuhB: false,
        persegi: true,
        judul: "Pangkat Matriks (A^n)",
        isi: "Mengalikan Matriks A dengan dirinya sendiri sebanyak n kali.",
        syarat: "Matriks A harus persegi (jumlah baris sama dengan kolom).",
        langkah: ["Isi ordo Matriks A dengan baris dan kolom yang sama, misal 3 dan 3.", "Klik Generate, lalu isi angka Matriks A.", "Isi nilai pangkat pada kotak di bawah, lalu klik Hitung Matriks."]
    },
    determinan: {
        butuhB: false,
        persegi: true,
        judul: "Determinan Matriks A",
        isi: "Menghitung satu nilai yang mewakili matriks, hasilnya berupa angka tunggal.",
        syarat: "Matriks A harus persegi, maksimal ordo 3x3.",
        langkah: ["Isi ordo Matriks A dengan baris dan kolom yang sama, maksimal 3.", "Klik Generate, lalu isi angka Matriks A.", "Klik Hitung Matriks."]
    },
    transpose: {
        butuhB: false,
        persegi: false,
        judul: "Transpose Matriks A",
        isi: "Menukar baris menjadi kolom. Matriks 2x3 akan menjadi 3x2.",
        syarat: "Tidak ada syarat khusus, ukuran bebas.",
        langkah: ["Isi ordo Matriks A saja, Matriks B boleh dikosongkan.", "Klik Generate, lalu isi angka Matriks A.", "Klik Hitung Matriks."]
    },
    invers: {
        butuhB: false,
        persegi: true,
        judul: "Invers Matriks A",
        isi: "Mencari matriks kebalikan, yaitu matriks yang jika dikalikan dengan A menghasilkan matriks identitas.",
        syarat: "Matriks A harus persegi dan determinannya tidak boleh 0.",
        langkah: ["Isi ordo Matriks A dengan baris dan kolom yang sama.", "Klik Generate, lalu isi angka Matriks A.", "Klik Hitung Matriks."]
    }
};

function perbaruiPanduan() {
    const operasi = pilihOperasi.value;
    const aturan = aturanOperasi[operasi];

    const barisA = parseInt(document.getElementById('barisA').value);
    const kolomA = parseInt(document.getElementById('kolomA').value);
    const barisB = parseInt(document.getElementById('barisB').value);
    const kolomB = parseInt(document.getElementById('kolomB').value);

    let teks = "<strong>" + aturan.judul + "</strong><br>";
    teks += aturan.isi + "<br>";
    teks += "<em>Syarat: " + aturan.syarat + "</em>";
    teks += "<ol>";
    for (let i = 0; i < aturan.langkah.length; i++) {
        teks += "<li>" + aturan.langkah[i] + "</li>";
    }
    teks += "</ol>";
    petunjukOperasi.innerHTML = teks;

    if (operasi === 'skalar' || operasi === 'pangkat') {
        kotakNilaiEkstra.style.display = 'block';
    } else {
        kotakNilaiEkstra.style.display = 'none';
    }

    const blokB = document.getElementById('barisB').closest('.form');
    if (aturan.butuhB) {
        blokB.classList.remove('form-redup');
    } else {
        blokB.classList.add('form-redup');
    }

    statusOrdo.className = 'petunjuk';

    if (isNaN(barisA) || isNaN(kolomA)) {
        statusOrdo.textContent = "Isi baris dan kolom Matriks A terlebih dahulu.";
        return;
    }

    if (aturan.persegi && barisA !== kolomA) {
        statusOrdo.textContent = "Operasi ini butuh matriks persegi. Samakan baris dan kolom Matriks A.";
        statusOrdo.classList.add('petunjuk-ingat');
        return;
    }

    if (aturan.butuhB) {
        if (isNaN(barisB) || isNaN(kolomB)) {
            statusOrdo.textContent = "Operasi ini juga memerlukan ordo Matriks B.";
            statusOrdo.classList.add('petunjuk-ingat');
            return;
        }
        if (operasi === 'kali') {
            if (kolomA !== barisB) {
                statusOrdo.textContent = "Belum cocok: kolom A (" + kolomA + ") harus sama dengan baris B (" + barisB + ").";
                statusOrdo.classList.add('petunjuk-ingat');
                return;
            }
            statusOrdo.textContent = "Ordo sudah cocok. Hasil perkalian nanti berukuran " + barisA + "x" + kolomB + ".";
            statusOrdo.classList.add('petunjuk-ok');
            return;
        }
        if (barisA !== barisB || kolomA !== kolomB) {
            statusOrdo.textContent = "Belum cocok: ordo A (" + barisA + "x" + kolomA + ") berbeda dengan B (" + barisB + "x" + kolomB + ").";
            statusOrdo.classList.add('petunjuk-ingat');
            return;
        }
    }

    statusOrdo.textContent = "Ordo sudah sesuai. Silakan klik Generate.";
    statusOrdo.classList.add('petunjuk-ok');
}

pilihOperasi.addEventListener('change', perbaruiPanduan);
document.getElementById('barisA').addEventListener('input', perbaruiPanduan);
document.getElementById('kolomA').addEventListener('input', perbaruiPanduan);
document.getElementById('barisB').addEventListener('input', perbaruiPanduan);
document.getElementById('kolomB').addEventListener('input', perbaruiPanduan);

perbaruiPanduan();