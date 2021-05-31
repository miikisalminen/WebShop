import Test from "./components/Custom/Test";
import ColumnContainer from "./components/Containers/ColumnContainer"

function App() {
  return (
    <div className="App"style={{display: "flex"}}>
      <ColumnContainer style={{width: "70em"}}>
      <header className="App-header">
        <h1>Hello this works yes</h1>
        <a href="/account/logout">Log out</a>
      </header>
      </ColumnContainer>

      <ColumnContainer style={{width: "30em"}}>
      <Test />
      <p>ja tääl olis sitte niiku</p>
      </ColumnContainer>
    </div>
  );
}

export default App;
