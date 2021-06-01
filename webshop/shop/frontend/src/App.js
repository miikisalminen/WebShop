import Navbar from "./components/Custom/Navbar";
import Searchbar from "./components/Custom/Searchbar";
import ListingCard from "./components/Custom/ListingCard";
import Paginator from "./components/Custom/Paginator";

import ColumnContainer from "./components/Containers/ColumnContainer";
import CartContainer from "./components/Containers/CartContainer";

function App() {
  return (
    <div>
      <Navbar className="navbar" />
      <div className="App" style={{ display: "flex" }}>
        <ColumnContainer style={{ width: "70em" }}>
          <Searchbar />
          <ListingCard title="test" price="30" desc="Twenty five chars yeah" />
          <ListingCard title="test" price="30" desc="Twenty five chars yeah" />
          <ListingCard title="test" price="30" desc="Twenty five chars yeah" />
          <ListingCard title="test" price="30" desc="Twenty five chars yeah" />
          <ListingCard title="test" price="30" desc="Twenty five chars yeah" />
          <Paginator />
        </ColumnContainer>

        <CartContainer style={{ width: "30em" }}>
          <h1 style={{ textAlign: "center" }}>
            Cart:
            <br></br>
            Stinky sock
            <br></br>
            Old matress
            <br></br>
            Damp water
          </h1>
        </CartContainer>
      </div>
    </div>
  );
}

export default App;
