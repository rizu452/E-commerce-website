const products = [
    {
        id: 1,
        name: "anarkali kurta",
        description: "blue anarkali krti fully stitched",
        price: 1000.00,
        image: "https://5.imimg.com/data5/SELLER/Default/2023/7/322511812/BX/IE/EP/142530485/georgette-printed-maxi-dress.jpeg"  // Add your image paths
    },
    {
        id: 2,
        name: "watch",
        description: "stylish silver coated watch",
        price: 2000.00,
        image: "https://m.media-amazon.com/images/I/61p66iye3sL._AC_UY1000_.jpg"
    },
    {
        id: 3,
        name: "slippers",
        description: "stylish baby pink color flats",
        price: 300.00,
        image: "https://fcity.in/images/products/207880662/9tndx_512.jpg"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-link').innerText = `Cart (${cart.length})`;
}

function loadCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
                        <button onclick="removeFromCart(${index})">Remove</button>`;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

document.getElementById('cart-link').addEventListener('click', () => {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
    loadCart();
});

document.getElementById('checkout').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    updateCartCount();
    loadCart();
});

loadProducts();
updateCartCount();
