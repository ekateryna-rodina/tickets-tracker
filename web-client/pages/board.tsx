import Card from "../components/Card";
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
      <div className={boardStyles.columns}>
        {columnNames.map((c) => renderColumn(c))}
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
