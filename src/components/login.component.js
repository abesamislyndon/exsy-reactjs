import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";


export default class Login extends Component{
    render(){
        return(
            <div>
            <section className="ftco-section">
                    <div classNameName="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="img">
                                </div>
                                <div className="login-wrap p-4 p-md-5">
                                    <div className="d-flex">
                                        <div className="w-100">
                                            <h3 className="mb-4">Sign In</h3>
                                        </div>
                                        <div className="w-100">
                                            <p className="social-media d-flex justify-content-end">
                                                <a href="#"
                                                    className="social-icon d-flex align-items-center justify-content-center"><span
                                                        className="fa fa-facebook"></span></a>
                                                <a href="#"
                                                    className="social-icon d-flex align-items-center justify-content-center"><span
                                                        className="fa fa-twitter"></span></a>
                                            </p>
                                        </div>
                                    </div>
                                    <form action="#" className="signin-form">
                                        <div className="form-group mb-3">
                                            <label className="label" for="name">Username</label>
                                            <input type="text" className="form-control" placeholder="Username" required/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label" for="password">Password</label>
                                            <input type="password" className="form-control" placeholder="Password" required/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign
                                                In</button>
                                        </div>
                                        <br/>
                                        <div className="form-group d-md-flex">
                                            <div className="w-50 text-left">
                                                <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                                                    <input type="checkbox" checked/>
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                            <div className="w-50 text-md-right">
                                                <a href="#">Forgot Password</a>
                                            </div>
                                        </div>
                                    </form>
                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
}





