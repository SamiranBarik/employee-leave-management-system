// Block unauthorized access 
if (localStorage.getItem("role") !== "MANAGER") {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadLeaves();
  loadCalendar();
});

// Fetch and display all leave requests (History + Approval)
function loadLeaves() {
  fetch("http://localhost:3000/leaves")
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("table");
      table.innerHTML = "";

      data.forEach(l => {
        table.innerHTML += `
          <tr>
            <td>${l.id}</td>
            <td>${l.leave_type}</td>
            <td>${l.start_date.split("T")[0]}</td>
            <td>${l.end_date.split("T")[0]}</td>
            <td>${l.reason}</td>
            <td>
              <span class="status ${l.status}">
                ${l.status}
              </span>
            </td>
            <td>
              <button class="action-btn approve"
                onclick="updateLeave(${l.id}, 'APPROVED')">
                Approve
              </button>
              <button class="action-btn reject"
                onclick="updateLeave(${l.id}, 'REJECTED')">
                Reject
              </button>
            </td>
          </tr>
        `;
      });
    })
    .catch(err => console.error("Error loading leaves:", err));
}

// Approve / Reject leave
function updateLeave(id, status) {
  fetch("http://localhost:3000/update-leave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, status })
  })
    .then(res => res.json())
    .then(() => {
      loadLeaves();     // refresh history
      loadCalendar();   // refresh calendar
    })
    .catch(err => console.error("Update failed:", err));
}

//  Load Approved Leave Calendar 
function loadCalendar() {
  fetch("http://localhost:3000/leaves")
    .then(res => res.json())
    .then(data => {
      const body = document.getElementById("calendarBody");
      if (!body) return;

      body.innerHTML = "";

      data
        .filter(l => l.status === "APPROVED")
        .forEach(l => {
          body.innerHTML += `
            <tr style="background-color:#e8f5e9;">
              <td>${l.user_id}</td>
              <td>${l.leave_type}</td>
              <td>${l.start_date.split("T")[0]}</td>
              <td>${l.end_date.split("T")[0]}</td>
            </tr>
          `;
        });
    });
}


// Toggle Employee Leave History
function toggleHistory() {
  const card = document.getElementById("historyCard");
  const btn = document.getElementById("toggleBtn");

  if (card.style.display === "none" || card.style.display === "") {
    card.style.display = "block";
    btn.innerText = "Hide Employee Leave History";
  } else {
    card.style.display = "none";
    btn.innerText = "View Employee Leave History";
  }
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
