import "../style/field.css"
import Ball from "./Ball"

function Field() {
    return (
        <div className="field">
            <div id="firstPlayer" className="player"></div>
            <div className="firstLimit"></div>
            <div className="center"></div>
            <div className="secondLimit"></div>
            <div id="secondPlayer" className="player"></div>
            <Ball></Ball>
        </div>
    )
}

export default Field