
<script>
function showSection(sectionId) {
         // Hide all sections first
         var sections = document.querySelectorAll('.content-section');
         sections.forEach(function(section) {
             section.style.display = 'none';
             section.classList.remove('active');
         });

         // Remove active class from all sidebar links
         var sidebarLinks = document.querySelectorAll('.sidebar-menu a');
         sidebarLinks.forEach(function(link) {
             link.classList.remove('active');
         });

         // Show the selected section and add active class
         var selectedSection = document.getElementById(sectionId);
         if (selectedSection) {
             selectedSection.style.display = 'block';
             selectedSection.classList.add('active');
         }

         // Add active class to clicked sidebar link
         var activeLink = document.querySelector([onclick="showSection('${sectionId}')"]);
         if (activeLink) {
             activeLink.classList.add('active');
         }

         // Special handling for logout
         if (sectionId === 'logout') {
             // Add your logout logic here
             alert('Logging out...');
             // For example: window.location.href = 'logout.php';
         }
     }

     // When page loads, show dashboard by default
     document.addEventListener('DOMContentLoaded', function() {
         showSection('dashboard');
     });

     function searchJabatan() {
         const input = document.getElementById('searchJabatan');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('jabatanTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama Jabatan
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     function searchIzin() {
         const input = document.getElementById('searchIzin');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('izinTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[1]; // Kolom Nama
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     function addAbsensiData(data) {
         const tableBody = document.getElementById('absensiTableBody');
         data.forEach(item => {
             const row = `<tr>
                 <td>${item.no}</td>
                 <td>${item.id}</td>
                 <td>${item.nama}</td>
                 <td>${item.tanggal}</td>
                 <td>${item.jamMasuk}</td>
                 <td>${item.jamKeluar}</td>
                 <td>
                     <a href="#" class="action-btn edit"><i class="fas fa-edit"></i></a>
                     <a href="#" class="action-btn delete"><i class="fas fa-trash"></i></a>
                 </td>
             </tr>`;
             tableBody.innerHTML += row;
         });

         // Panggil fungsi untuk menghapus baris yang berlebih
         removeExcessAbsensiRows();
     }

     function removeExcessAbsensiRows() {
         const tableBody = document.getElementById('absensiTableBody');
         const rows = tableBody.getElementsByTagName('tr');

         // Hapus baris yang lebih dari 10
         while (rows.length > 10) {
             tableBody.deleteRow(10); // Menghapus baris ke-11 (indeks 10)
         }
     }

     function addAbsensi() {
         const id = document.getElementById('inputID').value;
         const nama = document.getElementById('inputNama').value;
         const tanggal = document.getElementById('inputTanggal').value;
         const jamMasuk = document.getElementById('inputJamMasuk').value;
         const jamKeluar = document.getElementById('inputJamKeluar').value;

         const tableBody = document.getElementById('absensiTableBody');
         const rowCount = tableBody.rows.length + 1; // Menghitung nomor urut

         const row = {
             no: rowCount,
             id: id,
             nama: nama,
             tanggal: tanggal,
             jamMasuk: jamMasuk,
             jamKeluar: jamKeluar
         };

         // Simpan data ke localStorage
         let absensiData = JSON.parse(localStorage.getItem('absensiData')) || [];
         absensiData.push(row);
         localStorage.setItem('absensiData', JSON.stringify(absensiData));

         // Tambahkan baris ke tabel
         addAbsensiData(absensiData);

         // Reset form input
         resetAbsensiForm();
     }

     function searchAbsensi() {
         const input = document.getElementById('searchAbsensi');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('absensiTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     function deleteAbsensi(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         document.getElementById('absensiTableBody').deleteRow(i - 1); // Menghapus baris
     }

     function searchKaryawan() {
         const input = document.getElementById('searchKaryawan');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('karyawanTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }
     function addKaryawan() {
 const id = document.getElementById('inputIDKaryawan').value;
 const nama = document.getElementById('inputNamaKaryawan').value;
 const email = document.getElementById('inputEmailKaryawan').value;
 const alamat = document.getElementById('inputAlamatKaryawan').value;
 const jabatan = document.getElementById('inputJabatanKaryawan').value;

 const tableBody = document.getElementById('karyawanTableBody');
 const rowCount = tableBody.rows.length + 1; // Menghitung nomor urut

 const row = `<tr>
     <td>${rowCount}</td>
     <td>${id}</td>
     <td>${nama}</td>
     <td>${email}</td>
     <td>${alamat}</td>
     <td>${jabatan}</td>
     <td>
         <a href="#" class="action-btn edit" onclick="editKaryawan(this)"><i class="fas fa-edit"></i></a>
         <a href="#" class="action-btn delete" onclick="deleteKaryawan(this)"><i class="fas fa-trash"></i></a>
     </td>
 </tr>`;
 tableBody.innerHTML += row;

 // Reset input fields
 resetKaryawanForm();
}
function editKaryawan(row) {
 const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
 const table = document.getElementById('karyawanTableBody');
 const selectedRow = table.rows[i - 1];

 // Mengisi form input dengan data yang ada
 document.getElementById('inputIDKaryawan').value = selectedRow.cells[1].innerText;
 document.getElementById('inputNamaKaryawan').value = selectedRow.cells[2].innerText;
 document.getElementById('inputEmailKaryawan').value = selectedRow.cells[3].innerText;
 document.getElementById('inputAlamatKaryawan').value = selectedRow.cells[4].innerText;
 document.getElementById('inputJabatanKaryawan').value = selectedRow.cells[5].innerText;

 // Menghapus baris yang dipilih
 deleteKaryawan(row);
}
function resetKaryawanForm() {
 document.getElementById('inputIDKaryawan').value = '';
 document.getElementById('inputNamaKaryawan').value = '';
 document.getElementById('inputEmailKaryawan').value = '';
 document.getElementById('inputAlamatKaryawan').value = '';
 document.getElementById('inputJabatanKaryawan').value = '';
}
function deleteKaryawan(row) {
 const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
 document.getElementById('karyawanTableBody').deleteRow(i - 1); // Menghapus baris
}

     function updateDashboard() {
         const totalKaryawan = document.getElementById('karyawanTableBody').rows.length;
         document.getElementById('totalPegawaiCount').innerText = totalKaryawan; // Update total pegawai di dashboard
     }

     // Fungsi untuk menambah data izin
     function addIzin() {
         const id = document.getElementById('inputIDIzin').value;
         const nama = document.getElementById('inputNamaIzin').value;
         const tanggal = document.getElementById('inputTanggalIzin').value;
         const keterangan = document.getElementById('inputKeteranganIzin').value;
         const status = document.getElementById('inputStatusIzin').value; // Ambil nilai status dari dropdown

         const tableBody = document.getElementById('izinTableBody');
         const rowCount = tableBody.rows.length + 1; // Menghitung nomor urut

         const row = `<tr>
             <td>${rowCount}</td>
             <td>${id}</td>
             <td>${nama}</td>
             <td>${tanggal}</td>
             <td>${keterangan}</td>
             <td>${status}</td> <!-- Tambahkan status ke baris -->
             <td>
                 <a href="#" class="action-btn edit"><i class="fas fa-edit"></i></a>
                 <a href="#" class="action-btn delete" onclick="deleteIzin(this)"><i class="fas fa-trash"></i></a>
             </td>
         </tr>`;
         tableBody.innerHTML += row;

         // Reset input fields
         resetIzinForm(); // Pastikan Anda memiliki fungsi ini untuk mereset form
     }

     // Fungsi untuk mencari data izin
     function searchIzin() {
         const input = document.getElementById('searchIzin');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('izinTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     // Fungsi untuk menghapus data izin
     function deleteIzin(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         document.getElementById('izinTableBody').deleteRow(i - 1); // Menghapus baris
     }

     // Fungsi untuk menambah data lembur
     function addLembur() {
         const id = document.getElementById('inputIDLembur').value;
         const nama = document.getElementById('inputNamaLembur').value;
         const tanggal = document.getElementById('inputTanggalLembur').value;
         const jamLembur = document.getElementById('inputJamLembur').value;
         const keterangan = document.getElementById('inputKeteranganLembur').value;
         const status = document.getElementById('inputStatusLembur').value; // Ambil nilai status dari dropdown

         const tableBody = document.getElementById('lemburTableBody');
         const rowCount = tableBody.rows.length + 1; // Menghitung nomor urut

         const row = `<tr>
             <td>${rowCount}</td>
             <td>${id}</td>
             <td>${nama}</td>
             <td>${tanggal}</td>
             <td>${jamLembur}</td>
             <td>${keterangan}</td>
             <td>${status}</td> <!-- Tambahkan status ke baris -->
             <td>
                 <a href="#" class="action-btn edit"><i class="fas fa-edit"></i></a>
                 <a href="#" class="action-btn delete" onclick="deleteLembur(this)"><i class="fas fa-trash"></i></a>
             </td>
         </tr>`;
         tableBody.innerHTML += row;

         // Reset input fields
         resetLemburForm(); // Pastikan Anda memiliki fungsi ini untuk mereset form
     }

     // Fungsi untuk mencari data lembur
     function searchLembur() {
         const input = document.getElementById('searchLembur');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('lemburTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     // Fungsi untuk menghapus data lembur
     function deleteLembur(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         document.getElementById('lemburTableBody').deleteRow(i - 1); // Menghapus baris
     }

     // Fungsi untuk menambah data jabatan
     function addJabatan() {
         const kode = document.getElementById('inputKodeJabatan').value;
         const nama = document.getElementById('inputNamaJabatan').value;

         const tableBody = document.getElementById('jabatanTableBody');
         const rowCount = tableBody.rows.length + 1; // Menghitung nomor urut

         const row = `<tr>
             <td>${rowCount}</td>
             <td>${kode}</td>
             <td>${nama}</td>
             <td>
                 <a href="#" class="action-btn edit"><i class="fas fa-edit"></i></a>
                 <a href="#" class="action-btn delete" onclick="deleteJabatan(this)"><i class="fas fa-trash"></i></a>
             </td>
         </tr>`;
         tableBody.innerHTML += row;

         // Reset form input
         document.getElementById('inputKodeJabatan').value = '';
         document.getElementById('inputNamaJabatan').value = '';
     }

     // Fungsi untuk mencari data jabatan
     function searchJabatan() {
         const input = document.getElementById('searchJabatan');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('jabatanTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama Jabatan
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     // Fungsi untuk menghapus data jabatan
     function deleteJabatan(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         document.getElementById('jabatanTableBody').deleteRow(i - 1); // Menghapus baris
     }

     // Fungsi untuk menambah data divisi
     function addDivisi() {
         const id = document.getElementById('inputIDDivisi').value;
         const nama = document.getElementById('inputNamaDivisi').value;

         const tableBody = document.getElementById('divisiTableBody');
         const rowCount = tableBody.rows.length + 1; // Menghitung nomor urut

         const row = `<tr>
             <td>${rowCount}</td>
             <td>${id}</td>
             <td>${nama}</td>
             <td>
                 <a href="#" class="action-btn edit"><i class="fas fa-edit"></i></a>
                 <a href="#" class="action-btn delete" onclick="deleteDivisi(this)"><i class="fas fa-trash"></i></a>
             </td>
         </tr>`;
         tableBody.innerHTML += row;

         // Reset form input
         document.getElementById('inputIDDivisi').value = '';
         document.getElementById('inputNamaDivisi').value = '';
     }

     // Fungsi untuk mencari data divisi
     function searchDivisi() {
         const input = document.getElementById('searchDivisi');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('divisiTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama Divisi
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     // Fungsi untuk menghapus data divisi
     function deleteDivisi(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         document.getElementById('divisiTableBody').deleteRow(i - 1); // Menghapus baris
     }

     // Fungsi untuk menambah data gaji
     function addGaji() {
         const id = document.getElementById('inputIDGaji').value;
         const nama = document.getElementById('inputNamaGaji').value;
         const gajiPokok = document.getElementById('inputGajiPokok').value;
         const tunjangan = document.getElementById('inputTunjangan').value;
         const lembur = document.getElementById('inputLembur').value;
         const potongan = document.getElementById('inputPotongan').value;
         const totalGaji = document.getElementById('inputTotalGaji').value;
         const periode = document.getElementById('inputPeriode').value;

         const tableBody = document.getElementById('gajiTableBody');
         const rowCount = tableBody.rows.length + 1;

         const row = tableBody.insertRow(rowCount);
         row.innerHTML = `
             <td>${rowCount}</td>
             <td>${id}</td>
             <td>${nama}</td>
             <td>${gajiPokok}</td>
             <td>${tunjangan}</td>
             <td>${lembur}</td>
             <td>${potongan}</td>
             <td>${totalGaji}</td>
             <td>${periode}</td>
             <td><span class="badge success">Dibayar</span></td>
             <td>
                 <a href="#" class="action-btn edit" onclick="editGaji(this)"><i class="fas fa-edit"></i></a>
                 <a href="#" class="action-btn print" onclick="printSlipGaji(this)"><i class="fas fa-print"></i></a>
                 <a href="#" class="action-btn delete" onclick="deleteGaji(this)"><i class="fas fa-trash"></i></a>
             </td>
         `;

         // Simpan data ke Local Storage
         saveDataToLocalStorage();

         // Reset input fields
         document.getElementById('inputIDGaji').value = '';
         document.getElementById('inputNamaGaji').value = '';
         document.getElementById('inputGajiPokok').value = '';
         document.getElementById('inputTunjangan').value = '';
         document.getElementById('inputLembur').value = '';
         document.getElementById('inputPotongan').value = '';
         document.getElementById('inputTotalGaji').value = '';
         document.getElementById('inputPeriode').value = '';
     }

     // Fungsi untuk menyimpan data ke Local Storage
     function saveDataToLocalStorage() {
         const tableBody = document.getElementById('karyawanTableBody');
         const rows = tableBody.getElementsByTagName('tr');
         const data = [];

         for (let i = 0; i < rows.length; i++) {
             const cells = rows[i].getElementsByTagName('td');
             const rowData = {
                 id: cells[1].innerText,
                 nama: cells[2].innerText,
                 email: cells[3].innerText,
                 alamat: cells[4].innerText,
                 jabatan: cells[5].innerText
             };
             data.push(rowData);
         }

         localStorage.setItem('karyawanData', JSON.stringify(data));
     }

     // Fungsi untuk mencari data gaji
     function searchGaji() {
         const input = document.getElementById('searchGaji');
         const filter = input.value.toLowerCase();
         const table = document.getElementById('gajiTableBody');
         const tr = table.getElementsByTagName('tr');

         for (let i = 0; i < tr.length; i++) {
             const td = tr[i].getElementsByTagName('td')[2]; // Kolom Nama
             if (td) {
                 const txtValue = td.textContent || td.innerText;
                 tr[i].style.display = txtValue.toLowerCase().indexOf(filter) > -1 ? "" : "none";
             }
         }
     }

     // Fungsi untuk menghapus data gaji
     function deleteGaji(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         document.getElementById('gajiTableBody').deleteRow(i - 1); // Menghapus baris
     }

     // Fungsi untuk mengedit data gaji
     function editGaji(row) {
         const i = row.parentNode.parentNode.rowIndex; // Mendapatkan indeks baris
         const table = document.getElementById('gajiTableBody');
         const selectedRow = table.rows[i - 1];

         // Mengisi form input dengan data yang ada
         document.getElementById('inputIDGaji').value = selectedRow.cells[1].innerText;
         document.getElementById('inputNamaGaji').value = selectedRow.cells[2].innerText;
         document.getElementById('inputGajiPokok').value = selectedRow.cells[3].innerText;
         document.getElementById('inputTunjangan').value = selectedRow.cells[4].innerText;
         document.getElementById('inputLembur').value = selectedRow.cells[5].innerText;
         document.getElementById('inputPotongan').value = selectedRow.cells[6].innerText;
         document.getElementById('inputTotalGaji').value = selectedRow.cells[7].innerText;
         document.getElementById('inputPeriode').value = selectedRow.cells[8].innerText;

         // Menghapus baris yang dipilih
         deleteGaji(row);
     }

     // Fungsi untuk mencetak slip gaji per orang
     function printSlipGaji(row) {
         // Mendapatkan baris yang berisi tombol cetak yang diklik
         const rowToPrint = row.closest('tr');
         const cells = rowToPrint.getElementsByTagName('td');

         // Mengambil data dari sel
         const idKaryawan = cells[1].innerText;
         const nama = cells[2].innerText;
         const gajiPokok = cells[3].innerText;
         const tunjangan = cells[4].innerText;
         const lembur = cells[5].innerText;
         const potongan = cells[6].innerText;
         const totalGaji = cells[7].innerText;
         const periode = cells[8].innerText;
         const status = cells[9].innerText;

         // Membuat konten slip gaji
         const slipContent = `
             <h2>Slip Gaji Karyawan</h2>
             <p>ID Karyawan: ${idKaryawan}</p>
             <p>Nama: ${nama}</p>
             <p>Gaji Pokok: ${gajiPokok}</p>
             <p>Tunjangan: ${tunjangan}</p>
             <p>Lembur: ${lembur}</p>
             <p>Potongan: ${potongan}</p>
             <p>Total Gaji: ${totalGaji}</p>
             <p>Periode: ${periode}</p>
             <p>Status: ${status}</p>
         `;

         // Membuka jendela baru untuk mencetak
         const printWindow = window.open('', '', 'height=600,width=800');
         printWindow.document.write('<html><head><title>Slip Gaji</title>');
         printWindow.document.write('</head><body>');
         printWindow.document.write(slipContent);
         printWindow.document.write('</body></html>');
         printWindow.document.close(); // Menutup dokumen
         printWindow.print(); // Memanggil dialog cetak
     }

     // Fungsi untuk menampilkan data absensi dari localStorage
     function loadAbsensiData() {
         const absensiData = JSON.parse(localStorage.getItem('absensiData')) || [];
         addAbsensiData(absensiData);
     }

     // Fungsi untuk mereset form input
     function resetAbsensiForm() {
         document.getElementById('inputID').value = '';
         document.getElementById('inputNama').value = '';
         document.getElementById('inputTanggal').value = '';
         document.getElementById('inputJamMasuk').value = '';
         document.getElementById('inputJamKeluar').value = '';
     }

     // Panggil loadAbsensiData saat halaman dimuat
     document.addEventListener('DOMContentLoaded', loadAbsensiData);

     // Fungsi untuk memuat data karyawan dari localStorage
     function loadKaryawanData() {
         const karyawanData = JSON.parse(localStorage.getItem('karyawanData')) || [];
         const tableBody = document.getElementById('karyawanTableBody');
         tableBody.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data baru
         karyawanData.forEach((item, index) => {
             const row = `<tr>
                 <td>${index + 1}</td>
                 <td>${item.id}</td>
                 <td>${item.nama}</td>
                 <td>${item.email}</td>
                 <td>${item.alamat}</td>
                 <td>${item.jabatan}</td>
                 <td>
                     <a href="#" class="action-btn edit" onclick="editKaryawan(${index})"><i class="fas fa-edit"></i></a>
                     <a href="#" class="action-btn delete" onclick="deleteKaryawan(${index})"><i class="fas fa-trash"></i></a>
                 </td>
             </tr>`;
             tableBody.innerHTML += row;
         });
     }

     // Fungsi untuk memuat data dari Local Storage saat halaman dimuat
     function loadDataFromLocalStorage() {
         const data = JSON.parse(localStorage.getItem('gajiData'));
         if (data) {
             const tableBody = document.getElementById('gajiTableBody');
             data.forEach((item, index) => {
                 const row = tableBody.insertRow(index);
                 row.innerHTML = `
                     <td>${index + 1}</td>
                     <td>${item.id}</td>
                     <td>${item.nama}</td>
                     <td>${item.gajiPokok}</td>
                     <td>${item.tunjangan}</td>
                     <td>${item.lembur}</td>
                     <td>${item.potongan}</td>
                     <td>${item.totalGaji}</td>
                     <td>${item.periode}</td>
                     <td><span class="badge success">${item.status}</span></td>
                     <td>
                         <a href="#" class="action-btn edit" onclick="editGaji(this)"><i class="fas fa-edit"></i></a>
                         <a href="#" class="action-btn print" onclick="printSlipGaji(this)"><i class="fas fa-print"></i></a>
                         <a href="#" class="action-btn delete" onclick="deleteGaji(this)"><i class="fas fa-trash"></i></a>
                     </td>
                 `;
             });
         }
     }

     // Panggil fungsi loadDataFromLocalStorage saat halaman dimuat
     window.onload = loadDataFromLocalStorage;

     // Fungsi untuk menambah data laporan
     function addLaporan() {
         const id = document.getElementById('inputIDLaporan').value;
         const nama = document.getElementById('inputNamaLaporan').value;
         const bulan = document.getElementById('inputBulanLaporan').value;
         const status = document.getElementById('inputStatusLaporan').value;

         // Validasi input
         if (!id || !nama || !bulan || !status) {
             alert("Semua field harus diisi!");
             return;
         }

         const tableBody = document.getElementById('laporanTableBody');
         const rowCount = tableBody.rows.length + 1;

         const row = tableBody.insertRow(rowCount);
         row.innerHTML = `
             <td>${rowCount}</td>
             <td>${id}</td>
             <td>${nama}</td>
             <td>${bulan}</td>
             <td>${status}</td>
             <td>
                 <a href="#" class="action-btn edit" onclick="editLaporan(this)">Edit</a>
                 <a href="#" class="action-btn delete" onclick="deleteLaporan(this)">Hapus</a>
             </td>
         `;

         // Reset input fields
         resetLaporanForm();
     }

     // Fungsi untuk mengedit data laporan
     function editLaporan(element) {
         const row = element.closest('tr');
         const cells = row.getElementsByTagName('td');

         document.getElementById('inputIDLaporan').value = cells[1].innerText;
         document.getElementById('inputNamaLaporan').value = cells[2].innerText;
         document.getElementById('inputBulanLaporan').value = cells[3].innerText;
         document.getElementById('inputStatusLaporan').value = cells[4].innerText;

         // Hapus baris setelah edit
         deleteLaporan(element);
     }

     // Fungsi untuk menghapus data laporan
     function deleteLaporan(element) {
         const row = element.closest('tr');
         row.parentNode.removeChild(row);
     }

     // Fungsi untuk mencetak laporan
     function printLaporan() {
         const table = document.getElementById('laporanTableBody');
         const rows = table.getElementsByTagName('tr');
         let slipContent = `
             <h2>Data Laporan</h2>
             <table border="1">
                 <tr>
                     <th>No</th>
                     <th>ID Laporan</th>
                     <th>Nama Laporan</th>
                     <th>Bulan</th>
                     <th>Status</th>
                 </tr>
         `;

         for (let i = 0; i < rows.length; i++) {
             const cells = rows[i].getElementsByTagName('td');
             slipContent += `
                 <tr>
                     <td>${cells[0].innerText}</td>
                     <td>${cells[1].innerText}</td>
                     <td>${cells[2].innerText}</td>
                     <td>${cells[3].innerText}</td>
                     <td>${cells[4].innerText}</td>
                 </tr>
             `;
         }

         slipContent += `</table>`;

         const newWindow = window.open('', '', 'height=600,width=800');
         newWindow.document.write('<html><head><title>Laporan</title></head><body>');
         newWindow.document.write(slipContent);
         newWindow.document.write('</body></html>');
         newWindow.document.close();
         newWindow.print();
     }

     // Fungsi untuk mereset form input
     function resetLaporanForm() {
         document.getElementById('inputIDLaporan').value = '';
         document.getElementById('inputNamaLaporan').value = '';
         document.getElementById('inputBulanLaporan').value = '';
         document.getElementById('inputStatusLaporan').value = '';
     }
     
</script>