import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import {Container} from './styles'
import { useAppSelector } from "../../hooks";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import background from '../../assets/images/fase_1_background.png'
import successBackground from '../../assets/images/success_background.png'
import explosion from '../../assets/images/explosion.png'
import errorBackground from '../../assets/images/error_background.png'
import car from '../../assets/images/yellow_car.png'

let success = false
let colision= false
const frameRate = 60
let x = 15
let y = 100
let carWidth = 100
let carHeight = 50
let xInitialPosition = x;
let rotatedDireita = false
let rotatedEsquerda = false

const tolerancia = carHeight * 0.5;
let ROTATE_DIREITA = carHeight * 1.5
let ROTATE_ESQUERDA = carHeight * 0.5

//rectangles fase 1
const xTopCenter = 220
const yTopCenter = 0
const x2TopCenter = 580
const y2TopCenter = 260

let carCarvans: any;

let imageErrorBackground: p5Types.Image;
let imageExplosion: p5Types.Image;
let imageSuccessBackground: p5Types.Image;
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
                //avancar no eixo x
                if(!rotatedEsquerda && !rotatedDireita){
                    x+=2
                    p5.image(carro, x, y, carWidth, carHeight);
                } 
                else {
                    //avancar no eixo y
                    p5.push()
                    if(rotatedDireita){
                        y+=2
                        p5.translate(x + (ROTATE_DIREITA), y)
                        p5.rotate(90)
                    } else {
                        y-=2
                        p5.translate(x + (ROTATE_ESQUERDA), y)
                        p5.rotate(-90)
                    }
                    p5.image(carro, 0, 0, carWidth, carHeight);
                    p5.pop()
                }

            break;
            case "VIRAR DIREITA":
                if(rotatedEsquerda){
                    p5.push()
                    p5.translate(x, ROTATE_DIREITA)
                    p5.image(carro, 0, 0, carWidth, carHeight);
                    p5.pop()
                } else {
                    p5.push()
                    p5.translate(x + ROTATE_DIREITA, y)
                    p5.rotate(90)
                    p5.image(carro, 0, 0, carWidth, carHeight);
                    p5.pop()
                }

                rotatedDireita = true
                rotatedEsquerda = false
            break;
            case "VIRAR ESQUERDA":
                
                if(rotatedDireita){
                    p5.push()
                    p5.angleMode(p5.DEGREES) 
                    p5.translate(x + (ROTATE_ESQUERDA), y)
                    p5.rotate(-90)
                    p5.image(carro, 0, 0, carWidth, carHeight);
                    p5.pop()
                } else {
                    p5.push()
                    p5.angleMode(p5.DEGREES) 
                    p5.translate(x + (ROTATE_ESQUERDA), y)
                    p5.rotate(-90)
                    p5.image(carro, 0, 0, carWidth, carHeight);
                    p5.pop()
                }
                rotatedEsquerda = true
                rotatedDireita = false
                
            break;
            default:
                console.log("nenhum comando enviado")
                break;
        }

        
    }

    function colisaoTopCenter(){
        if((x + carWidth >= 220 + tolerancia && x + carWidth <= 580 + tolerancia) && (y + carHeight >= 0 + tolerancia && y + carHeight <= 260 + tolerancia)){
            return true
        }
        return false;
    }

    function setCar(p5: p5Types){

        if(
            executedWasPressed && 
            commands.length > 0 &&
            frame <= frameLimit
        ){

            frame += 1

            if(colision){ return }

            if(frame <= frameRate){
                move(p5, commands[0])
            }
            else if(frame > 60 && frame <= 120){
                move(p5, commands[1])
            }
            else if(frame > 120 && frame <= 180){
                move(p5, commands[2])
                console.log(`x: ${x}, y: ${y}`)
                if(frame == 180){
                    if((x + carHeight >= 150 && x + carHeight <= 230) && (y + carWidth >= 265 && y + carWidth <= 335)){
                        success = true
                    }
                }
                
            } 
            
        } 
        // console.log(`x: ${x}, y: ${y}`)

        //place the car in the map
        if(!rotatedDireita && !rotatedEsquerda){
            p5.image(carro, x, y, carWidth, carHeight);
        } 
        else {
            p5.push()
            console.log(`rotacionado: Direita: ${rotatedDireita}, Esquerda: ${rotatedEsquerda}`)
            
            if(rotatedDireita){
                p5.translate(x + (ROTATE_DIREITA), y)
                p5.rotate(90)
            } else {
                p5.translate(x + (ROTATE_ESQUERDA), y)
                p5.rotate(-90)
            }
            p5.image(carro, 0, 0, carWidth, carHeight);
            p5.pop()
        }

        if(colisaoTopCenter()){
            colision = true
            return
        } else {
            //reseta a movimentação quando os comandos terminam
            if(frame > frameLimit){
                dispatch({ type : "SET_EXECUTION", value: false })
                executedWasPressed = false
                frame = 0
            }
        }

        
        
    }

    const preload = (p5: p5Types) => {
        imageBackground = p5.loadImage(background)
        imageSuccessBackground = p5.loadImage(successBackground)
        imageExplosion = p5.loadImage(explosion)
        imageErrorBackground = p5.loadImage(errorBackground)
        carro = p5.loadImage(car)
    }

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.createCanvas(800, 350).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES)
	};

	const draw = (p5: p5Types) => {
        

        if(!success){
            p5.frameRate(frameRate)
            p5.image(imageBackground, 0,0);
    

            //ponto de colisao
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

            if(colision){
                setCar(p5)
                p5.image(imageErrorBackground, 0,0);
                p5.image(imageExplosion, (x + carWidth) - 25, y, 50, 50);
                return

            }
        } else {
            p5.push()
                setCar(p5)
            p5.pop()
            p5.image(imageSuccessBackground, 0,0);
        }
	};


	return (
        <Container>
            <Sketch setup={setup} draw={draw} preload={preload} /> 
        </Container>
    )
}



  
