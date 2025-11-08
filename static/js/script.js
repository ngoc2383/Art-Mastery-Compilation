document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login");

    loginButton.addEventListener("click", function() {
        console.log("Login button clicked");
        //loginButton.transform = "scale(1.5)";
    })

    sectionScrolling();
})

function sectionScrolling() {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let directionUp = false;
    var current = 0;

    window.addEventListener('wheel', e => {
        e.preventDefault(); // stop default scroll
        if (isScrolling) return;

        isScrolling = true;
        let lastSection = null;

        if (e.deltaY > 0 && current < sections.length - 1) {
            current++; // scroll down
            lastSection = sections[current];
            
        } else if (e.deltaY < 0 && current > 0) {
            current--; // scroll up
            directionUp = true;
            lastSection = sections[current];
        }

        if (lastSection) {
            lastSection.style.transition = "transform 0.5s ease";
            lastSection.style.transform = "scale(1.25)";
        }
        
        
        sections[current].scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Release scrolling lock after animation
        setTimeout(() => {
            isScrolling = false;
            lastSection.style.transform = "";
        }, 400);
    }, { passive: false });
}