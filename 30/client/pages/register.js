import { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { set } from 'nprogress';
import { showSuccessMessage, showErrorMessage } from '../helpers/alerts';

//import {API} from '../config'
console.log(process.env.API);
const Register = () => {
    const [state, setState] = useState({
        name: 'Moon',
        email: 'nmn.nguyet@gmail.jp',
        password: '123456',
        error: '',
        success: '',
        buttonText: 'Register'
    });

    const { name, email, password, error, success, buttonText } = state;

    const handleChange = name => e => {
        setState({ ...state, [name]: e.target.value, error: '', success: '', buttonText: 'Register' });
    };

    const handleSubmit = async e =>{
        e.preventDefault();
        setState({...state, buttonText: 'Registering'});
        try{
            const response = await axios.post(`${process.env.API}/register`, {
                name,
                email,
                password
            })
            console.log(response)
            setState({
                ...state,
                name:'',
                email:'',
                password:'',
                buttonText:'Submitted',
                success:response.data.message
            });
        }catch(error){
            console.log(error)
            setState({...state, buttonText: 'Register', error:error.response.data.error})           
        }
    }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     setState({...state, buttonText: 'Registering'});
    //     // console.table({ name, email, password });
    //     axios
    //         .post(`http://localhost:8000/api/register`, {
    //             name,
    //             email,
    //             password
    //         })
    //         .then(response => 
    //             {
    //                 console.log(response)
    //                 setState({
    //                     ...state,
    //                     name:'',
    //                     email:'',
    //                     password:'',
    //                     buttonText:'Submitted',
    //                     success:response.data.message
    //                 })
    //             }
    //         )
    //         .catch(error => 
    //             {
    //                 console.log(error)
    //                 setState({...state, buttonText: 'Register', error:error.response.data.error})
    //             }
    //         );
    // };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    value={name}
                    onChange={handleChange('name')}
                    type="text"
                    className="form-control"
                    placeholder="Type your name"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    value={email}
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="Type your email"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    value={password}
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    placeholder="Type your password"
                    required
                />
            </div>
            <div className="form-group">
                <button className="btn btn-outline-warning">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>           
            <div className="col-md-6 offset-md-3">
                <h1>Register</h1>
                <br />
                {success && showSuccessMessage(success)}
                {error && showErrorMessage(error)}
                {registerForm()}
                {/* <hr />
                {JSON.stringify(state)} */}
            </div>
        </Layout>
    );
};

export default Register;
