import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../APIs/auth.api";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// Material Dashboard 2 React components
//import { MDBRow } from "mdb-react-ui-kit";
function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [errData, setErrData] = useState({
    errUsername: "err",
    errPassword: "err",
    errCommon: "",
  });
  const validateUsername = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errUsername: "Username is required",
      });
    } else {
      setErrData({
        ...errData,
        errUsername: "",
      });
    }
  };
  const validatePassword = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errPassword: "Password is required",
      });
    } else {
      setErrData({
        ...errData,
        errPassword: "",
      });
    }
  };

  // const [position, setPosition] = useState(0);
  // useEffect(() => {
  //   localStorage.setItem("POSITION", position);
  // }, [position]);

  const navigate = useNavigate();
  const handleSignIn = () => {
    if (!errData.errUsername && !errData.errPassword) {
      setErrData({
        ...errData,
        errCommon: "",
      });
      // console.log('start login')
      login(data, navigate, setErr);
      //console.log('end login')
    } else {
      setErrData({
        ...errData,
        errCommon: "You must enter correct and full information",
      });
    }
  };
  return (
    <div className="login-container">
      <div class="account section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6">
              <div class="login-form border p-5">
                <div class="text-center heading">
                  <h2 class="mb-2">Đăng nhập</h2>
                  <p class="lead">
                    Bạn chưa có tài khoản?{" "}
                    <a href="/signup">Tạo tài khoản</a>
                  </p>
                </div>

                <form action="#">
                  <div class="form-group mb-4">
                    <label for="#">Tài khoản</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nhập tài khoản"
                      onChange={(e) => {
                        setData({
                          ...data,
                          username: e.target.value,
                        });
                        validateUsername(e.target.value);
                      }}
                    />
                  </div>
                  {errData.errUsername && errData.errUsername !== "err" ? (
                    <p style={{ color: "red" }}>{errData.errUsername}!!!</p>
                  ) : null}
                  <div class="form-group">
                    <label for="#">Mật khẩu</label>
                    {/* <a class="float-right" href="">
                      Forget password?
                    </a> */}
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Nhập mật khẩu"
                      onChange={(e) => {
                        setData({
                          ...data,
                          password: e.target.value,
                        });
                        validatePassword(e.target.value);
                      }}
                    />
                  </div>
                  {errData.errPassword && errData.errPassword !== "err" ? (
                    <p style={{ color: "red" }}>{errData.errPassword}!!!</p>
                  ) : null}

                  {/* <MDBRow>
                    <FormControl fullWidth style={{ padding: "5px 13px" }}>
                      <InputLabel
                        id="demo-simple-select-label"
                        style={{ marginLeft: "15px" }}
                      >
                        Position
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position}
                        label="Position"
                        sx={{ height: "45px" }}
                        onChange={(e) => {
                          setPosition(e.target.value);
                        }}
                      >
                        <MenuItem value={0}>User</MenuItem>
                        <MenuItem value={1}>Seller</MenuItem>
                      </Select>
                    </FormControl>
                  </MDBRow> */}
                  {errData.errCommon ? (
                    <p style={{ color: "red" }}>{errData.errCommon}!!!</p>
                  ) : null}
                  {err ? <p style={{ color: "red" }}>{err}!!!</p> : null}
                  <a
                    class="btn btn-main mt-3 btn-block" 
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleSignIn();
                    }}
                  >
                    Đăng nhập
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
