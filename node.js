/* =====================================
   SLIDER DRAG (HORIZONTAL SCROLL)
===================================== */

const sliders = document.querySelectorAll(".horizontal-wrapper");

sliders.forEach((slider) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.style.cursor = "grabbing";
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.style.cursor = "grab";
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
});


/* =====================================
   LIGHTBOX (KLIK GAMBAR / VIDEO)
===================================== */

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.getElementById("lightboxClose");

let wasDragging = false;

// Deteksi apakah user sedang drag slider atau benar-benar klik
sliders.forEach((slider) => {
    let downX = 0;

    slider.addEventListener("mousedown", (e) => {
        downX = e.pageX;
        wasDragging = false;
    });

    slider.addEventListener("mousemove", (e) => {
        if (Math.abs(e.pageX - downX) > 5) {
            wasDragging = true;
        }
    });
});

function openLightbox(type, src) {
    lightboxContent.innerHTML = "";

    if (type === "image") {
        const img = document.createElement("img");
        img.src = src;
        lightboxContent.appendChild(img);
    }

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

// Klik gambar desain
document.querySelectorAll(".design-image").forEach((el) => {
    el.addEventListener("click", () => {
        if (wasDragging) return;
        const src = el.getAttribute("data-full");
        openLightbox("image", src);
    });
});

// Tutup lightbox
lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeLightbox();
    }
});