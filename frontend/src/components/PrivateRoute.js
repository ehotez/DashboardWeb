import React from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: localStorage.getItem("auth_user") !== ''
    };
  }

  componentDidMount() {
    this.setState({
      isAuthenticated: localStorage.getItem("auth_user") !== ''
    });
  }

  render() {
    const { children } = this.props;
    const { isAuthenticated } = this.state;

    if (isAuthenticated) {
      return children;
    }

    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;