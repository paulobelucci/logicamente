import React from "react";
import { Container } from "./styles";

export default function FaseNavigationSection(){
    return (
        <Container>
            <button>Previous</button>
            <h3>Actual Fase</h3>
            <button>Next</button>
        </Container>
    )
}