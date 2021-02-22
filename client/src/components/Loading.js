import React from 'react';
import { Spinner } from "react-bootstrap";

import "../css/loading.css";

class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
            </div>
        );
    }
}

export default Loading;