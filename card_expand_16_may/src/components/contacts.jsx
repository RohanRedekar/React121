import React, { useState } from "react";
import "./module.css";

const Contacts = () => {
  const data = [
    {
      img: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
      name: "john",
      email: "john@gmail.com",
      phone: "9798537258",
    },
    {
      img: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
      name: "max",
      email: "max@gmail.com",
      phone: "9798537258",
    },
    {
      img: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
      name: "ben",
      email: "ben@gmail.com",
      phone: "9798537258",
    },
    {
      img: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
      name: "harry",
      email: "harry@gmail.com",
      phone: "9798537258",
    },
    {
      img: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
      name: "tony",
      email: "tony@gmail.com",
      phone: "9798537258",
    },
  ];

  const [state, setState] = useState(false);
  const [index, setIndex] = useState("");

  return (
    <div className='container'>
      {data.map((e, i) => (
        <div
          onClick={() => {
            setState(!state), setIndex(i);
          }}
          key={i.toString()}
          className='flexbox'
        >
          <div className='img_div'>
            <img src={e.img} alt='' />
          </div>
          <div className='desc'>
            <h2>{e.name}</h2>
            <p>{e.email}</p>
            <p
              style={
                state == true && index == i
                  ? { display: "block" }
                  : {
                      display: "none",
                    }
              }
            >
              {e.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
