import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { Container } from './styles'

enum suggestionOptions {
	AVANCAR = "AVANÇAR",
	VIRAR_DIREITA = "VIRAR DIREITA",
	VIRAR_ESQUERDA = "VIRAR ESQUERDA",
}

export default function InputCodeArea(){

	const store = useAppSelector((state) => state)

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
			background: isDragging ? "#4a2975" : backgroundColor,
			color: isDragging ? "#fff" : "black",
			border: `1px solid black`,
			fontSize: `20px`,
			borderRadius: `5px`,
		
			...draggableStyle
		}
	}

	const getStore = () => {
		return store.inputs
	}

    const [ inputs, setInputs ] = useState(getStore().data)

	useEffect(() => {
		setInputs(getStore().data)
	}, [getStore().data])
    
    const onDragEnd = (result: DropResult) => {
		
		const { source, destination } = result

		console.log(source, destination)
		
		if(!destination) return

		if(source.droppableId === destination?.droppableId){

			console.log(source.index)
			console.log(destination.index)

			const movedItem = inputs[source.index]
			console.log(movedItem)

			console.log("items", inputs)

			inputs.splice(source.index, 1)
			inputs.splice(destination.index, 0, movedItem)
			
			// setInputs(inputs)

			// setInputs("ADD_INPUT", sugestions)
			// console.log(inputs)	
			
		} else {
			console.log(result)
		}
	}



    return (
        <Container >
            <h2>INPUTS</h2>
			<div className="suggestionContainer">
				<DragDropContext onDragEnd={onDragEnd} >
					<Droppable droppableId="inputs">
						{(provided) => (
							<div className="inputs" {...provided.droppableProps} ref={provided.innerRef}>
								{provided.placeholder}
								{inputs.map(({ id, text }, index) => {
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