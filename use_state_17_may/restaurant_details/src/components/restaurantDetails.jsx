import React from "react";
import { useState, useEffect } from "react";
import "./restaurantDetails.css";
const RestaurantDetails = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filter, setFilter] = useState("");
  const [method, setMethod] = useState("all");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:8080/restaurants")
      .then((d) => d.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.log(err));
  }

  const handleSort = (e) => {
    if (e.target.value == "HL") {
      setRestaurants(
        [...restaurants].sort((a, b) => b.cost_for_two - a.cost_for_two)
      );
    } else if (e.target.value == "LH") {
      setRestaurants(
        [...restaurants].sort((a, b) => a.cost_for_two - b.cost_for_two)
      );
    }
  };

  return (
    <div>
      <div>
        <select
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option value=''>select</option>
          <option value='4'>Above 4</option>
          <option value='3'>Above 3</option>
          <option value='2'>Above 2</option>
          <option value='1'>Above 1</option>
        </select>
        <select onChange={handleSort} name='' id='sort_select'>
          <option value=''>select</option>
          <option value='HL'>high to low</option>
          <option value='LH'>low to high</option>
        </select>
        <button
          onClick={() => {
            setMethod("cash");
          }}
          style={{ marginRight: "10px" }}
        >
          Cash Only
        </button>
        <button
          onClick={() => {
            setMethod("card");
          }}
          style={{ marginRight: "10px" }}
        >
          Card Only
        </button>
        <button
          onClick={() => {
            setMethod("all");
          }}
        >
          All
        </button>
      </div>
      {restaurants
        .filter((el) => el.ratings > Number(filter))
        .filter((el) => el.payment_methods !== method)
        .map((r, i) => (
          <div
            onClick={() => {
              console.log(method);
            }}
            key={i}
            className='container'
          >
            <div className='image'>
              <img src={r.url} alt='' />
            </div>
            <div className='details'>
              <h2>{r.name}</h2>
              {r.categories.map((cat, index) => (
                <span key={index} className='gray'>
                  {cat}
                </span>
              ))}
              <p className='gray'>cost ₹{r.cost_for_one} for one</p>
              <p>
                {r.payment_methods.cash
                  ? "Accept cash payments only"
                  : "Accept online payments only"}
              </p>
              <div className='payment_opt'>
                {!r.payment_methods.cash && (
                  <input
                    type='radio'
                    name='payment_method'
                    id='card'
                    value='card'
                  />
                )}
                {!r.payment_methods.cash && <label htmlFor='card'>Card</label>}
                {!r.payment_methods.cash && (
                  <input
                    type='radio'
                    name='payment_method'
                    id='upi'
                    value='upi'
                  />
                )}
                {!r.payment_methods.cash && <label htmlFor='upi'>UPI</label>}

                {r.payment_methods.cash && (
                  <input
                    type='radio'
                    name='payment_method'
                    id='cash'
                    value='cash'
                  />
                )}
                {r.payment_methods.cash && <label htmlFor='cash'>Cash</label>}
              </div>
            </div>
            <div className='feedbacks'>
              <div className='rating'>
                <h2>{r.ratings}</h2>
              </div>
              <p className='vr'>{r.votes} votes</p>
              <p className='vr'>{r.reviews} reviews</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RestaurantDetails;
