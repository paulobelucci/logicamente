import { InputCodeArea, OptionsMenu, SugestionCodes } from '..'
import { Container } from './styles'

export default function CodeAreaContainer(){
    return (
        <Container>
            <SugestionCodes></SugestionCodes>
            <OptionsMenu></OptionsMenu>
            <InputCodeArea></InputCodeArea>
        </Container>
    )
}