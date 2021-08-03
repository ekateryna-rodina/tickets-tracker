import React from "react";
import { Button } from "react-bootstrap";
import { Provider } from "react-redux";
import Select from "react-select";
import store from "../applicationState/store";
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
  const multiselectOptions = [
    { value: "backlog", label: "Backlog" },
    { value: "progress", label: "In progress" },
    { value: "review", label: "Code review" },
    { value: "testing", label: "Testing" },
    { value: "deployment", label: "Deployment" },
    { value: "blocked", label: "Blocked" },
    { value: "done", label: "Done" },
  ];
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over");
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drop");
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter");
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave");
  };
  const renderColumn = (c: string) => {
    return (
      <div className={boardStyles.column}>
        <h4>{c}</h4>
        <div
          className={boardStyles.content}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
        >
          <Card />
        </div>
      </div>
    );
  };
  const renderColumns = () => {
    return (
      <div className={boardStyles.columns}>
        {columnNames.map((c) => renderColumn(c))}
      </div>
    );
  };
  return (
    <Provider store={store}>
      <div className={boardStyles.container}>
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
            <div style={{ minWidth: "200px" }}>
              <Select
                options={multiselectOptions}
                closeMenuOnSelect={false}
                defaultValue={[
                  multiselectOptions[0],
                  multiselectOptions[1],
                  multiselectOptions[2],
                  multiselectOptions[3],
                  multiselectOptions[4],
                  multiselectOptions[5],
                  multiselectOptions[6],
                ]}
                isMulti
              />
            </div>
            <div
              className="rounded ms-2"
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
        {renderColumns()}
      </div>
    </Provider>
  );
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
