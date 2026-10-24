const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const smallScreen = window.matchMedia('(max-width: 700px)').matches;

const backgroundTheme = {
    name: "SnowLight",
    fpsLimit: 240,
    // keep the canvas inside #tsparticles; global.css pins it to the screen
    fullScreen: {
        enable: false,
    },
    particles: {
        number: {
            value: smallScreen ? 50 : 100,
            density: {
                enable: true,
                width: 800,
                height: 500,
            },
        },
        paint: {
            fill: {
                color: {
                    value: "#FFFFFF",
                },
            },
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
        },
        wobble: {
            enable: true,
            distance: 5,
            speed: 1,
        },
    },
    background: {
        color: {
            value: "transparent",
        },
    },
};



// loadFull registers the bundle's features, then tsParticles.load takes one object with the container id and the options
const tp = document.getElementById("tsparticles");
if (tp && window.tsParticles && window.loadFull) {
    (async () => {
        await loadFull(tsParticles);
        await tsParticles.load({ id: "tsparticles", options: backgroundTheme });
    })();
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
