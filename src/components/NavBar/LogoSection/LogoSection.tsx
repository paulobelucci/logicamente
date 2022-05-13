import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

export default function LogoSection(){
    return (
        <Container>
            <h1>Logicamente</h1>
            <Link to={'/game'}>Home</Link>
            <Link to={'/fases'}>Fases</Link>
        </Container>
    )
}