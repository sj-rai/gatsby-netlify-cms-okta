import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import React from 'react'

const config = {
  baseUrl: 'https://dev-82202657.okta.com/',
  clientId: '0oau728kzJyLqgf8w5d6',
  logo: '//logo.clearbit.com/gatsbyjs.org',
  redirectUri: typeof window !== 'undefined' && window.location.origin + '/account',
  el: '#signIn',
  authParams: {
    issuer: 'https://dev-82202657.okta.com/oauth2/default',
    scopes: ['openid', 'email', 'profile']
  }
};

export const signIn = typeof window !== 'undefined' && new OktaSignIn(config);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: false
    };

    this.signIn = signIn;
  }

  async componentDidMount() {
    this.signIn.remove();
    const tokens = await this.signIn.showSignInToGetTokens();
    await this.signIn.authClient.tokenManager.setTokens(tokens);
    window.location.reload();
  }

  render() {
    return (
      <div id="signIn"/>
    )
  }
}

export default Login