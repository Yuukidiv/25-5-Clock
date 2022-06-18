function App() {

// This is a variable in React
const [display, setDisplay] = React.useState(25 * 60);
const [breakTime, setBreakTime] = React.useState(5 * 60);
const [sessionTime, setSessionTime] = React.useState(25 * 60);
const [timerOn, setTimerOn] = React.useState(false);
const [onBreak, setOnBreak] = React.useState(false);
const [breakAudio, setBreakAudio] = React.useState(
    new Audio("./Sound.mp3")
);
const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
}
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

const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if(!timerOn) {
        let interval = setInterval(() => {
            date = new Date().getTime();
            if (date > nextDate) {
                setDisplay(prev => {
                    if(prev <= 0 && !onBreakVariable) {
                        playBreakSound();
                        onBreakVariable=true;
                        setOnBreak(true)
                        return breakTime;
                    } else if (prev <= 0 && onBreakVariable) {
                        playBreakSound();
                        onBreakVariable=false;
                        setOnBreak(false)
                        return sessionTime;
                    }
                    return prev -1;
                });
                nextDate += second;
            }
        }, 30);
        localStorage.clear();
        localStorage.setItem('interval-id', interval);
    }
    if(timerOn) {
        clearInterval(localStorage.getItem('interval-id'));
    }

    setTimerOn(!timerOn);
}

const resetTime = () => {
    setDisplay(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
} 

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
        <h3>{onBreak ? "Break" : "Session"}</h3>
        <h1>{formatTime(display)}</h1>  
        <button className="btn-large deep-purple lighten-2" onClick={controlTime}>
            {timerOn ? (
                <i className="material-icons">pause_circle_filled</i>
            ) : (
                <i className="material-icons">play_circle_filled</i>
            )}
        </button>
        <button className="btn-large deep-purple lighten-2" onClick={resetTime}>
            <i className="material-icons">replay</i>
        </button>
    </div> );

}

// This is a component, which means is a package to push into the code
function Length({title, changeTime, type, time, formatTime}) {
    return (
        <div>
            <h3 id ="break-label">{title}</h3>
            <div className = "time-sets">
                <button id ="break-decrement" className ="btn-small deep-purple lighten-2"
                 onClick={() => changeTime(-60, type)}>
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button id="session-increment" className ="btn-small deep-purple lighten-2"
                 onClick={() => changeTime(60, type)}>
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"))
