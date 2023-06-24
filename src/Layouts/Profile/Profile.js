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
import { ToastContainer, toast } from "react-toastify";

export default function ProfilePage() {
  const notify = (value) => toast(value);
  const [listDictrict, setListDistrict] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [dataProfile, setDataProfile] = useState({
    name: "",
    phone: "",
    birthDate: "",
    address: "",
    district_id: 0,
  });
  const [errBirthDay, setErrBirthDay] = useState("");
  const validateBirthDay = (value) => {
    // if (
    //   !"^(0[1-9]|1[012])[-/.](0[1-9]|[12][0-9]|3[01])[-/.](19|20)\\d\\d$".test(
    //     value
    //   )
    // ) {
    //   setErrBirthDay("Please choose valid birthday");
    // } else {
    //   setErrBirthDay("");
    // }
  };
  useEffect(() => {
    getDistrict(setListDistrict);
    getProfile(setCurrentProfile);
  }, []);
  useEffect(() => {
    setDataProfile({
      name: currentProfile?.name,
      phone: currentProfile?.phone,
      birthDate: currentProfile?.birthDate,
      address: currentProfile?.address,
      district_id: currentProfile.district?.id,
    });
  }, [currentProfile]);
  const handleUpdateProfile = () => {
    // console.log(dataProfile);
    if (!errBirthDay) {
      updateProfile(dataProfile, notify);
    }
  };

  const elemDistrict = listDictrict?.map((item, index) => {
    if (index === 0) {
      return (
        <option value={item?.id}>
          {item?.district_name}
          {" - "}
          {item?.province.province_name}
        </option>
      );
    }
    return (
      <option value={item?.id}>
        {item?.district_name}
        {" - "}
        {item?.province.province_name}
      </option>
    );
  });
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
                    {/* <MDBCardText className="text-muted">
                      Johnatan Smith
                    </MDBCardText> */}
                    <MDBInput
                      value={dataProfile?.name}
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          name: e.target.value,
                        });
                      }}
                    ></MDBInput>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol lg="2">
                    <MDBCardText>Phone: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          phone: e.target.value,
                        });
                      }}
                      value={dataProfile?.phone}
                    ></MDBInput>
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
                      }}
                      value={dataProfile?.address}
                    ></MDBInput>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol lg="2">
                    <MDBCardText>Birthday: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <MDBInput
                      type="date"
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          birthDate: e.target.value,
                        });
                        validateBirthDay(e.target.value);
                      }}
                      value={dataProfile?.birthDate ? dataProfile?.birthDate : ''}
                    ></MDBInput>
                  </MDBCol>
                </MDBRow>
                {errBirthDay && errBirthDay !== "err" ? (
                  <p style={{ color: "red" }}>{errBirthDay}!!!</p>
                ) : null}
                <hr />
                <MDBRow>
                  <MDBCol lg="2">
                    <MDBCardText>District: </MDBCardText>
                  </MDBCol>
                  <MDBCol lg="6">
                    <select
                      class="form-control"
                      onChange={(e) => {
                        setDataProfile({
                          ...dataProfile,
                          district_id: parseInt(e.target.value),
                        });
                      }}
                      value={dataProfile?.district_id}
                    >
                      {/* <option value={0}> */}
                      {/* <input
                        type="search"
                        // ref={inputSearch}
                        style={{
                          height: "40px",
                          width: "40%",
                          borderRadius: 30,
                          // border: "none",
                          outline: "none",
                          padding: "4px 10px 4px",
                        }}
                        onChange={(e) => {
                          // setKeyword(e.target.value);
                        }}
                        placeholder="Enter name product which you want..."
                      /> */}
                      {/* </option> */}
                      {elemDistrict}
                    </select>
                  </MDBCol>
                </MDBRow>
                <hr></hr>
                <div class="text-center cart-buttons mt-3">
                  <a
                    // href="cart"
                    class="btn btn-small btn-main btn-inline-block"
                    onClick={() => {
                      handleUpdateProfile();
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Update
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
