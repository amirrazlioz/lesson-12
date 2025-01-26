const baseURL = 'http://localhost:3000';

async function handleSignin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = document.getElementById('user').value;
  localStorage.setItem('userEmail', JSON.stringify(email));

  try {
    const response = await axios.post(`${baseURL}/sign/signin`, { email, password });
    
    if ( user === "admin")
    {
      alert('Login successful! Redirecting to admin page.');
      window.location.href = 'admin.html';
    }
    else
    {
      alert('Login successful! Redirecting to products page.');
      window.location.href = 'products.html';
    }

  } catch (error) {
    alert('Invalid email or password. Please try again.');
  }
};

function redirectToSignup() {
  window.location.href = 'signup.html';
};
