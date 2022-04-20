import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { Container } from "./styles";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'

export default function SugestionCodes(){   


	const sugestionsFaseOne = useSelector((state: RootStateOrAny) => state.suggestions.data)
	const valueExecution = useSelector((state: RootStateOrAny) => state.actions.execution)

	const dispatch = useDispatch()

    const [ sugestions, setSugestions ] = useState(sugestionsFaseOne)

    const onDragEnd = (result: DropResult) => {
		
		const { source, destination } = result
		
		if(!destination) return

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

			if(valueExecution){
				dispatch({ type: 'ADD_INPUT' , items: sugestions})
			}
		}
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
				<Droppable droppableId="suggestions">
					{(provided) => (
						<div className="suggestions" {...provided.droppableProps} ref={provided.innerRef}>
							{sugestions.map(({ id, text }, index) => {
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