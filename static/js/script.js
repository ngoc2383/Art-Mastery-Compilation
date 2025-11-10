document.addEventListener("DOMContentLoaded", function() {
    loginOrRegisterFunction();

    let pageName = window.location.pathname.replace(/\//g, '') || 'home';
    console.log(pageName);
    sectionScrolling(pageName);

    if (!window.hamMenuInitialized) {
        hamMenuFunc();
        window.hamMenuInitialized = true;
    }

    welcomeScript();
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

function loginOrRegisterFunction() {
    buttons = document.querySelectorAll(".authorization-button");
    if (buttons && buttons.length !== 0) {
        buttons.forEach(button => {
            button.addEventListener('click', e => {
                e.preventDefault();
                if (!button.dataset.listener) {
                    if (button.id == "login" || button.id == "showLogin") {
                        console.log(`1. ${button.id} clicked`);
                    } else {
                        console.log(`2. ${button.id} clicked`);
                    }/*
                    button.style.transform = "translate(-3px, 3px)";
                    button.style.transition = "0.1s ease";

                    setTimeout(function() {
                        button.style.transform = "translate(3px, -3px)";
                        button.style.transition = "0.1s ease";
                    }, 100);*/
                }
                button.dataset.listener = "true";
            }); 
        });
    } 
    
}

function hamMenuFunc () {
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');

    hamMenu.addEventListener("click", function () {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
        console.log("Ham menu clicked")
    })
}

function welcomeScript() {
    const typedScript = document.querySelector(".typed");
    const buttons = document.querySelectorAll(".welcome-button"); // selects all buttons
    typedScript.addEventListener("animationend", e => {
        if (e.animationName === "typing") {
            buttons.forEach(button => button.classList.add("show"));
        }
    })
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            if (!button.dataset.listener) {
                console.log(button.id);
                if (button.id === "yes-index") {
                    console.log("hello");
                } 
                else {
                    console.log("hi");
                }
                button.dataset.listener = "true";
            }
        });
    });

}

