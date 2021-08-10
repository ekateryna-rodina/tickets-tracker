import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/constants";

interface IDropWrapperProps {
  onDrop: any;
  status: string;
}

const DropWrapper: React.FC<IDropWrapperProps> = ({
  onDrop,
  status,
  children,
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: (item, monitor) => {
      return true;
    },
    drop: (item: any, monitor: DropTargetMonitor<any>) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver,
    }),
  });
  return <div ref={drop}>{children}</div>;
  //   return <div ref={drop}>{React.cloneElement(children, { isOver })}</div>;
};

export default DropWrapper;
