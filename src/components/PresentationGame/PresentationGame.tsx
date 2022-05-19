import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import {Container} from './styles'
import { useAppSelector } from "../../hooks";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import background from '../../assets/images/background_edited.png'
import car from '../../assets/images/yellow_car.png'

const frameRate = 60
let x = 15
let y = 100
let xInitialPosition = x
let carWidth = 100
let carHeight = 50

let imageBackground: p5Types.Image;
let carro: p5Types.Image;

enum Directions {
    LEFT = "L",
    RIGHT = "R",
    FORWARD = "F"
}

interface Commands {
    id: number,
    text: string
}

let frame = 0
let frameLimit = 0
// let comandosExecutados = 0

// const Comands = {
//     AVANCAR : { distance: carWidth, direction: Directions.FORWARD },
//     VIRAR_DIREITA : { distance: carHeight, direction: Directions.RIGHT },
//     VIRAR_ESQUERDA : { distance: carHeight, direction: Directions.LEFT },
// }
interface ComponentProps {
	//Your component props
}


let commands:Commands[] = []

let executedWasPressed = false

export default function PresentationGame(props: ComponentProps){

    const selector = useAppSelector((state) => state)

	const getInputs = () => {
		//@ts-ignore
        return selector.inputs.data
		 
	}

    const dispatch = useDispatch()
    commands = getInputs()
    executedWasPressed = useSelector((state: RootStateOrAny) => state.actions.execution)

    async function move(p5: p5Types, command: Commands){

        switch(command.text){
            case "AVANÇAR":
                if(x <= xInitialPosition + carWidth){
                    x+=2
                    p5.image(carro, x, y, carWidth, carHeight);
                }
            break;
            case "VIRAR DIREITA":
                if(x >= xInitialPosition - carWidth){
                    x-=2
                    p5.image(carro, x, y, carWidth, carHeight);
                }
            break;
            case "VIRAR ESQUERDA":
                if(x >= xInitialPosition - carWidth){
                    x-=2
                    p5.image(carro, x, y, carWidth, carHeight);
                }
            break;
        }
        
    }

    function setCar(p5: p5Types){
        console.log("commands.length.....", commands.length)
        frameLimit = commands.length * frameRate
        console.log(frameLimit)

        if(
            executedWasPressed && 
            commands.length > 0 &&
            frame <= frameLimit
        ){

            frame += 1

            if(frame <= frameRate / 3){
                move(p5, commands[0])
            }
            else if(frame > 60 && frame <= 120){
                move(p5, commands[1])
            }
            else if(frame > 120 && frame <= 180){
                move(p5, commands[2])
            }
            else if(frame > 180 && frame <= 240){
                move(p5, commands[3])
            }

        } 
        p5.image(carro, x, y, carWidth, carHeight);
        if(frame > frameLimit){
            dispatch({ type : "SET_EXECUTION", value: false })
            executedWasPressed = false
            frame = 0
        }
        
    }

    const preload = (p5: p5Types) => {
        imageBackground = p5.loadImage(background)
        carro = p5.loadImage(car)
    }


    //See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
        // const background = p5.loadImage('assets/background.jpeg');
		p5.createCanvas(800, 350).parent(canvasParentRef);
	};

	const draw = (p5: p5Types) => {
        p5.frameRate(frameRate)
        p5.image(imageBackground, 0,0);
        
        setCar(p5)
	};


	return (
        <Container>
            <Sketch setup={setup} draw={draw} preload={preload} />
        </Container>
        )
}



  
