const baseURL = 'http://localhost:3000';

async function handleSignup() {  
  const email = document.getElementById('email').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  try {
	await axios.post(`${baseURL}/sign/signup`, { email, name, password });
	alert('Signup successful! Redirecting to login.');
	window.location.href = 'index.html';
  } catch (error) {
	alert('Error: Email already exists or invalid input.');
  }
};