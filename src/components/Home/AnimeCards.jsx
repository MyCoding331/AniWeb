import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/index.scss";

function AnimeCards(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}api/${props.criteria}?page=1&count=${props.count}`
    );
    setLoading(false);
    setData(res.data.data.Page.media);
  }
  return (
    <div className="anime-container">
      {/* {loading && <AnimeCardsSkeleton />} */}
      {!loading && (
        <div className="anime">
          {data.map((item, i) => (
            <>
              <div className="card" key={item.i}>
                <Link
                  to={
                    "search/" +
                    (item.title.userPreferred !== null
                      ? item.title.userPreferred
                      : item.title.romaji)
                  }
                >
                  <img
                    src={item.coverImage.large}
                    alt={item.title.english}
                    effect="opacity"
                    width={"100%"}
                    height={"100%"}
                    // use normal <img> attributes as props
                  />
                  <p>
                    {item.title.english !== null
                      ? item.title.english
                      : item.title.romaji}
                  </p>
                </Link>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnimeCards;
