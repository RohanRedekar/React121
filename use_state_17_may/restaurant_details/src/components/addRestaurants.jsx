import React, { useState } from "react";
import "./addRestaurents.css";

const AddRestaurants = () => {
  const [restaurants, setRestaurents] = useState({
    name: "",
    url: "",
    payment_methods: {
      card: false,
      cash: false,
      upi: false,
      all: true,
    },
    ratings: "",
    votes: "",
    reviews: "",
    cost_for_one: "",
    categories: [],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let res = fetch("http://localhost:8080/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurants),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleChange = (e) => {
    if (e.target.name == "categories") {
      let val = e.target.value.split(",");
      setRestaurents({ ...restaurants, categories: val });
    } else if (e.target.type == "checkbox") {
      let payment_methods = { ...restaurants.payment_methods };
      if (e.target.checked) {
        if (e.target.name == "card") {
          payment_methods.card = true;
          setRestaurents({ ...restaurants, payment_methods });
        }
        if (e.target.name == "cash") {
          payment_methods.cash = true;
          setRestaurents({ ...restaurants, payment_methods });
        }
        if (e.target.name == "upi") {
          payment_methods.upi = true;
          setRestaurents({ ...restaurants, payment_methods });
        }
      }
    } else {
      const { name, value } = e.target;
      setRestaurents({ ...restaurants, [name]: value });
    }
  };
  return (
    <div className='form_container'>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Restaurant Name</p>
          <input onChange={handleChange} name='name' />
        </div>
        <div>
          <p>url</p>
          <input onChange={handleChange} placeholder='url' name='url' />
        </div>
        <div>
          <p>payment methods</p>
          <input
            onChange={handleChange}
            type='checkbox'
            name='card'
            value={true}
          />
          <span>card</span>
          <input
            onChange={handleChange}
            type='checkbox'
            name='cash'
            value={true}
          />
          <span>cash</span>
          <input
            onChange={handleChange}
            type='checkbox'
            name='upi'
            value={true}
          />
          <span>upi</span>
        </div>
        <div>
          <p>ratings</p>
          <input onChange={handleChange} type='text' name='ratings' />
        </div>
        <div>
          <p>votes</p>
          <input onChange={handleChange} type='number' name='votes' />
        </div>
        <div>
          <p>reviews</p>
          <input onChange={handleChange} type='number' name='reviews' />
        </div>
        <div>
          <p>Cost for one</p>
          <input onChange={handleChange} type='number' name='cost_for_one' />
        </div>
        <div>
          <p>categories</p>
          <input onChange={handleChange} type='text' name='categories' />
        </div>
        <input type='submit' />
      </form>
    </div>
  );
};

export default AddRestaurants;
