import { useState } from "react";
import "./App.css";
import AddRestaurants from "./components/addRestaurants";
import RestaurantDetails from "./components/restaurantDetails";

function App() {
  const [state, setState] = useState(1);
  return (
    <div className='App'>
      <div className='buttons'>
        <button
          onClick={() => {
            setState(1);
          }}
        >
          Add Restaurent
        </button>
        <button
          onClick={() => {
            setState(2);
          }}
        >
          Show Restaurent
        </button>
        {state == 1 ? <AddRestaurants /> : <RestaurantDetails />}
      </div>
    </div>
  );
}

export default App;
