import React, { useState } from "react";
import AdminSideBar from "../common/AdminSideBar";
import AdminToggelSideBar from "../common/AdminToggelSideBar";
import Navbar from "../common/Navbar";
import Loader from "../common/Loader";

const UpdateProductData = () => {
    const [loading, setLoading] = useState(false)
    return (<div>
        {loading === true && <Loader />}
        <Navbar />
        <div className="DropdownForAdmin">
            <AdminToggelSideBar />
        </div>
        <AdminSideBar />
        <div className="main">
            <b>Hello</b>
        </div>
    </div>
    )
}

export default UpdateProductData;
