import Button from "./Button";
import styles from "./App.module.css"
import {useState, useEffect} from "react";
function Hello() {

    useEffect(() => {
        console.log("hi :)");
        return () => console.log("bye :(");
    }, []);

    return <h1>Hello </h1>
}
function App() {
    const [counter, setCounter] = useState(0);
    const onClick = () => setCounter((prev => prev + 1));
    const [keyword, setKeyword] = useState("");
    const onChange = (event) => setKeyword(event.target.value);
    const [showing, setShowing] = useState(false);
    const onShowing = () => {
        setShowing(prev => !prev);
    }
    useEffect(() => {
        console.log("i run only once");
    }, []);
    useEffect(() => {
        console.log("i run when 'keyword' changes");
    }, [keyword]);
    useEffect(() => {
        console.log("i run when 'counter' changes");
    }, [counter]);
    useEffect(() => {
        console.log("i run when 'keyword' & 'counter' changes");
    }, [keyword,counter]);
    return (
        <>
            <div className="App">
                {showing ? <Hello/> : null}
                <button onClick={onShowing}>{showing ? "HIDE" : "SHOW"}</button>
            </div>
            <div>
                <input value={keyword} onChange={onChange} type="text" placeholder="search here..."/>
                <h1 className={styles.title}>Welcome back !!!{counter}</h1>
                <Button text={"Continue"}/>
                <button onClick={onClick}>click me</button>
            </div>
        </>
    )
}

export default App;