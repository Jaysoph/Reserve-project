import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  const userName = localStorage.getItem("user");
  return (
    <nav
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Link to="/" style={{ flex: 1 }}>
        <div className="logo">
          <img
            src="https://reginfo.utcc.ac.th/image/default/logo.png"
            style={{
              width: "120px",
              height: "auto",
            }}
          />
        </div>
      </Link>
      <div
        style={{
          fontSize: "21px",
          color: "#2E3191",
          fontWeight: "bold",
          padding: "10px",
        }}
      >
        ผู้ใช้: {userName}
      </div>
      <Link to="/">
        <Button
          style={{
            backgroundColor: "#dd2424",
            width: "180px",
          }}
          variant="contained"
          size="small"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
          }}
        >
          ออกจากระบบ
        </Button>
      </Link>
    </nav>
  );
}

export default Header;
