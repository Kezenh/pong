import "../style/ball.css"
import { useEffect } from 'react';

function Ball() {

    let ballTimer;
    let ball;
    let firstPlayer;
    let secondPlayer;
    let ballTop;
    let ballLeft;
    let ballWidth = 1;
    let verticalSpeed;
    let horizontalSpeed;
    let firstPlayerGoUp = false;
    let firstPlayerGoDown = false;
    let secondPlayerGoUp = false;
    let secondPlayerGoDown = false;
    let firstPlayerToServe;
    let firstPlayerScore;
    let secondPlayerScore;
    let firstPlayerScoreDOM;
    let secondPlayerScoreDOM;
    let victory;
    const verticalSpeedDefault = 0;
    const horizontalSpeedDefault = 5;

    function clearBallTimer() {
        clearInterval(ballTimer);
    }

    function handleKeyDown(event) {
        if (event.code === "KeyA") {
            //firstPlayerGoLeft = true;
        }
        if (event.code === "KeyW") {
            firstPlayerGoUp = true;
        }
        if (event.code === "KeyD") {
            //firstPlayerGoRight = true;
        }
        if (event.code === "KeyS") {
            firstPlayerGoDown = true;
        }
        if (event.code === "ArrowLeft") {
            event.preventDefault();
            //secondPlayerGoLeft = true;
        }
        if (event.code === "ArrowUp") {
            event.preventDefault();
            secondPlayerGoUp = true;
        }
        if (event.code === "ArrowRight") {
            event.preventDefault();
            //secondPlayerGoRight = true;
        }
        if (event.code === "ArrowDown") {
            event.preventDefault();
            secondPlayerGoDown = true;
        }
    }

    function handleKeyUp(event) {
        if (event.code === "KeyA") {
            //firstPlayerGoLeft = false;
        }
        if (event.code === "KeyW") {
            firstPlayerGoUp = false;
        }
        if (event.code === "KeyD") {
            //firstPlayerGoRight = false;
        }
        if (event.code === "KeyS") {
            firstPlayerGoDown = false;
        }
        if (event.code === "ArrowLeft") {
            event.preventDefault();
            //secondPlayerGoLeft = false;
        }
        if (event.code === "ArrowUp") {
            event.preventDefault();
            secondPlayerGoUp = false;
        }
        if (event.code === "ArrowRight") {
            event.preventDefault();
            //secondPlayerGoRight = false;
        }
        if (event.code === "ArrowDown") {
            event.preventDefault();
            secondPlayerGoDown = false;
        }
        if (event.code === "Enter") {
            resetGame();
        }
    }

    function moveBall() {
        if (horizontalSpeed > 0) {
            for (let i = 0; i < horizontalSpeed; i++) {
                moveBallHorizontally(true)
            }
        } else {
            for (let i = 0; i < -horizontalSpeed; i++) {
                moveBallHorizontally(false)
            }
        }
        if (verticalSpeed > 0) {
            for (let i = 0; i < verticalSpeed; i++) {
                moveBallVertically(true)
            }
        } else {
            for (let i = 0; i < -verticalSpeed; i++) {
                moveBallVertically(false)
            }
        }
    }

    function checkColission(player) {
        if (((ballLeft >= parseFloat(player.style.left.slice(0, -1)) && ballLeft <= parseFloat(player.style.left.slice(0, -1)) + parseFloat(player.style.width.slice(0, -1))) || (ballLeft + ballWidth >= parseFloat(player.style.left.slice(0, -1)) && ballLeft + ballWidth <= parseFloat(player.style.left.slice(0, -1)) + parseFloat(player.style.width.slice(0, -1)))) && ((ballTop >= parseFloat(player.style.top.slice(0, -1)) && ballTop <= parseFloat(player.style.top.slice(0, -1)) + parseFloat(player.style.height.slice(0, -1))) || (ballTop + ballWidth + ballWidth >= parseFloat(player.style.top.slice(0, -1)) && ballTop + ballWidth + ballWidth <= parseFloat(player.style.top.slice(0, -1)) + parseFloat(player.style.height.slice(0, -1))))) {
            return true
        }
        return false
    }

    function moveBallHorizontally(ballGoRight) {
        if (ballGoRight) {
            if (checkColission(secondPlayer)) {
                if (secondPlayerGoUp) {
                    verticalSpeed = verticalSpeed - 1;
                } else if (secondPlayerGoDown) {
                    verticalSpeed = verticalSpeed + 1;
                }
                horizontalSpeed = -horizontalSpeed - 1;
            } else if (ballLeft < 99 && ballLeft > 0) {
                ball.style.left = `${ballLeft}%`;
                ballLeft = ballLeft + 0.1;
            } else if (ballLeft > 99) {
                player1Wins();
            }
        } else {
            if (checkColission(firstPlayer)) {
                if (firstPlayerGoUp) {
                    verticalSpeed = verticalSpeed - 1;
                } else if (firstPlayerGoDown) {
                    verticalSpeed = verticalSpeed + 1;
                }
                horizontalSpeed = -horizontalSpeed + 1;
            } else if (ballLeft < 99 && ballLeft > 0) {
                ball.style.left = `${ballLeft}%`;
                ballLeft = ballLeft - 0.1;
            } else if (ballLeft < 0) {
                player2Wins();
            } 
        }
    }

    function moveBallVertically(ballGoDown) {
        ball.style.top = `${ballTop}%`;
        if (ballGoDown) {
            if (ballTop > 98) {
                verticalSpeed = -verticalSpeed;
            }
            ballTop = ballTop + 0.1;
        } else {
            if (ballTop < 0) {
                verticalSpeed = -verticalSpeed;
            }
            ballTop = ballTop - 0.1;
        }
    }

    function player1Wins() {
        firstPlayerScore++;
        firstPlayerScoreDOM.innerText = firstPlayerScore;
        checkWinner();
        clearBallTimer();
        resetBall();
    }

    function player2Wins() {
        secondPlayerScore++;
        secondPlayerScoreDOM.innerText = secondPlayerScore;
        checkWinner();
        clearBallTimer();
        resetBall();
    }

    function checkWinner() {
        if (firstPlayerScore > 5 && firstPlayerScore > secondPlayerScore) {
            firstPlayerScoreDOM.style.color = "red";
            if (firstPlayerScore > 6 && firstPlayerScore > secondPlayerScore + 1) {
                victory.innerText = "Player 1 wins ! Press enter to start a new game.";
            }
        } else if (secondPlayerScore > 5 && secondPlayerScore > firstPlayerScore) {
            secondPlayerScoreDOM.style.color = "red";
            if (secondPlayerScore > 6 && secondPlayerScore > firstPlayerScore + 1) {
                victory.innerText = "Player 2 wins ! Press enter to start a new game.";
            }
        } else {
            firstPlayerScoreDOM.style.color = "white";
            secondPlayerScoreDOM.style.color = "white";
        }
    }

    function resetBall() {
        if (firstPlayerToServe) {
            ballTop = 49;
            ballLeft = 30;
            verticalSpeed = verticalSpeedDefault;
            horizontalSpeed = horizontalSpeedDefault;
        } else {
            ballTop = 49;
            ballLeft = 70;
            verticalSpeed = verticalSpeedDefault;
            horizontalSpeed = -horizontalSpeedDefault;
        }
        ball.style.top = `${ballTop}%`;
        ball.style.left = `${ballLeft}%`;
        firstPlayer.style.top = "45%";
        firstPlayer.style.left = "25%";
        firstPlayer.style.width = "0.5%";
        firstPlayer.style.height = "10%";
        secondPlayer.style.top = "45%";
        secondPlayer.style.left = "74.5%";
        secondPlayer.style.width = "0.5%";
        secondPlayer.style.height = "10%";
        firstPlayerToServe = !firstPlayerToServe;
        clearBallTimer();
        ballTimer = setInterval(moveBall, 10);
    }

    function resetGame() {
        firstPlayerScoreDOM.innerText = 0;
        secondPlayerScoreDOM.innerText = 0;
        victory.innerText = "";
        firstPlayerToServe = true;
        firstPlayerScore = 0;
        secondPlayerScore = 0;
        resetBall();
    }
    
    useEffect(() => {
        ball = document.getElementById("ball");
        firstPlayer = document.getElementById("firstPlayer");
        secondPlayer = document.getElementById("secondPlayer");
        victory = document.getElementById("victory");
        firstPlayerScoreDOM = document.getElementById("firstPlayerScore");
        secondPlayerScoreDOM = document.getElementById("secondPlayerScore");
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        resetGame();
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);
    
    return (
        <div id="ball" className="ball"></div>
    )
}

export default Ball