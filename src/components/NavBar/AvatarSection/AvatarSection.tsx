import React from "react";
import { Container } from "./styles";
import Button from '@mui/material/Button';
import SendIcon from '@mui/material/Button'; 


export default function AvatarSection() {
    return (
        <Container>
            <h3>Paulo</h3>
            <Button variant="contained">
                Sair
            </Button>
        </Container>
    )
}