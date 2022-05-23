import { Container } from "./styles";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux'

export default function OptionsMenu(){

    const dispatch = useDispatch()

    const handleExecutar = () => {
        dispatch({ type : "SET_EXECUTION", value: true })
    }

    const handleReiniciar = () => {
        window.location.reload()
    }

    const handleApagar = () => {
        dispatch({ type : "SET_APAGAR", value: true })
    }
    

    return <Container>
        <Button size="large" color="success" variant="contained" onClick={handleExecutar}>EXECUTAR</Button>
        <Button size="large" color="primary" variant="contained" onClick={handleReiniciar}>REINICIAR</Button>
        <Button size="large" color="error" variant="contained" onClick={handleApagar}>APAGAR</Button>
    </Container>
}