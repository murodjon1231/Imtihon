let products = [];

async function fetchProducts() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        loader.style.display = 'none';
    }
}

function displayProducts(productList) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';
    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="card-content">
                <h3>${product.title}</h3>
                <p>${product.category}</p>
                <button onclick="viewDetails(${product.id})">More</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

function viewDetails(productId) {
    window.location.href = `index1.html?id=${productId}`;
}

fetchProducts()
