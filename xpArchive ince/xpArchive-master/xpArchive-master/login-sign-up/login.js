import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCi252bzSzrWbGWc_pdg3Zq1EqIQocYdrw",
  authDomain: "xparchive-9b1d5.firebaseapp.com",
  projectId: "xparchive-9b1d5",
  storageBucket: "xparchive-9b1d5.appspot.com",
  messagingSenderId: "1057386650203",
  appId: "1:1057386650203:web:e35318437e4af24afcbd7e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const allUsers = JSON.parse(localStorage.getItem("allXpUsers")) || {};
            const userData = allUsers[email];

            if (userData) {
                localStorage.setItem("xpUser", JSON.stringify(userData));
                alert("Giriş başarılı!");
                window.location.href = "../index.html";
            } else {
                alert("Kayıtlı kullanıcı bilgisi bulunamadı. Lütfen yeniden kayıt olun.");
            }
        })
        .catch((error) => {
            alert("Hata: " + error.message);
        });
});
