import React from "react";
import { Button } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import store from "../applicationState/store";
import CardUsers from "../components/CardUsers";
import ColumnSelect from "../components/ColumnSelect";
import DragAndDrop from "../components/DragAndDrop";
import boardStyles from "../styles/Board.module.scss";

interface BoardProps {
  boardData: {};
}
const Board = ({ boardData }: BoardProps) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <div className={boardStyles.container}>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h4>Project Name</h4>
            <div className="d-flex flex-row justify-content-end align-items-center">
              <CardUsers size={1} />
              <Button variant="white" className="shadow rounded ms-2">
                <i className="fas fa-plus me-2"></i>
                Share
              </Button>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-row d-flex-row justify-content-between align-items-center">
            <Button variant="primary" className="shadow rounded ms-2 flex-1">
              <i className="fas fa-plus me-2"></i>
              Add
            </Button>
            <div className="d-flex flex-row justify-content-between align align-items-center flex-1">
              <ColumnSelect />
              <div className={`rounded ms-2 p-2 ${boardStyles.iconContainer}`}>
                <i className="fas fa-hourglass-half fa-lg"></i>
                <i className="fas fa-hourglass-end fa-lg ms-3"></i>
              </div>
              <div className={`ms-1 p-2 ${boardStyles.iconContainer}`}>
                <i className="fas fa-exclamation-circle fa-lg"></i>
              </div>
            </div>
          </div>
          <DragAndDrop />
        </div>
      </Provider>
    </DndProvider>
  );
};

export default Board;
