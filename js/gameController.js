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
    let dx = 2;
    let dy = -2;


    //Paddle variables
    let paddleHeight = 150;
    let paddleWidth = 20;
    let paddle0_Y = (canvas.height / 2) - paddleHeight;
    let paddle1_Y = (canvas.height / 2) - paddleHeight;


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

        window.addEventListener("keydown", (e) => {
            if(e.key == "ArrowUp"){
                paddle0_Y -= 0.05;
            }
            else if(e.key == "ArrowDown"){
                paddle0_Y += 0.05;
            }
        })
        window.addEventListener("keydown", (e) => {
            if(e.key == "w"){
                paddle1_Y -= 0.05;
            }
            else if(e.key == "s"){
                paddle1_Y += 0.05;
            }
        })

        if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
        else if (x > (canvas.width -100) -paddleWidth/2 || x < 100 + paddleWidth) {
            dy = -dy;
            dx = -dx;
        } 
        else if(x - dx < 100 + (paddleWidth)){
            dx = --dx;
        }
        x += dx;
        y += dy;

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
    });
  });
