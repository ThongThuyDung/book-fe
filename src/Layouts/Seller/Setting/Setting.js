import React, { useEffect, useState } from "react";
import { getDistrict, getProfile, updateProfile } from "../../../APIs/profile.api";
function Setting() {
    const [currentProfile, setCurrentProfile] = useState({});
    useEffect(() => {
        getProfile(setCurrentProfile);
      }, []);

    console.log(currentProfile)
    return (
    <div>
        <h1>page Setting</h1>
    </div>
    )
}
export default Setting