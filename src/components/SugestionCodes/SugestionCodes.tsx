import { useState } from "react";
import { useAppSelector, useAppDispatch } from '../../hooks'
import { DragDropContext, Draggable, DragUpdate, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { Container } from "./styles";

enum suggestionOptions {
	AVANCAR = "AVANÇAR",
	VIRAR_DIREITA = "VIRAR DIREITA",
	VIRAR_ESQUERDA = "VIRAR ESQUERDA",
}

export default function SugestionCodes(){   

	

	const dispatch = useAppDispatch()
	const selector = useAppSelector((state) => state)

	function setInputs(type: string, items: any){
		dispatch({ type , items})
	}
	
	const getInputs = () => {
		return selector.inputs.data
	}


	const sugestionsFaseOne = useAppSelector((state) => state.suggestions.data)
	
	const valueExecution = useAppSelector((state) => state.actions.execution)


    const [ sugestions, setSugestions ] = useState(sugestionsFaseOne)

    const onDragEnd = (result: DropResult) => {
		
		const { source, destination } = result
		
		// if(!destination) return

		if(source.droppableId === destination?.droppableId){

			console.log(source.index)
			console.log(destination.index)

			const movedItem = sugestions[source.index]
			console.log(movedItem)

			console.log("items", sugestionsFaseOne)

			sugestionsFaseOne.splice(source.index, 1)
			sugestionsFaseOne.splice(destination.index, 0, movedItem)
			
			setSugestions(sugestionsFaseOne)

			console.log(valueExecution)

			// setInputs("ADD_INPUT", sugestions)
			// const inputs = getInputs()
			// console.log(inputs)	
			
		} else {
			
			setInputs("ADD_INPUT", sugestions[source.index])
			sugestionsFaseOne.splice(source.index, 1)
			console.log(getInputs())
		}
	}

	const getColor = (text: string) => {
		if(text === suggestionOptions.AVANCAR){
			return "#8FF8A4"
		} else if (text === suggestionOptions.VIRAR_DIREITA){
			return "#FDFB8D"
		} else {
			return "#8DFDF8"
		}
	}

    const getItemStyle = function (isDragging: boolean, draggableStyle: any, text: string){

		const backgroundColor = getColor(text)

		return {
			padding: 10,
			margin: `0 50px 15px 50px`,
			background: isDragging ? "#4a2979" : backgroundColor,
			color: isDragging ? "#fff" : "black",
			border: `1px solid black`,
			fontSize: `20px`,
			borderRadius: `5px`,
		
			...draggableStyle
		}
	}

    return (
        <Container>
            <h2>SUGESTÕES</h2>
			<div className="suggestionContainer">
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="suggestions">
						{(provided) => (
							<div className="suggestions" {...provided.droppableProps} ref={provided.innerRef}>
								{provided.placeholder}
								{sugestions.map(({ id, text }, index) => {
									return (
										<Draggable key={id} draggableId={id} index={index} >
											{(provided, snapshot) => (
												<div>
													
													<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, text)}
													>
														{text}
													</div>
												</div>
												
											)}
											
										</Draggable>
									)
								})}
							</div>
						)}
						
					</Droppable>
				</DragDropContext>
			</div>
            
        </Container>
    )
}