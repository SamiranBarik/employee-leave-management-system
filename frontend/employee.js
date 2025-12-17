fetch(`http://localhost:3000/leave-balance/${localStorage.getItem("userId")}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("sick").innerText = data.sick_leave;
    document.getElementById("vacation").innerText = data.vacation_leave;
  });


const userId = localStorage.getItem("userId");

document.getElementById("leaveForm").addEventListener("submit", e => {
  e.preventDefault();

  fetch("http://localhost:3000/apply-leave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      leaveType: type.value,
      startDate: from.value,
      endDate: to.value,
      reason: reason.value
    })
  }).then(() => location.reload());
});

fetch("http://localhost:3000/leaves")
  .then(res => res.json())
  .then(data => {
    const myLeaves = document.getElementById("myLeaves");
    myLeaves.innerHTML = "";

    data.filter(l => l.user_id == userId).forEach(l => {
      myLeaves.innerHTML += `
        <tr>
          <td>${l.leave_type}</td>
          <td>${l.start_date.split("T")[0]}</td>
          <td>${l.end_date.split("T")[0]}</td>
          <td><span class="status ${l.status}">${l.status}</span></td>
        </tr>
      `;
    });
  });

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
