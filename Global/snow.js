const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const smallScreen = window.matchMedia('(max-width: 700px)').matches;

const backgroundTheme = {
    name: "SnowLight",
    fpsLimit: 240,
    particles: {
        number: {
            value: smallScreen ? 50 : 100,
            density: {
                enable: true,
                area: 400
            },
        },
        color: {
            value: "#FFFFFF",
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 1,
        },
        size: {
            value: 2,
        },
        move: {
            angle: {
                offset: 0,
                value: 100,
            },
            enable: true,
            speed: 2,
            direction: "bottom",
            straight: false,
            wobble: true,
        },
        wobble: {
            enable: true,
            distance: 5,
            speed: 1,
        },
        zIndex: {
            value: {
                min: 0,
                max: 100,
            },
            opacityRate: 10,
            sizeRate: 10,
            velocityRate: 10,
        },
    },
    background: {
        color: {
            value: "transparent",
        },
    },
};



// tsParticles.load has two parameters, the first one is the id of the container, the second one is an object with the options
const tp = document.getElementById("tsparticles");
if (tp && window.tsParticles) {
    tsParticles.load("tsparticles", backgroundTheme);
}

// the theme itself is set by the inline script in each page's <head>, so there is no flash on load
function switchTheme(e) {
    const theme = e.target.checked ? 'dark' : 'light';
    try {
        localStorage.setItem('theme', theme);
    } catch (err) { }
    document.documentElement.setAttribute('data-theme', theme);
}

if (toggleSwitch) {
    toggleSwitch.checked = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleSwitch.addEventListener('change', switchTheme, false);
}

// keep the snow in view while scrolling
let canvasHeight = 0;

function updateCanvasHeight() {
    canvasHeight = document.documentElement.scrollHeight - window.innerHeight;
}

if (tp) {
    updateCanvasHeight();
    window.addEventListener("resize", updateCanvasHeight);
    window.addEventListener("load", updateCanvasHeight);
    window.addEventListener("scroll", () => {
        const scrollAmount = window.scrollY - 8;
        if (Math.round(scrollAmount) <= canvasHeight) {
            tp.style.transform = `translateY(${scrollAmount}px)`;
        }
    });
}
