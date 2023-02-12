"load resize".split(" ").forEach(function(e){
    window.addEventListener(e, () => {
    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    //Ball variables
    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = (canvas.height /2) - ballRadius;
    let dx = 1;
    let dy = -1;


    //Paddle variables
    let paddleHeight = 150;
    let paddleWidth = 20;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let paddleY = (canvas.height / 2) - paddleHeight;

    function drawBall() {
        ctx.beginPath();  
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle(posX) {
        ctx.beginPath();
        ctx.rect(posX, paddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle(canvas.width - 100);
        drawPaddle(100);

        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
        x += dx;
        y += dy;

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
    });
  });
