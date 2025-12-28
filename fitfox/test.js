// Image slider
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 2000);

// Signup
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  document.getElementById("auth-msg").innerText = data.message;
}

// Login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    document.getElementById("auth-msg").innerText = "Login Successful ✅";
  } else {
    document.getElementById("auth-msg").innerText = data.message;
  }
}

// Razorpay Payment
function buyNow() {
  var options = {
    key: "rzp_test_yourKeyHere", // Replace with your Razorpay key
    amount: 25000, // 250 INR = 250 * 100 paise
    currency: "INR",
    name: "FitFox",
    description: "FitFox Makhana 100g",
    handler: function (response) {
      alert("Payment Successful! ID: " + response.razorpay_payment_id);
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999"
    }
  };
  var rzp = new Razorpay(options);
  rzp.open();
}
