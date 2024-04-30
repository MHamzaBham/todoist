import React, { useState, useContext } from "react";
import NonAuthNav from './NonAuthNav';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import SignupImg from '../Assets/signup_img.svg'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBInput
}
    from 'mdb-react-ui-kit';
import { APIPathContext } from "../Contexts/APIPathContext";


export default function Signup() {

    axios.defaults.withCredentials = true;
    let APIpath = useContext(APIPathContext)

    const navigate = useNavigate();


    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");

    function createUser(e) {
        e.preventDefault();

        axios.post(`${APIpath}/user/register`, { name: name, email: email, password: pass })
            .then((res) => {
                console.log(res);
                if (res.data.message === 'success') {
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    navigate('/');
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className='bg-dark'>
                <NonAuthNav />
                <MDBContainer className="p-3 mt-3 signup-container" style={{ height: '100vh' }}>
                    {/* <h3 className="text-white text-center">Signup</h3> */}
                    <MDBRow>

                        <MDBCol col='10' md='6' style={{ margin: 'auto' }}>
                            <img src={SignupImg} class="img-fluid" alt="signup" />
                        </MDBCol>

                        <MDBCol col='4' md='6' className='py-5' style={{ margin: 'auto' }}>
                            <h3 className="text-white pb-3">Signup</h3>
                            <form action="signup" onSubmit={createUser}>

                                <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg" style={{ label: 'white' }} onChange={(e) => { setName(e.target.value) }} required />
                                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" style={{ label: 'white' }} onChange={(e) => { setEmail(e.target.value) }} required />
                                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => { setPass(e.target.value) }} required />

                                <MDBBtn type="submit" className="mb-4 w-100" size="lg" style={{ background: "#ff7f50", border: 'none', maxHeight: '46px' }}>Signup</MDBBtn>

                            </form>


                            {/* <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div> */}

                            <p className='text-white'>Already have an account? <Link style={{ color: "#ff7f50", textDecoration: 'none' }} to={'/login'}>Login</Link></p>
                        </MDBCol>

                    </MDBRow>

                </MDBContainer>
            </div>
        </>
    )
}