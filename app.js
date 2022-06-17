function App() {

// This is a variable in React
const [display, setDisplay] = React.useState(25 * 60);
const [breakTime, setBreakTime] = React.useState(5 * 60);
const [sessionTime, setSessionTime] = React.useState(25 * 60);
const [timerOn, setTimerOn] = React.useState(false);
// This is a javascript Function
const formatTime = (time) => {
    let minutes = Math.floor(time/60); // this is 25
    let seconds = time % 60; // this is 0  
    // If minutes are less than 10 we push 0 (because it's 0 + minutes) THIS IS MY CODE
    if (minutes < 10 && seconds < 10) {
        return "0" + minutes + ":" + "0" + seconds;
    } else if (minutes < 10) {
        return  "0" + minutes + ":" + seconds;
    } else if (seconds < 10) {
        return minutes + ":" + "0" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
    //  (minutes < 10 ? "0" + minutes : minutes) +
    //  ":" +
    //  (seconds < 10 ? "0" + seconds : seconds);
} 

const changeTime = (amount, type) => {
    if (type == "break") {
        // to not let go beyond 0 and amount because when we push up we have a number > 0 so it runs the code
        if (breakTime <= 60 && amount < 0 ) {
            return;
        }
        setBreakTime((prev) => prev + amount);
    } else {
        if (sessionTime <= 60 && amount < 0) {
            return;
        }
        setSessionTime((prev) => prev + amount);
        if(!timerOn) {
            setDisplay(sessionTime + amount);
        }
    }
};

    return (
    <div className="center-align" id ="big">
        <h1>Pomodoro Clock</h1>
        <div className ="dual-container">
        <Length 
        title={"break length"}
        changeTime={changeTime}
        type={"break"}
        time={breakTime}
        formatTime={formatTime}
        />
        <Length 
        title={"session length"}
        changeTime={changeTime}
        type={"session"}
        time={sessionTime}
        formatTime={formatTime}
        />
        </div>
        <h1>{formatTime(display)}</h1>  
        <button className="btn-large deep-purple lighten-2">
            {timerOn ? (
                <i className="material-icons">pause_circle_filled</i>
            ) : (
                <i className="material-icons">play_circle_filled</i>
            )}
        </button>
    </div> );

}

// This is a component, which means is a package to push into the code
function Length({title, changeTime, type, time, formatTime}) {
    return (
        <div>
            <h3 id ="break-label">{title}</h3>
            <div className = "time-sets">
                <button className ="btn-small deep-purple lighten-2"
                 onClick={() => changeTime(-60, type)}>
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button className ="btn-small deep-purple lighten-2"
                 onClick={() => changeTime(60, type)}>
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"))
