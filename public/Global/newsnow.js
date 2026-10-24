// this is a new js file for snow effect

const NUMBER_OF_SNOWFLAKES = 300;
const MAX_SNOWFLAKE_SIZE = 15;
const MAX_SNOWFLAKE_SPEED = 2;
const SNOWFLAKE_COLOR = '#ddd';
// const SNOWFLAKE_COLOR = "#000000";
const snowflakes = [];

const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0px';
canvas.style.pointerEvents = 'none';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const createSnowflake = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
    color: SNOWFLAKE_COLOR,
    speed: Math.random() * MAX_SNOWFLAKE_SPEED + 3,
});

const drawSnowflake = snowflake => {
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI*2);
    ctx.fillStyle = snowflake.color;
    ctx.fill();
    ctx.closePath();
};


const updateSnowflake = snowflake => {
    snowflake.y += snowflake.speed;
    if (snowflake.y > canvas.height) {
        Object.assign(snowflake, createSnowflake());
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
        updateSnowflake(snowflake);
        drawSnowflake(snowflake);
    });

    requestAnimationFrame(animate)
}

for (let i=0; i<NUMBER_OF_SNOWFLAKES; i++) {
    snowflakes.push(createSnowflake());
}

animate();