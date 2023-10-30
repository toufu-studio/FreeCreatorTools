const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("particles-container").appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const shapes = ["triangle", "rectangle"];
const particles = [];
const numParticles = 30; // パーティクルの数
const spawnInterval = 2000; // パーティクルを生成する間隔（ミリ秒）
let lastSpawnTime = 0;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.size = Math.random() * 20 + 10;
        this.speedX = (Math.random() - 0.5) * 3;
        this.speedY = (Math.random() - 0.5) * 3;
        this.fade = Math.random() * 0.005 + 0.002;
        this.alpha = 0; // パーティクル生成時に透明からフェードイン開始
        this.angle = Math.random() * Math.PI * 2; // ランダムな初期角度
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha += this.fade;

        if (this.alpha >= 1) {
            this.alpha = 1;
        }

        if (this.alpha <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.alpha = 0; // パーティクル再生成時に透明からフェードイン開始
            this.angle = Math.random() * Math.PI * 2; // ランダムな初期角度
        }
    }

    draw() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.alpha;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        if (this.shape === "triangle") {
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(-this.size, this.size);
            ctx.lineTo(this.size, this.size);
            ctx.closePath();
            ctx.stroke();
        } else if (this.shape === "rectangle") {
            ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
        }

        ctx.restore();

        ctx.globalAlpha = 1;
    }
}

function createParticles() {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function spawnParticles() {
    if (Date.now() - lastSpawnTime >= spawnInterval) {
        createParticles();
        lastSpawnTime = Date.now();
    }
    requestAnimationFrame(spawnParticles);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

createParticles();
animate();
spawnParticles();