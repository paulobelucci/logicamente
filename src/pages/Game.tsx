import { 
    NavBar, 
    PresentationGame,
    CodeAreaContainer
} from "../components/index";
import { ContainerGame } from './styles'


export default function Game(){
    return (
        <ContainerGame>
            <NavBar/>
            <CodeAreaContainer></CodeAreaContainer>
            <PresentationGame></PresentationGame>
        </ContainerGame>
    )
}