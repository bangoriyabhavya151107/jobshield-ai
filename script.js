
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a link.
const navigationLinks = navLinks.querySelectorAll("a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    });
});

console.log("JobShield AI homepage loaded successfully!");
