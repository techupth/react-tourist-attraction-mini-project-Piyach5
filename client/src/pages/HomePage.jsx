import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [tripsList, setTripsList] = useState([]);
  const [searchText, setSearchText] = useState("");
  let searchTag = searchText;

  const getTripsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchText}`
      );
      setTripsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTripsData();
  }, [searchText]);

  const handleClick = (tag) => {
    setSearchText((searchTag += tag + " "));
  };

  return (
    <>
      <header className="title">
        <h1>ไปเที่ยวไหนดี</h1>
      </header>
      <div className="search-box-container">
        <label htmlFor="search-box" className="search-box-label">
          ค้นหาที่เที่ยว
        </label>
        <input
          id="search-box"
          name="search-box"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
      </div>
      <div className="trips-list" key={0}>
        {tripsList.map((item) => {
          return (
            <div className="trips-card" key={item.eid}>
              <img
                className="card-photo"
                src={item.photos[0]}
                alt="Tourist Attraction Image"
              />
              <div className="trips-information">
                <h3 className="card-title">
                  <a className="title-link" href={item.url} target="_blank">
                    {item.title}
                  </a>
                </h3>
                <p className="card-description">{item.description}</p>
                <a href={item.url} target="_blank">
                  อ่านต่อ
                </a>
                <div className="tag-list">
                  หมวด{" "}
                  {item.tags
                    .filter((tag, index) => index !== item.tags.length - 1)
                    .map((tag, index) => (
                      <span
                        className="tag"
                        key={index}
                        onClick={() => {
                          handleClick(tag);
                        }}
                      >
                        <a href="#">{tag}</a>
                      </span>
                    ))}
                  และ
                  <span className="tag" key={item.tags.length - 1}>
                    <a href="#">{item.tags[item.tags.length - 1]}</a>
                  </span>
                </div>
                <div className="photo-list">
                  {item.photos
                    .filter((photo, index) => index !== 0)
                    .map((photo, index) => (
                      <img
                        className="photo"
                        src={photo}
                        alt="Tourist Attraction Image"
                        key={index}
                      />
                    ))}
                </div>
              </div>
              <button
                className="copy-link"
                title={`copy link`}
                onClick={() => navigator.clipboard.writeText(item.url)}
              >
                🔗
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
