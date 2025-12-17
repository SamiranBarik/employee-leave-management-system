
window.onload = () => {
  document.getElementById("loginForm").reset();
  localStorage.clear();
};

document.getElementById("loginForm").onsubmit = async function (e) {
  e.preventDefault();

  const data = {
    email: email.value,
    password: password.value,
    role: role.value
  };

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (result.success) {
    localStorage.setItem("userId", result.user.id);
    localStorage.setItem("role", result.user.role);

    if (result.user.role === "EMPLOYEE") {
      window.location.href = "employee.html";
    } else {
      window.location.href = "manager.html";
    }
  } else {
    alert("Invalid login credentials");
  }
};
