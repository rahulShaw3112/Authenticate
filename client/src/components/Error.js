import React from 'react';
import { Alert } from "react-bootstrap";

export default function({error}) {
    if(error == "") return null;
    return (<Alert variant="danger">{error}</Alert>);
}