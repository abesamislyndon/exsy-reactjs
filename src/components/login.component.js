import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import login from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import authHeader from "../services/auth.header";

const required = value =>{
    if(!value){
        return(
            <span>This is required!</span>
        );
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        
        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        e.preventDefault();
        this.setState({username: e.target.value});
    }

    onChangePassword(e) {

        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({message: "", loading: true});
        this.form.validateAll();

     
        if (this.checkBtn.context._errors.length === 0) {
            login(this.state.username, this.state.password).then(() => {
                    this.props.history.push("/dashboard");
                    window.location.reload();
                }, error => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    this.setState({loading: false, message: resMessage});
                });
        } else {
            this.setState({loading: false});
        }
    }

    render(){
        return(
            <div>
            <section className="ftco-section">
                    <div className="container">
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
                                    </div>
                                    <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                            this.form = c;
                        }}>
                                        <div className="form-group mb-3">
                                            <label className="label">Username</label>
                                            <Input type="text" name="username" value={this.state.username} onChange={this.onChangeUsername} validations={[required]} className="form-control" placeholder="Username" />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label">Password</label>
                                            <Input type="password" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required]}  className="form-control" placeholder="Password"/>
                                        </div>
                                        <div className="form-group">
                                        <button
                                                className="btn btn-branding-login float-right"
                                                disabled={this.state.loading}>
                                                {this.state.loading && (
                                                    <span className="spinner-grow spinner-grow-sm"></span>
                                                )}
                                                <span>Login</span>
                                          </button>
                                        </div>

                                        {this.state.message && (
                                            <div className="form-group error-message">
                                                <div className="alert alert-danger" role="alert">
                                                    <span>Invalid Login or password.</span>
                                                </div>
                                            </div>
                                        )}
                                                    <CheckButton
                                            style={{
                                            display: "none"
                                        }}
                                            ref={c => {
                                            this.checkBtn = c;
                                        }}/>

                                        <br/>
                
                                    </Form>
                               
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





