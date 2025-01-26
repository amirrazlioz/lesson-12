const baseURL = 'http://localhost:3000';

const selectedProductsArr = JSON.parse(localStorage.getItem('selectedProducts'));
const totalProducts = selectedProductsArr.length;
const totalPrice = selectedProductsArr.reduce((sum, product) => sum + product.price, 0);

document.getElementById('totalProducts').innerText = totalProducts;
document.getElementById('totalPrice').innerText = totalPrice;

async function approvePurchase() {
  const userEmail = localStorage.getItem('userEmail');
  const user = localStorage.getItem('user');
  if (!userEmail) {
	alert('User not logged in.');
	window.location.href = 'index.html';
	return;
  }

  try {
	await axios.post(`${baseURL}/orders/place`, {
	  userEmail,
	  products: selectedProductsArr.map(p => p.name),
	  totalPrice
	});
	alert('Purchase approved!');
	localStorage.removeItem('selectedProducts');
	window.location.href = 'index.html';
  } catch (error) {
	alert('Error processing the purchase.');
  }
}