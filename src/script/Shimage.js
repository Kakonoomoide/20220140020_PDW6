// Fungsi untuk mengubah gambar berdasarkan lebar layar
function changeImages() {
  var image1 = document.getElementById("Dimage1");
  var image2 = document.getElementById("Dimage2");

  if (window.innerWidth < 600) {
    image1.src = "./assets/image/SHimage/mitsuha-after.jpg";
    image2.src = "./assets/image/SHimage/taki-after.jpeg";
  } else {
    image1.src = "./assets/image/SHimage/mitsuha.jpg";
    image2.src = "./assets/image/SHimage/taki.jpg";
  }
}

// Panggil fungsi changeImages() saat halaman dimuat
changeImages();

// Tambahkan event listener untuk memantau perubahan ukuran layar
window.addEventListener("resize", changeImages);
