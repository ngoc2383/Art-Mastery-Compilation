document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.getElementById("login");
    const registerButton = document.getElementById("register");
    if (loginButton) {
        loginButton.addEventListener("click", function() {
        console.log("Login button clicked");
        //loginButton.transform = "scale(1.5)";
        })
    }
    registerButton.addEventListener("click", function() {
        console.log("Register button clicked")
    })
    let pageName = window.location.pathname.replace(/\//g, '') || 'home';
    console.log(pageName);
    sectionScrolling(pageName);
})

function sectionScrolling(page) {
    var sections = document.querySelectorAll(`.${page}-sections`);
    console.log(sections);
    if (sections && sections.length !== 0) {
        let isScrolling = false;
        var current = 0;

        window.addEventListener('wheel', e => {
            const blockDiv = document.querySelector('#authorization');
            if (blockDiv && blockDiv.contains(e.target)) {
                if ((e.deltaY > 0 && blockDiv.scrollTop + blockDiv.clientHeight < blockDiv.scrollHeight) ||
                    (e.deltaY < 0 && blockDiv.scrollTop > 0)) {
                        e.preventDefault();
                        horizontalScrolling(blockDiv);
                    return;
                }
                return
            }
            
            e.preventDefault(); // stop default scroll
            if (isScrolling) return;
            isScrolling = true;
            let lastSection = null;

            if (e.deltaY > 0 && current < sections.length - 1) {
                current++; // scroll down
                lastSection = sections[current];
                
            } else if (e.deltaY < 0 && current > 0) {
                current--; // scroll up
                lastSection = sections[current];
            }

            if (lastSection) {
                lastSection.style.transition = "transform 0.5s ease";
                lastSection.style.transform = "scale(1.05)";
            }
            
            sections[current].scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Release scrolling lock after animation
            setTimeout(() => {
                isScrolling = false;
                lastSection.style.transform = "";
            }, 400);
        }, { passive: false });
    }
}

function horizontalScrolling(container) {
    console.log("horizontalScrolling");
}

function loginOrRegisterFunction(methodType=login) {

}