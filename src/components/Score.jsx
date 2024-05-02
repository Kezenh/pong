import "../style/score.css"

function Score() {
    return (
        <>
            <div className="score">
                <p id="firstPlayerScore" className="scoreBox">0</p>
                <p id="secondPlayerScore" className="scoreBox">0</p>
            </div>
            <p id="victory"></p>
        </>
    )
}

export default Score