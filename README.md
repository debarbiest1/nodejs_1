#Clinic Management system 

How to use Firebase API for this project?

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

