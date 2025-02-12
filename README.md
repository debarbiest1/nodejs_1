# Clinic Management system 

A full-stack web application built with Node.js, Express, PostgreSQL, Firebase Authentication, and JWT for secure user management and role-based access control.

This project allows patients, doctors, and administrators to manage medical appointments efficiently.

✔️ Secure user authentication using Firebase Auth<br>
✔️ Role-based access control (Patients, Doctors, Admins)<br>
✔️ CRUD operations for Patients, Doctors, and Appointments<br>
✔️ PostgreSQL database with SQL injection protection<br>
✔️ JWT-based session management with Firebase tokens<br>
✔️ Input validation middleware for secure API calls<br>
✔️ Error handling for robust API responses<br>
✔️ Frontend integration for real-time data updates<br>
✔️ Deployed with Render<br>

📂 Clinic Management System<br>
│── 📁 controllers            # Handles business logic<br>
│   ├── authController.js     # Firebase authentication logic (JWT & bcrypt)<br>
│   ├── patientController.js  # CRUD for Patients<br>
│   ├── doctorController.js   # CRUD for Doctors<br>
│   ├── appointmentController.js # CRUD for Appointments<br>
│── 📁 routes                 # API routes<br>
│   ├── patientRoutes.js      <br>
│   ├── doctorRoutes.js       <br>
│   ├── appointmentRoutes.js  <br>
│── 📁 models                 # Database models <br>
│   ├── patientModel.js       <br>
│   ├── doctorModel.js        <br>
│   ├── appointmentModel.js   <br>
│── 📁 middlewares            # Security and validation <br>
│   ├── firebaseAuthMiddleware.js # Firebase JWT token verification<br>
│   ├── validateInputs.js      # Request validation <br>
│   ├── errorHandlers.js       # Global error handling<br>
│── 📁 data                   <br>
│   ├── database.js            # PostgreSQL database connection <br>
│── 📁 public                  # Frontend assets (HTML, CSS, JS) <br>
│   ├── index.html <br>
│   ├── login.html <br>
│   ├── adminpanel.html <br>
│── 📁 config                 <br>
│   ├── .env                   # Environment variables (Firebase API, Database URL)<br>
│── package.json               # Dependencies<br>
│── index.js                   # Main server file<br>


### Why I Chose These Technologies?
✅ PostgreSQL (Relational Database)<br>
Strong data integrity & consistency<br>
Supports complex relationships (Doctors, Patients, Appointments)<br>
Secure against SQL injection with parameterized queries<br>
✅ Firebase Authentication<br>
Token-based authentication (JWT)<br>
Secure login with Google/Facebook authentication<br>
Scalable & managed authentication<br>
✅ JWT (JSON Web Token) in Firebase<br>
Each user gets a unique JWT token upon login<br>
Tokens are stored securely and used for authentication<br>
Device-specific token management prevents multiple unauthorized logins<br>



### Security Measures in the Project
1. Preventing SQL Injection

Used parameterized queries ($1, $2) to prevent SQL injection.<br>
Implemented input validation middleware to sanitize user input.<br>
2. Handling JWT Tokens & Preventing Multiple Logins<br>

Firebase Authentication issues JWT tokens per login.<br>
Tokens are device-specific and stored in PostgreSQL.<br>
When a user logs in from a new device, the old token is revoked.<br>
3. Password Encryption

Firebase hashes passwords internally, so no plaintext passwords are stored.<br>
If passwords were manually stored, Bcrypt would be used for hashing and verification.<br>
This ensures secure authentication, protected database access, and encrypted user data.<br>

How to use Firebase API for this project?<br>

1. Go to Firebase Console. Click Add Project, follow the setup, and enable Email/Password under Authentication > Sign-in Method.
2. In Project Settings, click Add App (web icon </>). Copy the generated firebaseConfig object and put to your code.
3. Go to the Authentication and then to Users, where you can add users who can register as an admin.
![image](https://github.com/user-attachments/assets/082709b2-f480-40b3-989c-aa43c0813ae5)

4. Error response example(https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnCkoejLpSZ9n2CAkeJXZBy6gsgtTcHL4
)
```
{
    "email": "debarbiestl@gmail.com",
    "password": "11112222",
    "returnSecureToken": true
}
```

![image](https://github.com/user-attachments/assets/9653fc7f-20c3-4761-91c6-e093409ed9ab)
5. Right input example
```
{
    "email": "kkapammell@gmail.com",
    "password": "11112222",
    "returnSecureToken": true
}
```

![image](https://github.com/user-attachments/assets/1c0f1009-efbd-4368-8418-4f941fbfccb2)
6. Tests for routes:
For Get:
![image](https://github.com/user-attachments/assets/25db21b8-5eed-4705-8f1f-338a9c6f8d72)

![image](https://github.com/user-attachments/assets/32c94573-cad2-4ed2-89c7-dc16ea0d7a04)

For Post:
![image](https://github.com/user-attachments/assets/7b58a5c5-dd07-4887-9c1b-b91fa9f1d91a)


For Delete:
![image](https://github.com/user-attachments/assets/4c9d312c-ff0e-4048-b027-30221f964667)


For Put:
![image](https://github.com/user-attachments/assets/4a1c4a02-2ace-4550-984b-b8086b3ec664)

Future Improvements <br>
🔹 Two-Factor Authentication (2FA) <br>
🔹 Email Notifications for Appointments<br>
🔹 Admin Dashboard for User Management<br>
🔹 Analytics & Reporting System<br>



My tests for middlewares:
![image](https://github.com/user-attachments/assets/e622f792-1bc2-4b14-9791-30e76794d860)
![image](https://github.com/user-attachments/assets/49fe51b9-1205-4a13-9404-538a14cfbd22)

