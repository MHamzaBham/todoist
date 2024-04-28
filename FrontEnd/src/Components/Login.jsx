import React, {useContext, useState} from 'react';
import LoginImg from '../Assets/Login_img.svg'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtn,
    MDBIcon,
    MDBInput
}
    from 'mdb-react-ui-kit';
import NonAuthNav from './NonAuthNav';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { APIPathContext } from '../Contexts/APIPathContext';

function Login() {
    axios.defaults.withCredentials = true;

    let APIpath = useContext(APIPathContext)

    let [email, setEmail] = useState("");
    let [pass, setPass] = useState("");

    const navigate = useNavigate();

    function loginUser(e) {
        e.preventDefault();
        
        axios.post(`${APIpath}/user/login`, { email: email, password: pass })
            .then((res) => {
                console.log(res);
                if (res.data.message === 'success') {
                    navigate('/');
                } else {
                    alert(res.data.err);
                }
            })
            .catch((err) => console.log(err))
    }


    return (
        <>
            <div className='bg-dark'>
                <NonAuthNav />
                <MDBContainer className="p-3 mt-3 login-container" style={{height: '100vh' }}>

                    <MDBRow>

                        <MDBCol col='10' md='6' style={{ margin: 'auto'}}>
                            <img src={LoginImg} class="img-fluid" alt="login" />
                        </MDBCol>

                        <MDBCol col='4' md='6' className='py-5'>

                            <h3 className="text-white pb-3">Login</h3>
                            <form action="login" onSubmit={loginUser}>

                                <MDBInput onChange={(e) => setEmail(e.target.value)} wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" style={{label: 'white'}} required/>
                                <MDBInput onChange={(e) => setPass(e.target.value)} wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"  required/>

                                <MDBBtn className="mb-4 w-100" size="lg" style={{ background: "#ff7f50", border: 'none', maxHeight: '44px' }}>Sign in</MDBBtn>

                            </form>

                            {/* <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div> */}

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-white">OR</p>
                            </div>

                            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#4285F4', border: 'none', maxHeight: '46px' }}>
                                <MDBIcon fab icon="twitter" className="mx-2" />
                                Continue with Google
                            </MDBBtn>
                            <p className='text-white'>Don't have an account? <Link style={{color: "#ff7f50", textDecoration: 'none', maxHeight: '46px'}} to={'/signup'}>Signup</Link></p>
                        </MDBCol>

                    </MDBRow>

                </MDBContainer>
            </div>
        </>
    );
}

export default Login;