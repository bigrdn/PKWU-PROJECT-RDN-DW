const products = [
    { id: 1, name: "Honda S2000", price: 250000, img: "https://i.pinimg.com/1200x/63/4a/a3/634aa318793b3fa75a31f5c738e079f6.jpg" },
    { id: 2, name: "F1 Oracle Red Bull", price: 320000, img: "https://i.pinimg.com/1200x/7c/b2/96/7cb2965b780d756947f315268e716c39.jpg" },
    { id: 3, name: "Toyota AE86 Sprinter Trueno", price: 220000, img: "https://i.pinimg.com/1200x/d7/7b/fe/d77bfeea73cccb5e8c0acd841507a19f.jpg" },
    { id: 4, name: "Back To The Future Time Machine 2", price: 90000, img: "https://down-id.img.susercontent.com/file/id-11134207-23020-9ep43bfkn2mv00" },
    { id: 5, name: "Forza Motorsport Lamborghini Huracan LP 610-4 ", price: 530000, img: "https://i.pinimg.com/736x/b9/d8/24/b9d824751f4e5b816af244d346cd8adf.jpg" },
    { id: 6, name: "Hammer Drop Bugatti Veyron", price: 132000, img: "https://www.jcardiecast.com/cdn/shop/files/145AB8BC-5338-414A-AED0-9F745E9E4AD6.jpg?v=1738090799" },
    { id: 7, name: "Porcshe 911 Turbo (Hotwheels Premium)", price: 138000, img: "https://down-id.img.susercontent.com/file/sg-11134201-7rbln-lqblgfbf6g16d6" },
    { id: 8, name: "Hotwheels Street Noz", price: 240000, img: "https://down-id.img.susercontent.com/file/id-11134207-7r990-luq1u12jpkx3b6" }
];

let cart = [];

function renderProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.img}" alt="${product.name}" style="width: 300px; height: 200px;">
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Tambah ke Keranjang
            </button>
        </div>
    `).join('');
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    showNotification('Produk ditambahkan ke keranjang!');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
            updateCartCount();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Keranjang kosong</h3>
                <p>Belum ada produk di keranjang Anda</p>
            </div>
        `;
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItemsContainer.innerHTML = `
        ${cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" class="cart-thumb" 
                     style="width:55px; height:55px; margin-right:10px;">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    <div class="item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button>
            </div>
        `).join('')}
        <div class="cart-total">
            Total: Rp ${total.toLocaleString('id-ID')}
        </div>
        <button class="checkout-btn" onclick="checkout()">
            🚀 Pesan Sekarang
        </button>
    `;
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        renderCart();
    }
}

function checkout() {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsList = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    
    alert(`✅ Kontak +62 8588060 0859 untuk pembayaran lebih lanjut!\n\nProduk: ${itemsList}\n\nTotal: Rp ${total.toLocaleString('id-ID')}\n\nTerima kasih telah berbelanja di Hot Wheels Store!`);
    
    cart = [];
    updateCartCount();
    toggleCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.animation = 'fadeIn 0.3s';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize
renderProducts();