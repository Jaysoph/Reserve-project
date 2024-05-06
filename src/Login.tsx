import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./App.css";
import Input from "./components/Input";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signin } from "./api/auth";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const Myswal = withReactContent(Swal);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    
    signin({ username: inputs.username, password: inputs.password })
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.roles[0]);
          localStorage.setItem("user", response.name);
          Myswal.fire({
            html: `<i>เข้าสู่ระบบสำเร็จ</i>`,
            icon: "success",
          }).then(() => {
            navigate("/home");
          });
        } else {
          Myswal.fire({
            html: `<i>กรุณาตรวจสอบข้อมูลอีกครั้ง</i>`,
            icon: "error",
          });
        }
      })
      .catch(() => {
        if (localStorage.getItem("token")) {
          localStorage.removeItem("token");
        }
        Myswal.fire({
          html: `<i>มีบางอย่างผิดพลาด</i>`,
          icon: "error",
        });
      });
  };

  return (
    <div className="bg">
      <Link to="/">
        <div
          className="logo"
          style={{
            position: "absolute",
            top: 20,
            left: 20,
          }}
        >
          <img
            src="https://reginfo.utcc.ac.th/image/default/logo.png"
            style={{
              width: "120px",
              height: "auto",
            }}
          />
        </div>
      </Link>
      <div>
        <div style={{ marginBottom: "45px" }}>
          <h1 style={{ textAlign: "center", color: "#2E3191" }}>
            เว็บไซต์บริหารจัดการการจองห้อง
          </h1>
          <h2 style={{ textAlign: "center", color: "#9199C2" }}>
            มหาวิทยาลัยหอการค้าไทย
          </h2>
        </div>

        {/* bottom */}
        <div className="container-box">
          <div className="img-left">
            <img
              style={{
                display: "flex",
                height: "100%",
                width: "auto",
                borderRadius: "20px 0 0 20px",
              }}
              src="https://ism.utcc.ac.th/wp-content/uploads/UTCC-1-scaled.jpg"
            />
            <div className="box1" />
          </div>
          <div className="container-box2">
            <form onSubmit={handleSubmit}>
              <h1
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                กรุณาเข้าสู่ระบบ
              </h1>
              <div className="text-input">
                <Input
                  label={"Username : "}
                  type={"text"}
                  name={"username"}
                  value={inputs.username}
                  onChange={handleChange}
                />
                <Input
                  label={"Password : "}
                  type={"password"}
                  name={"password"}
                  value={inputs.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#2e3191",
                  "&:hover": {
                    backgroundColor: "green",
                    boxShadow: "none",
                  },
                }}
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
