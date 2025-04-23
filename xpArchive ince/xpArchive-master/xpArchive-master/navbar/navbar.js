class Navbar {
    constructor(containerSelector = '#navbar-container', htmlPath = '/xpArchive-master/navbar/navbar.html') {
      this.container = document.querySelector(containerSelector);
      this.htmlPath = htmlPath;
      this.user = JSON.parse(localStorage.getItem("xpUser"));
      this.init();
    }
  
    async init() {
      try {
        const response = await fetch(this.htmlPath);
        const html = await response.text();
        this.container.innerHTML = html;
  
        // HTML yüklendikten sonra olayları bağla
        this.setupDOMEvents();
      } catch (err) {
        console.error("Navbar yüklenirken hata:", err);
      }
    }
  
    setupDOMEvents() {
      const signupLink = document.getElementById("signup-link");
      const loginLink = document.getElementById("login-link");
      const logoutLink = document.getElementById("logout-link");
      const toggle = document.getElementById("community-toggle");
      const dropdown = document.querySelector(".community-dropdown");
  
      // Giriş durumu kontrolü
      if (this.user && typeof this.user === "object") {
        signupLink.style.display = "none";
        loginLink.style.display = "none";
        logoutLink.style.display = "inline";
      } else {
        signupLink.style.display = "inline";
        loginLink.style.display = "inline";
        logoutLink.style.display = "none";
      }
  
      // Logout işlemi
      logoutLink?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("xpUser");
        window.location.href = "/xpArchive-master/index.html";
      });
  
      // Dropdown menüsü
      toggle?.addEventListener("click", (e) => {
        e.preventDefault();
        dropdown.classList.toggle("active");
      });
  
      // Dropdown dışına tıklanınca kapanması
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target.id !== "community-toggle") {
          dropdown.classList.remove("active");
        }
      });
    }
  }
  
  // Sayfa yüklendiğinde otomatik çalıştır
  document.addEventListener("DOMContentLoaded", () => {
    new Navbar(); // Varsayılan container ve path kullanılır
  });
  