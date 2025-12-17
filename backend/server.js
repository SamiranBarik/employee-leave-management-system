const express = require("express");
const cors = require("cors");
const db = require("./Database/Db.js");

const app = express();
app.use(cors());
app.use(express.json());

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password, role } = req.body;

  const q = "SELECT * FROM users WHERE email=? AND password=? AND role=?";
  db.query(q, [email, password, role], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ success: false });
    }

    const user = result[0];

    // ✅ AUTO-CREATE LEAVE BALANCE FOR EMPLOYEE
    if (user.role === "EMPLOYEE") {
      db.query(
        "SELECT * FROM leave_balance WHERE user_id=?",
        [user.id],
        (err, rows) => {
          if (err) return res.status(500).json(err);

          if (rows.length === 0) {
            db.query(
              "INSERT INTO leave_balance (user_id, sick_leave, vacation_leave) VALUES (?, 10, 15)",
              [user.id]
            );
          }

          res.json({ success: true, user });
        }
      );
    } else {
      // MANAGER LOGIN
      res.json({ success: true, user });
    }
  });
});

/* APPLY LEAVE */
app.post("/apply-leave", (req, res) => {
  const { userId, leaveType, startDate, endDate, reason } = req.body;

  const q = `
    INSERT INTO leave_requests
    (user_id, leave_type, start_date, end_date, reason, status)
    VALUES (?, ?, ?, ?, ?, 'PENDING')
  `;

  db.query(q, [userId, leaveType, startDate, endDate, reason], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Leave Applied" });
  });
});

/* GET ALL LEAVES */
app.get("/leaves", (req, res) => {
  db.query("SELECT * FROM leave_requests", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* APPROVE / REJECT + UPDATE LEAVE BALANCE */
app.post("/update-leave", (req, res) => {
  const { id, status } = req.body;

  db.query(
    "SELECT * FROM leave_requests WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const leave = result[0];

      db.query(
        "UPDATE leave_requests SET status=? WHERE id=?",
        [status, id],
        (err) => {
          if (err) return res.status(500).json(err);

          if (status === "APPROVED") {
            const start = new Date(leave.start_date);
            const end = new Date(leave.end_date);

            const days =
              Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

            const column =
              leave.leave_type === "Sick"
                ? "sick_leave"
                : "vacation_leave";

            db.query(
              `UPDATE leave_balance 
               SET ${column} = ${column} - ? 
               WHERE user_id = ?`,
              [days, leave.user_id],
              (err) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Leave Approved & Balance Updated" });
              }
            );
          } else {
            res.json({ message: "Leave Status Updated" });
          }
        }
      );
    }
  );
});

/* ✅ STEP 4.4 – GET LEAVE BALANCE (ADD THIS) */
app.get("/leave-balance/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT * FROM leave_balance WHERE user_id=?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
