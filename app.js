function App() {

// This is a variable in React
const [display, setDisplay] = React.useState(25 * 60);
const [breakTime, setBreakTime] = React.useState(5 * 60);
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


    return (
    <div>
        <Length 
        title={"break length"}
        changeTime={null}
        type={"break"}
        time={breakTime}
        formatTime={formatTime}
        />

        <Length 
        title={"session length"}
        changeTime={null}
        type={"session"}
        time={null}
        formatTime={formatTime}
        />

        <h1>{formatTime(display)}</h1>  
    </div> );

}

// This is a component, which means is a package to push into the code
function Length({title, changeTime, type, time, formatTime}) {
    return (
        <div>
            <h3 id ="break-label">{title}</h3>
            <div className = "time-sets">
                <button className ="btn-small deep-purple lighten-2">
                    <i className="material-icons">arrow_downward</i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button className ="btn-small deep-purple lighten-2">
                    <i className="material-icons">arrow_upward</i>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"))
