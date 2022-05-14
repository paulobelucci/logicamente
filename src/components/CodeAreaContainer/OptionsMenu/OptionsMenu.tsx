import { Container } from "./styles";
import Button from '@mui/material/Button';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { useEffect, useState } from "react";

export default function OptionsMenu(){

    const dispatch = useDispatch()

    const [ value, setValue] = useState(useSelector((state: RootStateOrAny) => state.actions.execution)) 

    const handleExecutar = () => {
        dispatch({ type : "SET_EXECUTION", value: true })
    }

    const handleReiniciar = () => {
        dispatch({ type : "SET_EXECUTION", value: true })
    }

    const handleApagar = () => {
        dispatch({ type : "SET_EXECUTION", value: true })
    }
    

    return <Container>
        <Button size="large" color="success" variant="contained" onClick={handleExecutar}>EXECUTAR</Button>
        <Button size="large" color="primary" variant="contained" onClick={handleReiniciar}>REINICIAR</Button>
        <Button size="large" color="error" variant="contained" onClick={handleApagar}>APAGAR</Button>
    </Container>
}