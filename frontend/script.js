const API = "http://localhost:3000";

// REGISTER FUNCTION
function register() {
  fetch(API + "/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: regUser.value,
      password: regPass.value
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.message === "Registration successful") {
      window.location.href = "login.html"; // 🔁 redirect to login
    }
  });
}

// LOGIN FUNCTION
function login() {
  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: logUser.value,
      password: logPass.value
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  });
}
