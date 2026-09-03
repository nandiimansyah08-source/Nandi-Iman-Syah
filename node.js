function startPortfolio() {
    const karya = document.querySelector(".intro");
    if (karya) { karya.scrollIntoView({ behavior: "smooth" }); }
}
function showOptions() {
    alert("PORTFOLIO\n\nDesign & Video Editing");
}
function exitPortfolio() {
    alert("Terima kasih sudah berkunjung!");
}
const sliders = document.querySelectorAll(".horizontal-wrapper");
sliders.forEach((slider) => {
    let isDown = false; let startX; let scrollLeft;
    slider.addEventListener("mousedown",(e) => {
        isDown = true; slider.style.cursor = "grabbing";
        startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave",() => { isDown = false; slider.style.cursor = "grab"; });
    slider.addEventListener("mouseup",() => { isDown = false; slider.style.cursor = "grab"; });
    slider.addEventListener("mousemove",(e) => {
        if (!isDown) return; e.preventDefault();
        const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
});