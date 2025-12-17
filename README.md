🏢 Employee Leave Management System
📌 Project Overview

The Employee Leave Management System is a web-based application designed to manage employee leave requests efficiently. The system supports role-based access control, allowing employees to apply for leave and managers to review, approve, or reject leave requests. It also tracks leave balances and displays approved leaves using a simple calendar view.

This project is developed as part of the HyScaler Software Development Apprentice/Trainee assignment using core web technologies.

🎯 Features
👤 User Authentication

Secure login for employees and managers

Role-based redirection after login

Unauthorized access prevention using client-side checks

📝 Leave Request Submission

Employees can apply for leave

Leave details include:

Leave type (Sick / Vacation)

Start date and end date

Reason for leave

Input validation to ensure complete data

✅ Leave Approval Workflow

Managers can view all employee leave requests

Approve or reject leave requests

Leave status updates dynamically

📊 Leave Balance Management

Each employee has predefined leave balances:

Sick Leave

Vacation Leave

Leave balances are automatically updated when a leave is approved

📅 Leave Calendar

Displays only approved leave requests

Helps managers visualize employee availability

Updates dynamically when leave status changes

🛠️ Technology Stack
Frontend

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Database

MySQL

🗂️ Project Structure
employee-leave-management-system/
│
├── frontend/
│   ├── index.html
│   ├── employee.html
│   ├── manager.html
│   ├── style.css
│   ├── login.js
│   ├── employee.js
│   └── manager.js
│
├── Database/
│   └── Db.js
│
├── server.js
├── package.json
├── README.md
└── .gitignore
