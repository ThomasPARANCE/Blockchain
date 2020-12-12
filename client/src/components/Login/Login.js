import API from "../../utils/API";
import React from "react";
import { FormControl } from "react-bootstrap";

export class Login  extends React.Component {
    componentDidMount() {
        document.title = 'Se connecter - Dashboard';
    }

    state = {
        email: "",
        password: "",
        loginerror: ""
    };

    send = async () => {
        const { email, password } = this.state;
        if (!email || email.length === 0) {
            this.setState({ loginerror: "L'adresse email est invalide." });
            return;
        }
        if (!password || password.length === 0) {
            this.setState({ loginerror: "Veuillez vérifier les informations fournies." });
            return;
        }
        try {
            const { data } = await API.login(email, password);
            localStorage.setItem("isConnected", true);
            console.log("iduser");
            console.log(data.id_user);
            localStorage.setItem("id_user", data.id_user);
            window.location = "/dashboard";
        } catch (error) {
            this.setState({ loginerror: "Les données de connections ne correspondent pas." });
        }
    };

    loginTextBox = () => {
        const { email, password, loginerror } = this.state;

            return (
            <div>
                <div className="form-group">
                <FormControl
                    autoFocus
                    type="text"
                    value={email}
                    placeholder="Renseignez l'adresse e-mail"
                    onChange={e => this.setState({ email: e.target.value })}
                    className = {loginerror.length !== 0 ?
                        "form-control form-control-user is-invalid" : "form-control form-control-user"}
                />
                <div className="invalid-feedback">
                    {loginerror}
                </div>
                </div>
                <div className="form-group">
                    <FormControl
                        value={password}
                        placeholder="Mot de passe"
                        onChange={e => this.setState({ password: e.target.value })}
                        type="password"
                        className = "form-control form-control-user"
                    />
                </div>
                <button onClick={this.send} className="btn btn-primary btn-user btn-block col-4 offset-4">
                    Login
                </button>
            </div>)
    }

    divStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        background: '#4e73df'
    };

    render() {
        return (
            <div className="Login">
                <div className="cover" style={this.divStyle}/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="mt-4 col-9 row mx-auto">
                                                <h1 className="fas fa-fw fa-tachometer-alt text-primary col-12">BlockChain</h1>
                                            </div>
                                            <hr/>
                                            <div className="p-3">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Bienvenue!</h1>
                                                </div>
                                                <this.loginTextBox></this.loginTextBox>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
