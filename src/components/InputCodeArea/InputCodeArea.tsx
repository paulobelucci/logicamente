import { useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { Container } from './styles'


export default function InputCodeArea(){


    const items = [
        {
            id: "1",
            text: "Input 1",
        },
        {
            id: "2",
            text: "Input 2",
        },
        {
            id:  "3",
            text: "Input 3",
        },
        {
            id: "4",
            text: "Input 4",
        },
        {
            id: "5",
            text: "Input 5",
        },
    ]
    
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
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(inputs)
		const [ newOrder ] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setInputs(items)

        console.log(inputs.reverse())
	}

    return (
        <Container >
            <h3>Input</h3>
            <DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="todo">
					{(provided) => (
						<div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
							{inputs.map(({ id, text }, index) => {
								return (
									<Draggable key={id} draggableId={id} index={index}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
												{text}
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