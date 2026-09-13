const tombolBuat = document.getElementById('buat');
const tombolHitung = document.getElementById('hitung');
const pilihOperasi = document.getElementById('operasi');
const kotakNilaiEkstra = document.getElementById('kotakNilaiEkstra');

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
            for (let i = 0; i < barisA; i++) {
                let barisHasil = [];
                for (let j = 0; j < kolomA; j++) {
                    barisHasil.push(MatriksA[i][j] + MatriksB[i][j]);
                }
                MatriksHasil.push(barisHasil);
            }
            teksHasil = buatTabel(MatriksHasil);
        }
    } 
    else if (operasi === 'kurang') {
        if (!document.getElementById('B_0_0') || isNaN(barisB) || isNaN(kolomB)) {
            teksHasil = "<span class='pesan-error'>Error: Matriks B belum dibuat.</span>";
        } else if (barisA !== barisB || kolomA !== kolomB) {
            teksHasil = "<span class='pesan-error'>Error: Ordo Matriks A dan B harus sama persis.</span>";
        } else {
            let MatriksHasil = [];
            for (let i = 0; i < barisA; i++) {
                let barisHasil = [];
                for (let j = 0; j < kolomA; j++) {
                    barisHasil.push(MatriksA[i][j] - MatriksB[i][j]);
                }
                MatriksHasil.push(barisHasil);
            }
            teksHasil = buatTabel(MatriksHasil);
        }
    } 
    else if (operasi === 'kali') {
        if (!document.getElementById('B_0_0') || isNaN(barisB) || isNaN(kolomB)) {
            teksHasil = "<span class='pesan-error'>Error: Matriks B belum dibuat.</span>";
        } else if (kolomA !== barisB) {
            teksHasil = "<span class='pesan-error'>Error: Kolom Matriks A harus sama dengan Baris Matriks B.</span>";
        } else {
            let MatriksHasil = [];
            for (let i = 0; i < barisA; i++) {
                let barisHasil = [];
                for (let j = 0; j < kolomB; j++) {
                    let totalSuku = 0;
                    for (let k = 0; k < kolomA; k++) {
                        totalSuku = totalSuku + (MatriksA[i][k] * MatriksB[k][j]);
                    }
                    barisHasil.push(totalSuku);
                }
                MatriksHasil.push(barisHasil);
            }
            teksHasil = buatTabel(MatriksHasil);
        }
    } 
    else if (operasi === 'determinan') {
        if (barisA !== kolomA) {
            teksHasil = "<span class='pesan-error'>Error: Determinan hanya untuk matriks persegi.</span>";
        } else if (barisA === 1) {
            teksHasil = "<strong>Determinan: </strong>" + MatriksA[0][0];
        } else if (barisA === 2) {
            let determinan = (MatriksA[0][0] * MatriksA[1][1]) - (MatriksA[0][1] * MatriksA[1][0]);
            teksHasil = "<strong>Determinan (2x2): </strong>" + determinan;
        } else if (barisA === 3) {
            let determinan = (MatriksA[0][0] * MatriksA[1][1] * MatriksA[2][2]) + 
                             (MatriksA[0][1] * MatriksA[1][2] * MatriksA[2][0]) + 
                             (MatriksA[0][2] * MatriksA[1][0] * MatriksA[2][1]) - 
                             (MatriksA[0][2] * MatriksA[1][1] * MatriksA[2][0]) - 
                             (MatriksA[0][0] * MatriksA[1][2] * MatriksA[2][1]) - 
                             (MatriksA[0][1] * MatriksA[1][0] * MatriksA[2][2]);
            teksHasil = "<strong>Determinan (3x3): </strong>" + determinan;
        } else {
            teksHasil = "<span class='pesan-error'>Maksimal ordo 3x3 untuk determinan.</span>";
        }
    }
    else if (operasi === 'transpose') {
        let MatriksHasil = [];

        for (let i = 0; i < kolomA; i++) {
            let barisHasil = [];
            for (let j = 0; j < barisA; j++) {
                barisHasil.push(MatriksA[j][i]);
            }
            MatriksHasil.push(barisHasil);
        }

        teksHasil = "<strong>Transpose Matriks A:</strong>" + buatTabel(MatriksHasil);
    }
else if (operasi === 'skalar') {
    const skalar = parseFloat(document.getElementById('nilaiEkstra').value);
    if (isNaN(skalar)) {
        teksHasil = "<span class='pesan-error'>Error: Isi dulu nilai skalarnya.</span>";
    } else {
        let MatriksHasil = [];
        for (let i = 0; i < barisA; i++) {
            let barisHasil = [];
            for (let j = 0; j < kolomA; j++) {
                barisHasil.push(MatriksA[i][j] * skalar);
            }
            MatriksHasil.push(barisHasil);
        }
        teksHasil = "<strong>Hasil " + skalar + " x Matriks A:</strong>" + buatTabel(MatriksHasil);
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

pilihOperasi.addEventListener('change', function() {
    if (pilihOperasi.value === 'skalar' || pilihOperasi.value === 'pangkat') {
        kotakNilaiEkstra.style.display = 'block';
    } else {
        kotakNilaiEkstra.style.display = 'none';
    }
});

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