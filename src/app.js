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
 });