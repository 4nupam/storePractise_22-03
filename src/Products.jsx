import React, { useEffect, useState } from "react";

export default function Products({ name }) {
  const [data, setData] = useState([]);
  const [fildata, setFilData] = useState("");
  const [filterbyprice, setFilterbyprice] = useState(false);
  const [filterbyrating, setFilterbyrating] = useState(false);
  const [filterbygreat, setfilterbyGreat] = useState(false);
  const [men, setMen] = useState(false);

  useEffect(() => {
    async function fetching() {
      try {
        let res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          console.log("Error in fetching");
        }
        let ans = await res.json();
        setData(ans);
      } catch (error) {
        console.log(error);
      }
    }
    fetching();
  }, []);

  const filterData = () => {
    let filtered = data.filter((item) =>
      item.title.toLowerCase().includes(fildata.toLowerCase())
    );

    if (filterbyprice) {
      filtered = filtered.filter(
        (item) => item.price >= 0 && item.price <= 500
      );
    }
    if (filterbyrating) {
      filtered = filtered.filter(
        (item) => item.rating.rate >= 0 && item.rating.rate <= 3
      );
    }
    if (filterbygreat) {
      filtered = filtered.filter(
        (item) => item.rating.rate >= 4 && item.rating.rate <= 5
      );
    }
    if (men) {
      filtered = filtered.filter((item) => item.category == "men's clothing");
    }

    return filtered;
  };

  return (
    <>
      <h1>This is the store of {name}</h1>
      <h2>Here is the list of products</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search here"
        onChange={(e) => setFilData(e.target.value)}
      />

      {/* Filter Buttons */}
      <div>
        <button onClick={() => setFilterbyprice(!filterbyprice)}>
          {filterbyprice ? "Show All Prices" : "Price 0-500"}
        </button>
        <button onClick={() => setFilterbyrating(!filterbyrating)}>
          {filterbyrating ? "Show All Ratings" : "Rating 0-3"}
        </button>
        <button onClick={() => setfilterbyGreat(!filterbygreat)}>
          {filterbygreat ? "Show All Ratings" : "Rating 4-5"}
        </button>
      </div>
      <div>
        {" "}
        <button onClick={() => setMen(!men)}>
          {" "}
          {men ? "show all prices" : "Men"}{" "}
        </button>
      </div>
      {/* Product List */}
      <ul>
        {filterData().length > 0 ? (
          filterData().map((e) => (
            <li key={e.id}>
              <strong>{e.title}</strong>
              <p>Price: ${e.price}</p>
              <p>Rating: {e.rating.rate} ⭐</p>
              <img src={e.image} alt={e.title} style={{ width: "100px" }} />
            </li>
          ))
        ) : (
          <p>No products found</p>
        )}
      </ul>
    </>
  );
}
