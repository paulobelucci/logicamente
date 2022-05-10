
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import {Container} from './styles'


enum Directions {
    LEFT = "L",
    RIGHT = "R"
}
interface ComponentProps {
	//Your component props
}
//ponto A
let x1 = 20
let y1 = 20

//ponto B
let x2 = 40
let y2 = 30

//ponto C
let x3 = 20
let y3 = 40




export default function PresentationGame(props: ComponentProps){

    

    function buttonEsquerda(p5: p5Types){
        p5.createButton("ESQUERDA").mousePressed(() => move(p5, Directions.LEFT))
    }

    function buttonDireita(p5: p5Types){
        p5.createButton("DIREITA").mousePressed(() => move(p5, Directions.RIGHT))
    }

    function move(p5: p5Types, direction?: String){
    
        if(direction === Directions.LEFT){
            x1 -= 10
            // y1 -= 1
            x2 -= 10
            // y2 -= 1
            x3 -= 10
            // y3 -= 1
        } else if(direction === Directions.RIGHT) {
            x1 += 10
            // y1 += 1
            x2 += 10
            // y2 += 1
            x3 += 10
            // y3 += 1
        } 

        
        
    }


    //See annotations in JS for more information
	const setup = (p5: p5Types, canvasParentRef: Element) => {
        const background = p5.loadImage('assets/background.jpeg');
		p5.createCanvas(800, 300).parent(canvasParentRef);
        buttonEsquerda(p5)
        buttonDireita(p5)
	};

	const draw = (p5: p5Types) => {
        p5.frameRate(30)
        p5.background(100);
        const rect1 = p5.rect(0, 50, 100, 300);
        rect1.fill(100, 255, 51)
        
        const rect2 = p5.rect(150, 0, 200, 250);
        rect2.fill(100, 255, 51)

        const triangule = p5.triangle(x1, y1, x2, y2, x3, y3);
        triangule.fill(100,33,22)
	};


	return <Sketch setup={setup} draw={draw} />;
}



  
