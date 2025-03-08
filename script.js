document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ duration: 1200, once: false });

    const toggleBtn = document.getElementById("toggle-btn");
    const sidebar = document.getElementById("sidebar");
    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });

    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    window.addEventListener("scroll", debounce(() => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    }, 100));

    new Typed('#typed-name', {
        strings: ["Yusuf Bhathiyare"],
        typeSpeed: 300,
        backSpeed: 150,
        loop: false
    });

    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00e6ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#8b5cf6", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Theme Toggle
    const modeToggle = document.getElementById("mode-toggle");
    const htmlRoot = document.getElementById("html-root");
    const isDarkMode = localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme");
    
    if (isDarkMode) {
        htmlRoot.setAttribute("data-theme", "dark");
        modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        htmlRoot.setAttribute("data-theme", "light");
        modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    modeToggle.addEventListener("click", () => {
        const currentTheme = htmlRoot.getAttribute("data-theme");
        if (currentTheme === "dark") {
            htmlRoot.setAttribute("data-theme", "light");
            modeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "light");
        } else {
            htmlRoot.setAttribute("data-theme", "dark");
            modeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "dark");
        }
    });

    // Modal Functionality
    const modal = document.getElementById("detail-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalDetails = document.getElementById("modal-details");
    const toggleDetails = document.getElementById("toggle-details");
    const closeModalBtn = document.getElementById("close-modal");
    const closeModalIcon = document.getElementById("close-modal-icon");
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.getAttribute("data-title");
            const description = card.getAttribute("data-description");
            let details = [];

            try {
                details = JSON.parse(card.getAttribute("data-details") || "[]");
            } catch (e) {
                console.error("Error parsing data-details for card:", card, e);
                details = [];
            }

            if (!title || (!description && details.length === 0)) {
                console.log("No meaningful data to display for card:", card);
                return;
            }

            modalTitle.textContent = title || "No Title";
            modalDescription.textContent = description || "No description available.";
            modalDetails.innerHTML = details.length > 0 
                ? details.map(item => `<li>${item}</li>`).join("") 
                : "<li>No additional details available.</li>";

            modal.classList.remove("hidden");
            modalDetails.classList.add("collapsed"); // Start collapsed
            toggleDetails.textContent = "Show More";
            closeModalBtn.focus(); // Focus on close button for accessibility
            console.log("Modal opened with data:", { title, description, details });
        });
    });

    toggleDetails.addEventListener("click", () => {
        modalDetails.classList.toggle("collapsed");
        toggleDetails.textContent = modalDetails.classList.contains("collapsed") ? "Show More" : "Show Less";
    });

    const closeModal = () => {
        modal.classList.add("hidden");
    };

    closeModalBtn.addEventListener("click", closeModal);
    closeModalIcon.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard Accessibility
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });

    modal.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            const focusable = modal.querySelectorAll("button, [tabindex]");
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
});