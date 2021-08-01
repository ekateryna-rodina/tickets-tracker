import React from "react";
import { Button } from "react-bootstrap";
import Card from "../components/Card";
import CardUsers from "../components/CardUsers";
import boardStyles from "../styles/Board.module.scss";
interface BoardProps {
  boardData: {};
}
export default function Board({ boardData }: BoardProps) {
  let columnNames = [
    "Backlog",
    "In progress",
    "Code review",
    "Testing",
    "Deployment",
    "Blocked",
    "Done",
  ];
  const renderColumn = (c: string) => {
    return (
      <div className={boardStyles.column}>
        <h3>{c}</h3>
        <div className={boardStyles.content}>
          <Card />
        </div>
      </div>
    );
  };
  const renderColumns = () => {
    return (
      <div>
        <div className="d-flex flex-row justify-content-between align-items-center mt-2">
          <h2>Project Name</h2>
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
            <DropdownMultiselect />
            <div
              className="rounded"
              style={{
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <i
                className="fas fa-hourglass-half fa-lg"
                style={{ color: "rgba(0, 0, 0, 0.7)" }}
              ></i>
              <i
                className="fas fa-hourglass-end fa-lg ms-3"
                style={{ color: "rgba(0, 0, 0, 0.7)" }}
              ></i>
            </div>
            <div
              className="ms-1"
              style={{
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <i
                className="fas fa-exclamation-circle fa-lg"
                style={{ color: "rgba(0, 0, 0, 0.7)" }}
              ></i>
            </div>
          </div>
        </div>
        <div className={boardStyles.columns}>
          {columnNames.map((c) => renderColumn(c))}
        </div>
      </div>
    );
  };
  return <div className={boardStyles.container}>{renderColumns()}</div>;
}

// export const getStaticProps = async () => {
//   const res = await fetch("");
//   const boardData = res.json();
//   return {
//     props: {
//       boardData,
//     },
//   };
// };
