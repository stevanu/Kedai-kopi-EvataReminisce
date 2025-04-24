 document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Robusta Berazil', img:'1.jpg', price: 67000 },
            { id: 2, name: 'Mockup Yellow', img:'2.jpg', price: 65000 },
            { id: 3, name: 'Gayo Aceh', img:'3.jpg', price: 72000 },
            { id: 4, name: 'Tabai Robusta', img:'4.jpg', price: 70000 },
            { id: 5, name: 'Koffie Hideung', img:'5.jpg', price: 62000 },
            { id: 6, name: 'Robusta Temanggung', img:'6.jpg', price: 53000 },
            { id: 7, name: 'Mockup Black', img:'7.jpg', price: 86000 },
        ]
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada  / cart masih kosong 

            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            } else {
                // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
                this.items = this.items.map((item) => {
                // jika barang berbeda
                if (item.id !== newItem.id) {
                    return item;
                } else {
                    // jika barang sudah ada, tambah quantity dan totalnya 
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    this.quantity++;
                    this.total += item.price;
                    return item;
                }
                });
            }

        },
        remove(id) {
            // ambil item yang ingin diremove berdasarkan idnya
            const cartItem = this.items.find((item) => item.id === id);

            // jika item lebih dari 1
            if (cartItem.quantity > 1) {
                // telusuri satu satu 
                this.items = this.items.map((item) => {
                    // jika bukan barang yang diklik 
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
            //  jika barangnya sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
            }
        },
    });
 });

//  form validation

const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector ('#checkoutForm');

form.addEventListener('keyup', function() {
    let filled = true;
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.trim().length === 0) {
            filled = false;
            break;
        }
    }

    checkoutButton.disabled = !filled;
    checkoutButton.classList.toggle('disabled', !filled);
});

// kirim data costumer setelah checkout diklik
checkoutButton.addEventListener('click', function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('https://wa.me/(your whatsapp number)?text=' + encodeURIComponent(message));
});


// format pesan whatsapp
const formatMessage = (obj) => {
    return `Data Costumer
    Nama: ${obj.name}
    Email: ${obj.email}
    No HP: ${obj.phone}
    Alamat: ${obj.alamat}

Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}    
TOTAL: ${rupiah(obj.total)}
Terimakasih.`;
};


 // konversi ke Rupiah

 const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(Number);
 };