const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Khởi tạo thông số xe
let car = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 50,
    width: 50,
    height: 100,
    speed: 2,
    direction: 0, // Góc quay của xe (0 là hướng lên trên)
};

// Vẽ ô tô bằng các hình chữ nhật và hình tròn
function drawCar() {
    ctx.save();
    ctx.translate(car.x + car.width / 2, car.y + car.height / 2); // Di chuyển điểm gốc đến giữa xe
    ctx.rotate(car.direction * Math.PI / 180); // Quay xe theo hướng
    ctx.translate(-(car.x + car.width / 2), -(car.y + car.height / 2)); // Trả lại vị trí ban đầu
    
    // Thân xe
    ctx.fillStyle = "blue";
    ctx.fillRect(car.x, car.y, car.width, car.height);
    
    // Cửa sổ xe
    ctx.fillStyle = "lightblue";
    ctx.fillRect(car.x + 10, car.y + 10, car.width - 20, car.height - 40);
    
    // Bánh xe (2 bánh trên và 2 bánh dưới)
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(car.x + 10, car.y + car.height - 10, 10, 0, Math.PI * 2); // Bánh xe trên trái
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(car.x + car.width - 10, car.y + car.height - 10, 10, 0, Math.PI * 2); // Bánh xe trên phải
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(car.x + 10, car.y + 10, 10, 0, Math.PI * 2); // Bánh xe dưới trái
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(car.x + car.width - 10, car.y + 10, 10, 0, Math.PI * 2); // Bánh xe dưới phải
    ctx.fill();
    
    ctx.restore();
}

// Di chuyển xe lên
function moveCar() {
    car.y -= car.speed;
}

// Cập nhật game
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveCar();
    drawCar();
    requestAnimationFrame(updateGame);
}

updateGame();

// Điều khiển xe với các phím mũi tên và phím Ctrl
document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
        car.speed = 5; // Tăng tốc khi nhấn Ctrl
    } else if (event.key === 'ArrowLeft') {
        car.direction -= 5; // Rẽ trái
    } else if (event.key === 'ArrowRight') {
        car.direction += 5; // Rẽ phải
    } else if (event.key === 'ArrowUp') {
        car.y -= car.speed; // Tiến lên
    } else if (event.key === 'ArrowDown') {
        car.y += car.speed; // Lùi xuống
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Control') {
        car.speed = 2; // Giảm tốc khi nhả phím Ctrl
    }
});
let obstacle = { x: 50, y: 50, width: 50, height: 50 };

function drawObstacle() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}
function checkCollision() {
    if (car.x < obstacle.x + obstacle.width &&
        car.x + car.width > obstacle.x &&
        car.y < obstacle.y + obstacle.height &&
        car.y + car.height > obstacle.y) {
        alert("Game Over!"); // Kết thúc game
        window.location.reload();
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveCar();
    drawCar();
    drawObstacle();
    checkCollision();
    requestAnimationFrame(updateGame);
}
let obstacles = [];

function createRandomObstacles() {
    for (let i = 0; i < 5; i++) {
        let obs = {
            x: Math.random() * (canvas.width - 50),
            y: Math.random() * (canvas.height - 50),
            width: 50,
            height: 50
        };
        obstacles.push(obs);
    }
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (car.x < obstacle.x + obstacle.width &&
            car.x + car.width > obstacle.x &&
            car.y < obstacle.y + obstacle.height &&
            car.y + car.height > obstacle.y) {
            alert("Game Over!");
            window.location.reload();
        }
    });
}
let coins = [];
let score = 0;

function createRandomCoins() {
    for (let i = 0; i < 3; i++) {
        let coin = {
            x: Math.random() * (canvas.width - 30),
            y: Math.random() * (canvas.height - 30),
            width: 30,
            height: 30
        };
        coins.push(coin);
    }
}

function drawCoins() {
    ctx.fillStyle = 'yellow';
    coins.forEach(coin => {
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.width / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function checkCoinCollection() {
    coins.forEach((coin, index) => {
        if (car.x < coin.x + coin.width &&
            car.x + car.width > coin.x &&
            car.y < coin.y + coin.height &&
            car.y + car.height > coin.y) {
            score++;
            coins.splice(index, 1); // Loại bỏ đồng tiền
        }
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveCar();
    drawCar();
    drawObstacles();
    drawCoins();
    checkCollisions();
    checkCoinCollection();
    ctx.fillText("Score: " + score, 10, 10); // Hiển thị điểm
    requestAnimationFrame(updateGame);
}

createRandomObstacles();
createRandomCoins();

