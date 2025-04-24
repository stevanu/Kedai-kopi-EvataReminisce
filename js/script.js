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
function getRatingStars(rating) {
    return '⭐'.repeat(rating);
  }
  
  function loadTestimoni() {
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
    const list = document.getElementById('testimoni-list');
    list.innerHTML = '';
  
    data.forEach((item, index) => {
      const element = document.createElement('div');
      element.className = 'testimoni-item';
      element.innerHTML = `
        <img src="${item.foto || 'https://via.placeholder.com/70'}" alt="foto ${item.nama}">
        <h5>${item.nama}</h5>
        <div class="rating">${getRatingStars(item.rating)}</div>
        <p>"${item.komentar}"</p>
        <div class="testimoni-actions">
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Hapus</button>
        </div>
      `;
      list.appendChild(element);
    });
  
    // Tambahkan event listener untuk Edit dan Hapus
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', openEditModal);
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', deleteTestimoni);
    });
  }
  
  function deleteTestimoni(e) {
    const index = e.target.dataset.index;
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
    data.splice(index, 1);
    localStorage.setItem('testimoni', JSON.stringify(data));
    loadTestimoni();
  }
  
  let editIndex = null;
  
  function openEditModal(e) {
    editIndex = e.target.dataset.index;
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
    const item = data[editIndex];
  
    document.getElementById('edit-nama').value = item.nama;
    document.getElementById('edit-komentar').value = item.komentar;
    document.getElementById('edit-foto').value = item.foto;
    document.getElementById('edit-rating').value = item.rating;
  
    document.getElementById('edit-modal').style.display = 'block';
  }
  
  document.getElementById('cancel-edit').onclick = () => {
    document.getElementById('edit-modal').style.display = 'none';
  };
  
  document.getElementById('save-edit').onclick = () => {
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
  
    data[editIndex] = {
      nama: document.getElementById('edit-nama').value,
      komentar: document.getElementById('edit-komentar').value,
      foto: document.getElementById('edit-foto').value,
      rating: parseInt(document.getElementById('edit-rating').value)
    };
  
    localStorage.setItem('testimoni', JSON.stringify(data));
    document.getElementById('edit-modal').style.display = 'none';
    loadTestimoni();
  };
  
  // Submit Form Testimoni Baru
  document.getElementById('testimoni-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nama = document.getElementById('nama').value;
    const komentar = document.getElementById('komentar').value;
    const rating = parseInt(document.getElementById('rating').value);
    const foto = document.getElementById('foto').value;
  
    const dataBaru = { nama, komentar, rating, foto };
    const data = JSON.parse(localStorage.getItem('testimoni')) || [];
    data.unshift(dataBaru);
    localStorage.setItem('testimoni', JSON.stringify(data));
  
    document.getElementById('testimoni-form').reset();
    loadTestimoni();
  });
  
  // Load saat halaman dimuat
  document.addEventListener('DOMContentLoaded', loadTestimoni);
  