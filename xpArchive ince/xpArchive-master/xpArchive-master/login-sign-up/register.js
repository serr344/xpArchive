import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const fullname = document.getElementById("fullname").value;
    const birthyear = document.getElementById("birthyear").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]:checked');
    const interests = Array.from(interestCheckboxes).map(cb => cb.value);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const userData = {
                username: username,
                fullname: fullname,
                birthyear: birthyear,
                interests: interests,
                email: email,
                uid: user.uid,
                memberSince: new Date().toISOString().split("T")[0]
            };

            // Tüm kullanıcı havuzunu güncelle
            let allUsers = JSON.parse(localStorage.getItem("allXpUsers")) || {};
            allUsers[email] = userData;
            localStorage.setItem("allXpUsers", JSON.stringify(allUsers));

            // Aktif kullanıcıyı da ayrı olarak kaydet
            localStorage.setItem("xpUser", JSON.stringify(userData));

            alert("Hesap oluşturuldu!");
            window.location.href = "../index.html";
        })
        .catch((error) => {
            alert("Hata: " + error.message);
        });
});
