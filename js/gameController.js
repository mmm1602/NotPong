window.addEventListener("load", () => {
    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ball variables
    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let dx = 4;
    let dy = 4;

    // Paddle variables
    let paddleHeight = 150;
    let paddleWidth = 20;
    let paddleSpeed = 10;
    let paddle0_Y = (canvas.height / 2) - paddleHeight / 2;
    let paddle1_Y = (canvas.height / 2) - paddleHeight / 2;

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle(posX, posY) {
        ctx.beginPath();
        ctx.rect(posX, posY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle(canvas.width - 100, paddle0_Y);
        drawPaddle(100, paddle1_Y);

        // Ball collision with top/bottom
        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }

        // Ball collision with right paddle
        if (
            x + ballRadius > canvas.width - 100 &&
            y > paddle0_Y &&
            y < paddle0_Y + paddleHeight
        ) {
            dx = -dx;
        }

        // Ball collision with left paddle
        if (
            x - ballRadius < 100 + paddleWidth &&
            y > paddle1_Y &&
            y < paddle1_Y + paddleHeight
        ) {
            dx = -dx;
        }

        // Update ball position
        x += dx;
        y += dy;

        requestAnimationFrame(draw);
    }

    // Handle paddle movement
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                paddle0_Y = Math.max(0, paddle0_Y - paddleSpeed);
                break;
            case "ArrowDown":
                paddle0_Y = Math.min(canvas.height - paddleHeight, paddle0_Y + paddleSpeed);
                break;
            case "w":
                paddle1_Y = Math.max(0, paddle1_Y - paddleSpeed);
                break;
            case "s":
                paddle1_Y = Math.min(canvas.height - paddleHeight, paddle1_Y + paddleSpeed);
                break;
        }
    });

    draw();
});
