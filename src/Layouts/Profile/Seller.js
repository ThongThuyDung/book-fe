import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from "mdb-react-ui-kit";
import { getDistrict, getProfile, updateProfile } from "../../APIs/profile.api";
import { getLocalStorage, STORAGE } from "../../Utils/storage";
import axios from "axios";
import baseUrl from "../../APIs/config";
import { ToastContainer, toast } from "react-toastify";

export default function Seller() {
  const notify = (value) => toast(value);
  const [dataProfile, setDataProfile] = useState({
    name: "",
    address: "",
    gender: "",
    userId: JSON.parse(getLocalStorage(STORAGE.USER_DATA)).userId,
    file: null,
  });
  const [errData, setErrData] = useState({
    errName: "err",
    errAddress: "err",
    errGender: "err",
    errFile: "err",
    errCommon: "",
  });
  const validateName = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errName: "Name is required",
      });
    } else {
      setErrData({
        ...errData,
        errName: "",
      });
    }
  };
  const validateAdress = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errAddress: "Address is required",
      });
    } else {
      setErrData({
        ...errData,
        errAddress: "",
      });
    }
  };
  const validateGender = (value) => {
    if (value === "") {
      setErrData({
        ...errData,
        errGender: "Gender is required",
      });
    } else {
      setErrData({
        ...errData,
        errGender: "",
      });
    }
  };
  const validateFile = (value) => {
    if (value.length === 0) {
      setErrData({
        ...errData,
        errFile: "File ID card is required",
      });
    } else {
      setErrData({
        ...errData,
        errFile: "",
      });
    }
  };

  const handleRegisterToSeller = () => {
    var bodyFormData = new FormData();
    if (
      !errData.errName &&
      !errData.errAddress &&
      !errData.errGender &&
      !errData.errFile
    ) {
      setErrData({
        ...errData,
        errCommon: "",
      });
      bodyFormData.append("userId", dataProfile.userId);
      bodyFormData.append("name", dataProfile.name);
      bodyFormData.append("gender", dataProfile.gender);
      bodyFormData.append("address", dataProfile.address);
      bodyFormData.append("idCards", dataProfile.file);
      
      axios({
        method: "post",
        url: `${baseUrl}seller/register`,
        data: bodyFormData,
        headers: {
          Authorization: `${getLocalStorage(STORAGE.USER_TOKEN)}`,
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .then((data) => {
          notify("Register seller successfully!");
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrData({
        ...errData,
        errCommon: "You must enter correct and full information",
      });
    }
  };

  return (
    <section style={{ backgroundColor: "rgb(253, 253, 253)" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          {/* <MDBCol lg="4"></MDBCol> */}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow display="flex">
                  <MDBCol lg="2">
                    <MDBCardText>Full Name: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          name: e.target.value,
                        });
                        validateName(e.target.value);
                      }}
                    ></MDBInput>
                    {errData.errName && errData.errName !== "err" ? (
                      <p style={{ color: "red" }}>{errData.errName}!!!</p>
                    ) : null}
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol lg="2">
                    <MDBCardText>Address: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          address: e.target.value,
                        });
                        validateAdress(e.target.value);
                      }}
                    ></MDBInput>
                    {errData.errAddress && errData.errAddress !== "err" ? (
                      <p style={{ color: "red" }}>{errData.errAddress}!!!</p>
                    ) : null}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol lg="2">
                    <MDBCardText>Gender: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          gender: e.target.value,
                        });
                        validateGender(e.target.value);
                      }}
                    ></MDBInput>
                    {errData.errGender && errData.errGender !== "err" ? (
                      <p style={{ color: "red" }}>{errData.errGender}!!!</p>
                    ) : null}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol lg="2">
                    <MDBCardText>File ID Card: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      type="file"
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          file: e.target.files[0],
                        });
                        validateFile(e.target.files);
                      }}
                    ></MDBInput>
                    {errData.errFile && errData.errFile !== "err" ? (
                      <p style={{ color: "red" }}>{errData.errFile}!!!</p>
                    ) : null}
                    {errData.errCommon && errData.errCommon !== "err" ? (
                      <p style={{ color: "red" }}>{errData.errCommon}!!!</p>
                    ) : null}
                  </MDBCol>
                </MDBRow>
                <hr></hr>
                <div class="text-center cart-buttons mt-3">
                  <a
                    // href="cart"
                    class="btn btn-small btn-main btn-inline-block"
                    onClick={() => {
                      handleRegisterToSeller();
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Register
                  </a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
