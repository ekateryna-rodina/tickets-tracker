import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";

interface IDraggableProps {
  card: {};
  index: number;
  moveItem: Function;
  status: string;
}
const Draggable: React.FC<IDraggableProps> = ({
  card,
  index,
  moveItem,
  status,
  children,
}) => {
  let ref = useRef<any>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: any, monitor) {
      console.log("hover");
      console.log(item);
      if (!ref.current || !item) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      console.log(dragIndex, hoverIndex);
      if (dragIndex === hoverIndex) return;

      const hoveredRectangle = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRectangle.bottom - hoveredRectangle.top) / 2;
      const hoverMousePosition = monitor.getClientOffset();
      const hoverClientY = hoverMousePosition!.y - hoveredRectangle?.top;
      console.log(hoverMiddleY, hoverClientY);
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverMiddleY > hoverClientY) return;

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { type: ItemTypes.CARD, ...card, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(drop(ref));
  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
        height: "30px",
        margin: "5px",
        backgroundColor: "red",
      }}
    >
      {/* <div style={{ border: "1px solid red", height: "30px" }}></div> */}
      {/* {children} */}
    </div>
  );
};

export default Draggable;
