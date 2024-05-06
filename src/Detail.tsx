import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import { getDetail } from "./api/detail";
import { IRoomDetailData } from "./interface/detail";

function Detail() {
  const [detail, setDetail] = useState<IRoomDetailData[]>([]);

  useEffect(() => {
    getDetail()
      .then((response) => setDetail(response))
      .catch((error) => console.error(error));
  }, []);
  console.log(detail);

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "60px",
        }}
      >
        <h1
          style={{
            display: "flex",
            width: "357px",
            height: "120px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "0 0 10px 10px",
            boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
            fontSize: "60px",
            color: "#2E3191",
          }}
        >
          อาคารที่ 24
        </h1>
        {detail.map((detail, index) => (
          <div
            key={`build-${index}`}
            className={`container ${index % 2 === 0 ? "" : "row-reverse"}`}
          >
            <img
              src={detail.imgUrl}
              style={{
                width: "900px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
              }}
            />
            <div
              style={{
                padding: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "30px",
                color: "#2E3191",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                }}
              >
                ห้องที่ {detail.roomNumber}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "black",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                {detail.facilities}
              </div>
              <Link
                // /booking?id=1
                to={{
                  pathname: "/booking",
                  search: `?id=${detail.roomNumber}`,
                }}
                className="button-74"
                role="button"
              >
                จอง
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;
