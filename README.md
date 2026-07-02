**Online Public Complaint Management System**

**Project Description**

The Online Public Complaint Management System is a web-based application developed to simplify the process of registering, managing, and tracking public complaints. The system provides separate login modules for Customers, Departments, and Administrators, ensuring secure access and role-based functionality.

Citizens can submit complaints related to different government departments such as Police, Transport, Health, Electricity, and others. Each complaint is assigned a unique Complaint ID automatically (e.g., CM2026-1) and is stored in the MySQL database.

The Administrator manages the entire system by monitoring complaint statistics through a dashboard, viewing all complaints, comparing current month's complaints with the previous month's complaints, and calculating the complaint growth percentage. The administrator is also responsible for creating login credentials for department users.

Department users can log in using the credentials provided by the administrator. They can view only the complaints assigned to their department, update the complaint status (Pending, In Progress, Completed), and manage complaint resolution.

The application uses OTP-based authentication for customer login to provide secure access before submitting complaints.

**Modules**
**1. Customer Module**
Login using Mobile Number and OTP
Register new complaints
Automatic Complaint ID generation
Submit complaints to selected department
View complaint details
**2. Department Module**
Login using username and password
View department-specific complaints
Update complaint status
Manage complaint resolution
**3. Admin Module**
Secure Admin Login
View dashboard analytics
Total complaints
Current month complaints
Previous month complaints
Monthly complaint growth percentage
View all complaints
Create Department User accounts
Manage department login credentials



**Technologies Used**
**Frontend**
HTML5
CSS3
Bootstrap 5
JavaScript
**Backend**
Node.js
Express.js
Spring Boot (Department User Management Module)
**Database**
MySQL
**APIs**
REST APIs
Fetch API
**Tools**
Visual Studio Code
MySQL Workbench
Postman
Git 


**Database Tables**
complaints

Stores all customer complaints.

Fields:

id
complaint_id
complaint_desc
district
department
status
created_at

**department_users**

Stores department login credentials created by the admin.

**Fields:**

id
department_name (or department)
username
password

**Key Features**
OTP-based customer authentication
Role-based login (Customer, Department, Admin)
Automatic Complaint ID generation
Department-wise complaint assignment
Complaint status tracking
Admin analytics dashboard
Monthly complaint comparison
Growth percentage calculation
Real-time data retrieval from MySQL
REST API integration
Spring Boot integration for Department User Management



**Workflow**
Customer logs in using Mobile Number and OTP.
Customer submits a complaint by selecting a district and department.
Complaint is stored in the MySQL database with a unique Complaint ID.
Administrator monitors all complaints through the dashboard.
Administrator creates login credentials for department users.
Department user logs in with the assigned credentials.
Department user views only their department's complaints.
Department user updates complaint status to Pending, In Progress, or Completed.
All updates are reflected instantly in the database and admin dashboard.
