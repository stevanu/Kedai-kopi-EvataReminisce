// toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {

    navbarNav.classList.toggle('active');
};

//Toggle class active untuk search form

const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus ();
    e.preventDefault();
};

// toggle class avtive untuk shopping cart 
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault()
}

// klik diluar element

const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');


document.addEventListener('click', function(e){
    if(!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
        shoppingCart.classList.remove('active');
    }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {

    btn.onclick = (e) => {
        console.log("");
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };

});
    


// Klik Tombol Close
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

// klik diluar modal
const modal = document.querySelector('#item-detail-modal');
window.onclick = (e) => {
    if (e.target == itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector('#item-detail-modal');
    const modalImg = document.querySelector('#modal-img');
    const modalTitle = document.querySelector('#modal-title');
    const modalDesc = document.querySelector('#modal-desc');
    const modalPrice = document.querySelector('#modal-price');
  
    document.querySelectorAll('.item-detail-button').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
  
        // Ambil elemen card terdekat
        const card = this.closest('.Product-card');
        const name = card.querySelector('h3').innerText;
        const img = card.querySelector('img').getAttribute('src');
        const price = card.querySelector('.Product-price span').innerText;
  
        // Update isi modal
        modalImg.setAttribute('src', img);
        modalTitle.innerText = name;
        modalDesc.innerText = "Deskripsi produk belum tersedia."; // Update jika ada deskripsi
        modalPrice.innerText = price;
  
        // Tampilkan modal
        modal.style.display = 'flex';
      });
    });
  
    // Close modal jika klik tombol X
    document.querySelector('.close-icon').addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'none';
    });
  });
  

//   Testimoni
// Fungsi untuk menampilkan rating dalam bentuk bintang
const getRatingStars = (rating) => '⭐'.repeat(rating);

// Fungsi untuk memuat testimoni dari localStorage
function loadTestimoni() {
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
    const list = document.getElementById('testimoni-list');
    list.innerHTML = '';  // Kosongkan list sebelum menambahkan item baru

    data.forEach(item => {
        list.innerHTML += `
            <div class="testimoni-item">
                <img src="${item.foto || 'https://via.placeholder.com/70'}" alt="foto ${item.nama}">
                <h5>${item.nama}</h5>
                <div class="rating">${getRatingStars(item.rating)}</div>
                <p>"${item.komentar}"</p>
            </div>
        `;
    });
}

// Event listener untuk menangani pengiriman form
document.getElementById('testimoni-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const komentar = document.getElementById('komentar').value;
    const rating = parseInt(document.getElementById('rating').value);
    const foto = document.getElementById('foto').value;

    const dataBaru = { nama, komentar, rating, foto };
    
    // Ambil data yang sudah ada di localStorage
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
    
    // Menambahkan data baru ke array
    data.unshift(dataBaru);
    
    // Simpan kembali ke localStorage
    localStorage.setItem('testimoni', JSON.stringify(data));
    
    // Reset form setelah pengiriman
    document.getElementById('testimoni-form').reset();
    
    // Memuat ulang testimoni untuk menampilkan data baru
    loadTestimoni();
});

// Memuat testimoni saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTestimoni);
