
const baseURL = 'http://localhost:3000';
const selectedProducts = [];
const sortBy = document.getElementById('sort').value;

async function fetchProducts() {
  try {
    const response = await axios.get(`${baseURL}/products/getProduct`);
    const products = response.data;
	let sortBy = document.getElementById('sort').value;

	if (sortBy === 'name') {
		products.sort((a, b) => a.name.localeCompare(b.name));
	  } else if (sortBy === 'price') {
		products.sort((a, b) => a.price - b.price);
	  }
	  else
	  {
		products.sort((a, b) => a.name.localeCompare(b.name));
	  }

    const productTableBody = document.querySelector('#productTable tbody');
    productTableBody.innerHTML = '';

    products.forEach(product => {
      const row = document.createElement('tr');
      row.className = 'product-row';
      row.innerHTML = `
        <td>${product.name}</td>
        <td>$${product.price}</td>
      `;
      row.addEventListener('click', () => {
        addToCart(product);
      });
      productTableBody.appendChild(row);
    });
  } catch (error) {
    alert('Error fetching products.');
  }
}

function addToCart(product) {
  selectedProducts.push(product);
  console.log (selectedProducts)
  alert(`${product.name} added to cart.`);
}

function goToBuyPage() {
	localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
	window.location.href = 'buy.html';
  }

function  cleanCart() {
	selectedProducts.length = 0;
	localStorage.removeItem('selectedProducts');
}

fetchProducts();