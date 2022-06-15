function App() {

// This is a variable in React
const [display, setDisplay] = React.useState(60 * 20);
    return (
    <div>
    <h1>{display}</h1>  
    </div> );


}
ReactDOM.render(<App />, document.getElementById("root"))
