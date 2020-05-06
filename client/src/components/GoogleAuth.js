import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";


export class GoogleAuth extends Component {
    componentDidMount() {
        window.gapi.load('client: auth2', () => {
            window.gapi.client.init({
                clientId: '603612438626-46hjo7otv14vadrkvh5m5on8916v3alr.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();

                // check current auth state
                this.onAuthChange(this.auth.isSignedIn.get());
                // listen for any changes to state that has to do with isSignedIn
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    };

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    
    changeLoginState = () => {
        if(this.props.isSignedIn){
            this.auth.signOut();
        } else {
            this.auth.signIn();
        }
    };

    renderAuthButton() {
        if(this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.changeLoginState}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button className="ui blue button" onClick={this.changeLoginState}>
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);