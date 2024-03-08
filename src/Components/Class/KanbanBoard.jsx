import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";

const initialQuotes = Array.from({ length: 10 }, (v, k) => k).map(k => ({
  id: `id-${k}`,
  content: `Quote ${k}`
}));

const grid = 8;

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;

const Quote = ({ quote, index }) => {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided, snapshot) => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging ? 'lightgreen' : 'lightblue' // Change background color when dragging
          }}
        >
          {quote.content}
        </QuoteItem>
      )}
    </Draggable>
  );
};

const KanbanBoard = () => {
  const [quotes, setQuotes] = useState(initialQuotes);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const reorderedQuotes = reorder(
      quotes,
      result.source.index,
      result.destination.index
    );

    setQuotes(reorderedQuotes);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {quotes.map((quote, index) => (
              <Quote key={quote.id} quote={quote} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;
