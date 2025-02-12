
document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
        apiKey: "AIzaSyBnCkoejLpSZ9n2CAkeJXZBy6gsgtTcHL4",
            authDomain: "clinicms-40dcc.firebaseapp.com",
            projectId: "clinicms-40dcc",
            storageBucket: "clinicms-40dcc.appspot.com",
            messagingSenderId: "68685621662",
            appId: "1:68685621662:web:e461f62b3e954a95558e8f",
            measurementId: "G-2Y2VHQ4H6R"
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();

    document.getElementById("loginForm").addEventListener("submit", async function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const device_id = navigator.userAgent; 

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            const token = await user.getIdToken();

            localStorage.setItem("firebaseToken", token);

            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: token, device_id })
            });

            const data = await response.json();
            if (response.ok) {
                alert("✅ Login successful!");
                window.location.href = "/dashboard.html"; 
            } else {
                alert(`❌ Error: ${data.message}`);
            }
        } catch (error) {
            console.error("❌ Login Error:", error);
            alert("Authentication failed. Please check your credentials.");
        }
    });
});
