const baseURL = 'http://localhost:3000';

async function fetchOrders() {
  try {
    const response = await axios.get(`${baseURL}/orders/all?admin=true`);
    const orders = response.data;
    const ordersDiv = document.getElementById('orders');
    
    ordersDiv.innerHTML = '<h2>All Orders:</h2>' + orders.map(order => `
      <div>
        <p><strong>User:</strong> ${order.userEmail}</p>
        <p><strong>Products:</strong> ${order.products.join(', ')}</p>
        <p><strong>Total Price:</strong> $${order.totalPrice}</p>
      </div>
    `).join('');
    
  } catch (error) {
    alert('Error fetching orders or unauthorized access.');
  }
}

async function addProduct() {
  const name = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);

  try {
    await axios.post(`${baseURL}/products/addProduct`, { name, price });  
    alert('Product added successfully');
    document.getElementById('addProductForm').reset();
  } catch (error) {
    alert('Error adding product.');
  }
  fetchProducts();
};

async function delProduct() {
  try {
  const productName = document.getElementById('delProductName').value;

  const response = await axios.delete(`${baseURL}/products/delProduct`, {
    data: { name: productName }, // שליחת שם המוצר בגוף הבקשה
  });
  if (response.status === 200) {
    alert('Product deleted successfully.');
  }

} catch (error) {
  if (error.response && error.response.status === 404) {
    alert('Product not found.');
  } else if (error.response && error.response.status === 400) {
    alert('Product name is required.');
  } else {
    alert('Failed to delete product.');
  }
  console.error('Error:', error);
}
fetchProducts();
}



async function fetchProducts() {
  try {
    const response = await axios.get(`${baseURL}/products/getProduct`);
    const products = response.data;

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