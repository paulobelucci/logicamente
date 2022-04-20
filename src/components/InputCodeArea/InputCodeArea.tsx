import { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { RootStateOrAny, useSelector } from 'react-redux'
import { Container } from './styles'


export default function InputCodeArea(){

    const items = useSelector((state: RootStateOrAny) => state.inputs.data)

    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        padding: 10,
        margin: `0 50px 15px 50px`,
        background: isDragging ? "#4a2975" : "white",
        color: isDragging ? "white" : "black",
        border: `1px solid black`,
        fontSize: `20px`,
        borderRadius: `5px`,
    
        ...draggableStyle
    })

    const [ inputs, setInputs ] = useState(items)
    
    const onDragEnd = (result: DropResult) => {
		console.log(result)
		const { source, destination } = result
		if (destination) {
			console.log("source...", source)
			console.log("destination...", destination)

			const items = Array.from(inputs)
			const [ newOrder ] = items.splice(source.index, 1)
			items.splice(destination.index, 0, newOrder)

			setInputs(items)

			console.log(inputs.reverse())
		}
	}

    return (
        <Container >
            <h3>Inputs</h3>
            <DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="inputs">
					{(provided) => (
						<div className="inputs" {...provided.droppableProps} ref={provided.innerRef}>
							{inputs.map(({ id, text }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index} >
										{(provided, snapshot) => (
											<div>
												
												<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
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
        </Container>
    )
}