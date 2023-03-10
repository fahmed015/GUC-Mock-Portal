import React, { Component,useEffect,useState } from "react";

import NotificationsRow from "./subComponents/notificationsRow";
import Hrnavbarnotification from "./NavBars/hrnavnotification"
import axios from "axios";
import Swal from 'sweetalert2'

import {
    Row,
    Col,
    Form,
    Modal,
    Table,
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";


import {
    Card,
    CardContent,
    CardHeader,
    Button,
    InputLabel,
    Container,
} from "@material-ui/core";
import AcademicMemberNav from "./NavBars/AcademicMemberNav";


function Mynotifications() {
    const [role, setRole] = useState("");
    const [repData, setRepData] = useState([]);
    const [show, setShow] = useState(false);
    const [displayCoordinator, setDisplayCoordinator] = useState("none");
    const [displayHOD, setDisplayHOD] = useState("none");
    const [displayInstructor, setDisplayInstructor] = useState("none");



    useEffect(async () => {
        try {

            await axios({
                method: "get",
                url: process.env.REACT_APP_SERVER + "/viewNotifications",
                headers: { 'auth-token': localStorage.getItem('auth-token') },
                data: {},
            }).then((res) => {
                // console.log(res.data.existingUser.notifications)

                if (res.status === 400) {
                    Swal.fire(res.data.msg)
                }

                if (!res.data.msg) {
                    //   console.log("here")
                    let tokenRole = localStorage.getItem("tokenrole");
                    if (tokenRole == "HOD") {
                         setDisplayHOD( "block");
                    } else if (tokenRole == "Course coordinator") {
                         setDisplayCoordinator ("block" );
                    }
                    else if (tokenRole == "Course Instructor") {
                        setDisplayInstructor("block" );
                    }

                    console.log(res.data.existingUser.notifications);

                    setRepData(res.data.existingUser.notifications);


                    //   window.location.reload();
                } else {
                    Swal.fire(res.data.msg);
                }


            });
        } catch (e) {
            console.log(e);
        }
    }, [repData])


    return (

        <div>
            {/* Nav bar depending 3la el user w el notification hya el active */}
             
        <AcademicMemberNav
          displayHOD={displayHOD}
          displayCoordinator={displayCoordinator}
          displayInstructor={displayInstructor}
        
        />
            <Table style={{ color: "black" }} responsive>
                <thead>
                    <tr
                        style={{
                            textAlign: "center",
                            background: "#456268",
                            color: "white",
                        }}
                    >
                        <th key={0}> Notifications </th>

                    </tr>
                </thead>

                <tbody>

                    {repData.map((elem, index) => {

                        return <NotificationsRow repData={elem} index={index} />;
                    })}
                </tbody>
            </Table>

        </div>


    );
}

export default Mynotifications;