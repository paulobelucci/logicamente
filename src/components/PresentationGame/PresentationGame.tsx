import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import {Container} from './styles'
import background from '../../assets/images/background_edited.png'
import car from '../../assets/images/yellow_car.png'

let x = 20
let y = 100
let carWidth = 100
let carHeight = 50

let imageBackground: p5Types.Image;
let carro: p5Types.Image;

enum Directions {
    LEFT = "L",
    RIGHT = "R",
    FORWARD = "F"
}



const Comands = {
    AVANCAR : { distance: carWidth, direction: Directions.FORWARD },
    VIRAR_DIREITA : { distance: carHeight, direction: Directions.RIGHT },
    VIRAR_ESQUERDA : { distance: carHeight, direction: Directions.LEFT },
}
interface ComponentProps {
	//Your component props
}


let commands = [
    Comands.AVANCAR, 
    // Comands.VIRAR_DIREITA, 
    // Comands.AVANCAR,
    // Comands.VIRAR_ESQUERDA,
    // Comands.AVANCAR, 
    // Comands.AVANCAR, 
    // Comands.VIRAR_ESQUERDA,
    // Comands.AVANCAR, 
    // Comands.VIRAR_DIREITA, 
    // Comands.AVANCAR,
]


export default function PresentationGame(props: ComponentProps){


    function move(p5: p5Types, command: any){
        let count = 0
        switch(command){
            case Comands.AVANCAR:
                while(count <= carWidth){
                    count++
                    // x++;
                    p5.image(carro, x, y, carWidth, carHeight);
                }
                break;
            default:
                break;
        }
    }

    function setCar(p5: p5Types){

        // move(Directions.RIGHT)
        commands.forEach(command => {
            return move(p5, command)
        })
        
    
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
        p5.frameRate(30)
        p5.image(imageBackground, 0,0);
        
        setCar(p5)

	};


	return (
        <Container>
         <Sketch setup={setup} draw={draw} preload={preload} />
        </Container>
        )
}



  
