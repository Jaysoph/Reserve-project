import { Link } from "react-router-dom";
import Header from "./components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "end",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url('https://www.utcc.ac.th/wp-content/uploads/2023/06/%E0%B8%A1.%E0%B8%AB%E0%B8%AD%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%84%E0%B8%97%E0%B8%A2-1-1024x788.jpg')",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            height: "100vh",
            width: "100%",
            position: "absolute",
            zIndex: "1",
          }}
        ></div>
        <div
          style={{
            width: "730px",
            height: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            zIndex: "2",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              paddingRight: "66px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "185px",
                height: "65px",
                backgroundColor: "#2e3191",
                borderRadius: "10px 10px 0 0",
                color: "white",
                fontSize: "36px",
              }}
            >
              <p>ห้องประชุม</p>
            </div>
            <div
              style={{
                height: "181px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "0 20px 0 0",
                fontSize: "96px",
                fontWeight: "bold",
                color: "#2e3191",
              }}
            >
              <p>อาคารที่ 24 </p>
            </div>
            <div
              style={{
                display: "flex",
                height: "50px",
                backgroundColor: "#e2e2e2",
                borderRadius: "0 0 20px 20px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "15px",
              }}
            >
              <p>
                ห้องประชุมที่สามารถจองได้จะอยู่ชั้นที่ 3 และ 4
                ของตึกโดยแต่ละชั้นจะมีจำนวนห้องและที่นั่งแตกต่างกัน
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "26px",
              }}
            >
              <Link to={`/detail`} className="button-73" role="button">
                รายละเอียดเพิ่มเติม
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
