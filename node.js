/* =====================================
   START
===================================== */

function startPortfolio() {

    const karya = document.querySelector(".intro");

    if (karya) {

        karya.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================
   OPTIONS
===================================== */

function showOptions() {

    alert(
        "PORTFOLIO\n\n" +
        "Design & Video Editing"
    );

}


/* =====================================
   EXIT
===================================== */

function exitPortfolio() {

    alert(
        "Terima kasih sudah berkunjung!"
    );

}