import React, { useEffect, useState, useContext } from "react";
import Logo from '../Assets/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { UserIdContext } from '../Contexts/UserIdContext';

// Child Components
import TaskList from "./TaskList";
import { APIPathContext } from "../Contexts/APIPathContext";


export default function Home() {

    const navigate = useNavigate();

    let APIpath = useContext(APIPathContext)

    const [id, setId] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        axios.defaults.withCredentials = true;

        (async () => {
            await axios.get(`${APIpath}/auth`)
                .then((res) => {
                    // console.log(res.data)
                    // if (res.data.message === 'success') {
                    //     setId(res.data.user._id)
                    //     setName(res.data.user.name)
                    //     navigate('/')
                    // } else {
                    //     navigate('/login');
                    // }
                    if(localStorage.getItem('user')) {
                        let user = JSON.parse(localStorage.getItem('user'))
                        setId(user._id)
                        setName(user.name)
                    }else {
                        navigate('/login')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    navigate('/login')
                });
        })()

        document.querySelector('html').style.backgroundColor = '#242121';
    }, [navigate, APIpath])


    function logoutUser() { // Logout has a link with /login path, so no Navigate()
        localStorage.removeItem('key');
        // axios.get(`${APIpath}/user/logout`)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err));
    }

    return (
        <>

            <div style={{ background: '#242121' }}>

                <nav className="desktop-navigation">

                    <div className="left">
                        <div className="logo-container">
                            <img src={Logo} alt="logo"></img>
                        </div>
                    </div>


                    <div className="right">
                        <h5 style={{ height: '70px', margin: '0px', lineHeight: '70px', display: 'inline', color: 'black' }} className="nameText">{name}</h5>
                        <Link onClick={logoutUser} to='/login'><button className="logout-btn bg-danger" style={{ marginLeft: '16px', color: 'white', outline: 'none', border: 'none', padding: '6px 24px', borderRadius: '4px', cursor: "pointer" }}>Logout</button></Link>
                    </div>

                </nav>

                <nav className="mobile-navigation row d-md-none">

                    <div className="left col">
                        <div className="logo-container">
                            <img src={Logo} alt="logo"></img>
                        </div>
                    </div>

                    {/* <div className="right col">
                        <h5 style={{ height: '70px', margin: '0px', lineHeight: '70px', display: 'inline', color: 'black' }} className="nameText">{name}</h5>
                    </div> */}
                    <div className="col right mr-3" style={{textAlign: 'right', display: 'grid', alignItems: 'center'}} >
                        <Link onClick={logoutUser} to='/login'><button className="logout-btn bg-danger" style={{ marginLeft: '16px', color: 'white', outline: 'none', border: 'none', padding: '6px 24px', borderRadius: '4px', cursor: "pointer" }}>Logout</button></Link>
                    </div>
                </nav>


                <UserIdContext.Provider value={id}>
                    <TaskList />
                </UserIdContext.Provider>
            </div>
        </>
    )
}