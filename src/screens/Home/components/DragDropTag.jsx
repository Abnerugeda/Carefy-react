import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightgrey" : "white",
  padding: grid,
  width: 250,
});

const DragDropTag = () => {
  const [state, setState] = useState({
    items: getItems(10),
    selected: getItems(5, 10),
  });

  const id2List = {
    droppable: "items",
    droppable2: "selected",
  };

  const getList = (id) => state[id2List[id]];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let updatedState = { items };

      if (source.droppableId === "droppable2") {
        updatedState = { selected: items };
      }

      setState((prevState) => ({ ...prevState, ...updatedState }));
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      setState((prevState) => ({
        ...prevState,
        items: result.droppable,
        selected: result.droppable2,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" h-96 flex flex-col overflow-scroll">
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.selected.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DragDropTag;
