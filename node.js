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

// Kumpulkan semua gambar desain jadi satu daftar galeri
const galleryImages = Array.from(
    document.querySelectorAll(".design-image")
).map((el) => el.getAttribute("data-full"));

let currentIndex = 0;

function renderLightboxImage() {
    lightboxContent.innerHTML = "";

    const img = document.createElement("img");
    img.src = galleryImages[currentIndex];
    lightboxContent.appendChild(img);
}

function openLightbox(index) {
    currentIndex = index;
    renderLightboxImage();

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    renderLightboxImage();
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    renderLightboxImage();
}

// Klik gambar desain
document.querySelectorAll(".design-image").forEach((el, index) => {
    el.addEventListener("click", () => {
        if (wasDragging) return;
        openLightbox(index);
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
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    } else if (e.key === "ArrowRight") {
        showNext();
    } else if (e.key === "ArrowLeft") {
        showPrev();
    }
});

// Swipe geser di layar HP / trackpad
let touchStartX = 0;
let touchEndX = 0;

lightboxContent.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightboxContent.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 50) {
        if (diff < 0) {
            showNext();
        } else {
            showPrev();
        }
    }
});