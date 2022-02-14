import React from "react";
import { Link } from "react-router-dom";
import { Container } from "./styles";

export default function LogoSection(){
    return (
        <Container>
            <h3>Logicamente</h3>
            <Link to={'/game'}>Home</Link>
            <Link to={'/fases'}>Fases</Link>
            <Link to={'/ranking'}>Ranking</Link>
        </Container>
    )
}