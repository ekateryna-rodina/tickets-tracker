import React from "react";
import dragOverZoneStyles from "../styles/DragOverZone.module.scss";

interface IDragOverZoneProps {
  isOver: boolean;
}
const DragOverZone: React.FC<IDragOverZoneProps> = ({ isOver, children }) => {
  const getStyles = () => {
    return isOver ? dragOverZoneStyles.highlightZone : "";
  };
  return <div className={`${getStyles()}`}>{children}</div>;
};

export default DragOverZone;
