import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Container } from "./styles";

export default function SugestionCodes(){   

    const items = [
        {
            id: "1",
            text: "Sugestion 1",
        },
        {
            id: "2",
            text: "Sugestion 2",
        },
        {
            id: "3",
            text: "Sugestion 3",
        },
        {
            id: "4",
            text: "Sugestion 4",
        },
        {
            id: "5",
            text: "Sugestion 5",
        },
    ]

    const [ sugestions, setSugestions ] = useState(items)

    const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(sugestions)
		const [ newOrder ] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setSugestions(items)

        console.log(sugestions.reverse())
	}

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

    return (
        <Container>
            <h3>Sugestions</h3>
            <DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="todo">
					{(provided) => (
						<div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
							{sugestions.map(({ id, text }, index) => {
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
            
        </Container>)
}