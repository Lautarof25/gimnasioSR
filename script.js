const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".main-menu a");
const bmiForm = document.querySelector("#bmi-form");
const bmiResult = document.querySelector("#bmi-result");
const bmiValue = document.querySelector("#bmi-value");
const bmiCategory = document.querySelector("#bmi-category");
const homeVideo = document.querySelector(".home-video");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const connection = navigator.connection;

if (!prefersReducedMotion && !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType)) {
    window.addEventListener("load", () => {
        const loadHomeVideo = () => {
            const homeVideoSource = homeVideo.querySelector("source");
            homeVideoSource.src = homeVideoSource.dataset.src;
            homeVideo.load();
        };

        if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(loadHomeVideo, { timeout: 3000 });
        } else {
            window.setTimeout(loadHomeVideo, 1200);
        }
    }, { once: true });
}

const deferredVideos = document.querySelectorAll("video[data-poster]");
if ("IntersectionObserver" in window) {
    const videoPosterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.poster = entry.target.dataset.poster;
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "200px 0px" });

    deferredVideos.forEach((video) => videoPosterObserver.observe(video));
} else {
    deferredVideos.forEach((video) => {
        video.poster = video.dataset.poster;
    });
}

menuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        topbar.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && topbar.classList.contains("menu-open")) {
        topbar.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.focus();
    }
});

bmiForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const weight = Number(bmiForm.elements.weight.value);
    const height = Number(bmiForm.elements.height.value) / 100;
    const bmi = weight / (height * height);
    const category = bmi < 18.5
        ? "Por debajo del rango de referencia"
        : bmi < 25
            ? "Dentro del rango de referencia"
            : bmi < 30
                ? "Por encima del rango de referencia"
                : "Rango de obesidad según IMC";

    bmiValue.textContent = bmi.toFixed(1).replace(".", ",");
    bmiCategory.textContent = category;
    bmiResult.hidden = false;
});

if (!prefersReducedMotion) {
    const loadAnimations = () => {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "https://unpkg.com/aos@2.3.1/dist/aos.css";
        stylesheet.onload = () => {
            const script = document.createElement("script");
            script.src = "https://unpkg.com/aos@2.3.1/dist/aos.js";
            script.onload = () => {
                window.AOS.init({
                    debounceDelay: 50,
                    throttleDelay: 99,
                    delay: 200,
                });
                document.documentElement.classList.add("aos-ready");
            };
            script.onerror = () => {
                stylesheet.remove();
                console.error("No se pudo cargar AOS; las animaciones quedan desactivadas.");
            };
            document.body.append(script);
        };
        stylesheet.onerror = () => {
            console.error("No se pudo cargar el CSS de AOS; las animaciones quedan desactivadas.");
        };
        document.head.append(stylesheet);
    };

    window.addEventListener("load", () => {
        if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(loadAnimations, { timeout: 2000 });
        } else {
            window.setTimeout(loadAnimations, 1200);
        }
    }, { once: true });
}

