import { useEffect } from 'react';
import "../style/controls.css"

function Controls() {

    let firstPlayer;
    let secondPlayer;
    let firstPlayerGoUp = false;
    let firstPlayerGoDown = false;
    let firstPlayerGoLeft = false;
    let firstPlayerGoRight = false;
    let secondPlayerGoUp = false;
    let secondPlayerGoDown = false;
    let secondPlayerGoLeft = false;
    let secondPlayerGoRight = false;
    let verticalSpeed = 1;
    let firstPlayerLimits = {
        left : 0.5,
        right : 44
    };
    let secondPlayerLimits = {
        left : 55.5,
        right : 99
    };

    function handleKeyDown(event) {
        if (event.code === "KeyA") {
            firstPlayerGoLeft = true;
        }
        if (event.code === "KeyW") {
            firstPlayerGoUp = true;
        }
        if (event.code === "KeyD") {
            firstPlayerGoRight = true;
        }
        if (event.code === "KeyS") {
            firstPlayerGoDown = true;
        }
        if (event.code === "ArrowLeft") {
            event.preventDefault();
            secondPlayerGoLeft = true;
        }
        if (event.code === "ArrowUp") {
            event.preventDefault();
            secondPlayerGoUp = true;
        }
        if (event.code === "ArrowRight") {
            event.preventDefault();
            secondPlayerGoRight = true;
        }
        if (event.code === "ArrowDown") {
            event.preventDefault();
            secondPlayerGoDown = true;
        }
    }

    function handleKeyUp(event) {
        if (event.code === "KeyA") {
            firstPlayerGoLeft = false;
        }
        if (event.code === "KeyW") {
            firstPlayerGoUp = false;
        }
        if (event.code === "KeyD") {
            firstPlayerGoRight = false;
        }
        if (event.code === "KeyS") {
            firstPlayerGoDown = false;
        }
        if (event.code === "ArrowLeft") {
            event.preventDefault();
            secondPlayerGoLeft = false;
        }
        if (event.code === "ArrowUp") {
            event.preventDefault();
            secondPlayerGoUp = false;
        }
        if (event.code === "ArrowRight") {
            event.preventDefault();
            secondPlayerGoRight = false;
        }
        if (event.code === "ArrowDown") {
            event.preventDefault();
            secondPlayerGoDown = false;
        }
    }

    function movePlayerUp(player) {
        let top = parseFloat(player.style.top.slice(0, -1));
        if (!(top < 1)) {
            top = top - verticalSpeed;
            player.style.top = `${top}%`;
        }
    }

    function movePlayerRight(player) {
        let left = parseFloat(player.style.left.slice(0, -1));
        let rightLimit;
        if (player.id === "firstPlayer") {
            rightLimit = firstPlayerLimits.right;
        } else {
            rightLimit = secondPlayerLimits.right;
        }
        if (!(left > rightLimit)) {
            left = left + verticalSpeed / 2;
            player.style.left = `${left}%`;
        }
    }

    function movePlayerDown(player) {
        let top = parseFloat(player.style.top.slice(0, -1));
        if (!(top > 89)) {
            top = top + verticalSpeed;
            player.style.top = `${top}%`;
        }
    }

    function movePlayerLeft(player) {
        let left = parseFloat(player.style.left.slice(0, -1));
        let leftLimit;
        if (player.id === "firstPlayer") {
            leftLimit = firstPlayerLimits.left;
        } else {
            leftLimit = secondPlayerLimits.left;
        }
        if (!(left < leftLimit)) {
            left = left - verticalSpeed / 2;
            player.style.left = `${left}%`;
        }
    }

    function movePlayers() {
        if (firstPlayerGoUp) {
            movePlayerUp(firstPlayer);
        }
        if (firstPlayerGoRight) {
            movePlayerRight(firstPlayer);
        }
        if (firstPlayerGoDown) {
            movePlayerDown(firstPlayer);
        }
        if (firstPlayerGoLeft) {
            movePlayerLeft(firstPlayer);
        }
        if (secondPlayerGoUp) {
            movePlayerUp(secondPlayer)
        }
        if (secondPlayerGoRight) {
            movePlayerRight(secondPlayer);
        }
        if (secondPlayerGoDown) {
            movePlayerDown(secondPlayer);
        }
        if (secondPlayerGoLeft) {
            movePlayerLeft(secondPlayer);
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        firstPlayer = document.getElementById("firstPlayer");
        secondPlayer = document.getElementById("secondPlayer");
        let playerMotion;
        clearInterval(playerMotion)
        playerMotion = setInterval(movePlayers, 10);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    /*return (
        <div className="controls">
            <button className="control">🡴</button>
            <button className="control">🡱</button>
            <button className="control">🡵</button>
            <button className="control">🡰</button>
            <button className="control white"></button>
            <button className="control">🡲</button>
            <button className="control">🡷</button>
            <button className="control">🡳</button>
            <button className="control">🡶</button> 
        </div>
    )*/

    return (
        <div className="controls"></div>
    )
}

export default Controls