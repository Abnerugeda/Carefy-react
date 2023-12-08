import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TagIcon } from "lucide-react";
import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { data } from "autoprefixer";
const urlApi = import.meta.env.VITE_URL_API;

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

const DragDropTag = ({ setSelectedTag, selectedTag }) => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(selectedTag);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${urlApi}/tags`);
      const responseData = response.data.data;

      const filteredData = responseData.filter(
        (item) =>
          !selectedData.some(
            (selectedItem) => selectedItem.Codigo_Tag === item.Codigo_Tag
          )
      );

      setData(filteredData);
    }
    fetchData();
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedItems = reorder(
        source.droppableId === "droppable" ? data : selectedData,
        source.index,
        destination.index
      );

      if (source.droppableId === "droppable") {
        setData(reorderedItems);
      } else {
        setSelectedData(reorderedItems);
      }
    } else {
      const result = move(
        source.droppableId === "droppable" ? data : selectedData,
        destination.droppableId === "droppable" ? data : selectedData,
        source,
        destination
      );

      setData(result.droppable);
      setSelectedData(result.droppable2);
      setSelectedTag(result.droppable2);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="m-2 h-96 w-1/2 flex flex-col gap-5">
        <Typography className="-mb-2" variant="h6">
          Suas Tags cadastradas
        </Typography>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} className=" h-96 overflow-scroll">
              {data.map((item, index) => (
                <Draggable
                  key={item.Codigo_Tag}
                  draggableId={item.Codigo_Tag}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex gap-3 p-2"
                    >
                      <TagIcon color={item.Cor} />
                      {item.Nome}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Typography className="-mb-2" variant="h6">
          Arraste aqui a tag do seu paciente
        </Typography>
        <Droppable droppableId="droppable2">
          {(provided) => (
            <div className=" h-96 overflow-scroll" ref={provided.innerRef}>
              {selectedData.map((item, index) => (
                <Draggable
                  key={item.Codigo_Tag}
                  draggableId={item.Codigo_Tag}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex h-[50px] gap-3 p-2"
                    >
                      <TagIcon color={item.Cor} />
                      {item.Nome}
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
