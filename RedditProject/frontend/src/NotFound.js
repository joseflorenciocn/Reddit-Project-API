import React, { Component } from 'react';
import MainContainer from './MainContainer';

class NotFound extends Component {

    render() {
        return (
            <div>
                <MainContainer>
                    <h1 className="page-header">Not Found</h1>
                        <span>Page Not Found</span>
                </ MainContainer>
            </div>
        );
    }
}
export default NotFound;