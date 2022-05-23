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
let carWidth = 100
let carHeight = 50
let xInitialPosition = x;
let rotatedDireita = false
let rotatedEsquerda = false

//rectangles fase 1
const xTopCenter = 220
const yTopCenter = 0
const x2TopCenter = 580
const y2TopCenter = 260

let initialCanvas
let carCarvans: any;


let imageBackground: p5Types.Image;
let carro: p5Types.Image;

interface Commands {
    id: number,
    text: string
}

let frame = 0
let frameLimit = 0
interface ComponentProps {
	//Your component props
}


let commands:Commands[] = []

let executedWasPressed = false

export default function PresentationGame(props: ComponentProps){

    const selector = useAppSelector((state) => state)

    //@ts-ignore
	const getInputs = () => { return selector.inputs.data }

    const dispatch = useDispatch()
    commands = getInputs() 

    executedWasPressed = useSelector((state: RootStateOrAny) => state.actions.execution)
    console.log(executedWasPressed)

    frameLimit = commands.length * frameRate

    async function move(p5: p5Types, command: Commands){

        switch(command.text){
            case "AVANÇAR":

                if(!rotatedEsquerda && !rotatedDireita){
                    x+=2
                    p5.image(carro, x, y, carWidth, carHeight);
                } else {
                    p5.push()
                    if(rotatedDireita){
                        y+=2
                        p5.translate(x + (carHeight * 1.5), y)
                        p5.rotate(90)
                    } else {
                        y-=2
                        p5.translate(x + (carHeight * 1.5), y)
                        p5.rotate(-90)
                    }
                    p5.image(carro, 0, 0, carWidth, carHeight);
                    p5.pop()
                }

            break;
            case "VIRAR DIREITA":
                
                p5.push()
                p5.translate(x + (carHeight * 1.5), y)
                p5.rotate(90)
                p5.image(carro, 0, 0, carWidth, carHeight);
                p5.pop()
                rotatedDireita = true
                rotatedEsquerda = false


            break;
            case "VIRAR ESQUERDA":
                p5.push()
                p5.angleMode(p5.DEGREES) 
                // p5.translate(x + (carHeight * 1.5), y)
                p5.rotate(-90)
                p5.image(carro, 0, 0, carWidth, carHeight);
                p5.pop()
                rotatedEsquerda = true
                rotatedDireita = false
            break;
            default:
                console.log("nenhum comando enviado")
                break;
        }

        
    }

    function setCar(p5: p5Types){

        if(
            executedWasPressed && 
            commands.length > 0 &&
            frame <= frameLimit
        ){

            frame += 1

            if(frame <= 60){
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

        //place the car in the map
        if(!rotatedDireita && !rotatedEsquerda){
            p5.image(carro, x, y, carWidth, carHeight);
        } else {
             
            p5.push()
            if(rotatedDireita){
                p5.translate(x + (carHeight * 1.5), y)
                p5.rotate(90)
            } else {
                p5.translate(x + (carHeight * 1.5), y)
                p5.rotate(-90)
            }
            p5.image(carro, 0, 0, carWidth, carHeight);
            p5.pop()
        }

        //reseta a movimentação quando os comandos terminam
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

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(800, 350).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES)
	};

	const draw = (p5: p5Types) => {
        p5.frameRate(frameRate)
        p5.image(imageBackground, 0,0);

        const color = p5.color("#fff")
        color.setAlpha(0)
        p5.noStroke()
        p5.fill(color)
        p5.rect(0,0,150,90, 20)
        p5.rect(0,160,150,190, 20)
        p5.rect(220,0,360,260, 20)
        p5.rect(220,330,360,20, 20)
        p5.rect(650,0,150,90, 20)
        p5.rect(650,160,150,190, 20)
        
        p5.push()
        setCar(p5)
        p5.pop()
        // carCarvans.p5.Image(800,350)
	};


	return (
        <Container>
            <Sketch setup={setup} draw={draw} preload={preload} />
        </Container>
    )
}



  
