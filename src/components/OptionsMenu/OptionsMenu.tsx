import { Container } from "./styles";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { useEffect, useState } from "react";

export default function OptionsMenu(){

    const dispatch = useDispatch()

    const [ value, setValue] = useState(useSelector((state: RootStateOrAny) => state.actions.execution)) 

    const handleExecutar = () => {
        dispatch({ type : "SET_EXECUTION", value: true })
    }
    

    return <Container>
        <button onClick={handleExecutar}>Executar</button>
    </Container>
}