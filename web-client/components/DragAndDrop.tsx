import React, { useState } from "react";
import { cards as data } from "../data";
import boardStyles from "../styles/Board.module.scss";
import { TicketStatus } from "../utils/ticketStatusEnum";
import Draggable from "./Draggable";
import DragOverZone from "./DragOverZone";
import DropWrapper from "./DropWrapper";
interface CardData {
  id: string;
  title: string;
  storyName: string;
  status: string;
}

const statuses = [
  "Backlog",
  "In Progress",
  "Code Review",
  "Testing",
  "Deployment",
  "Blocked",
  "Done",
];

function DragAndDrop() {
  const [cards, setCards] = useState<CardData[]>(data);
  const onDrop = (item: CardData, monitor: any, status: string) => {
    setCards((oldList: CardData[]) => {
      const filtered = oldList.filter((c) => c.id != item.id);
      var statusVal: TicketStatus =
        TicketStatus[status as keyof typeof TicketStatus];
      let cardWithStatusUpdated = { ...item, status: statusVal };
      return [...filtered, cardWithStatusUpdated];
    });
  };
  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const item = cards[dragIndex];
    setCards((oldList: CardData[]) => {
      const newItems = oldList.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };
  console.log(cards);
  return (
    <div className={boardStyles.columns}>
      {statuses.map((s: string) => (
        <div className={boardStyles.column} key={s}>
          <h4>{s}</h4>
          {/* add media and move to class */}
          <div style={{ height: "1000px" }}>
            <div className={boardStyles.content}>
              <DropWrapper onDrop={onDrop} status={s}>
                <DragOverZone isOver={false}>
                  {cards
                    .filter((c) => {
                      return c.status === s;
                    })
                    .map((card, i) => (
                      <Draggable
                        key={card.id}
                        card={cards}
                        moveItem={moveItem}
                        status={card.status}
                        index={i}
                      >
                        <div></div>
                        {/* <Card {...{ ...cards[card] }} /> */}
                      </Draggable>
                    ))}
                </DragOverZone>
              </DropWrapper>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DragAndDrop;

// import React, { useRef, useState } from "react";
// import { cardsByGroups } from "../data";
// import boardStyles from "../styles/Board.module.scss";

// function DragAndDrop() {
//   const [dragging, setDragging] = useState(false);
//   const [groupsWithCards, setGroupsWithCards] = useState(cardsByGroups);
//   const dragItem = useRef({ group: 0, item: 0 });
//   const dragNode = useRef(null);
//   const onDragEndHandler = (e) => {
//     setDragging(false);
//     dragNode.current!.removeEventListener("dragend", onDragEndHandler);
//     dragItem.current = { group: 0, item: 0 };
//     dragNode.current = null;
//   };
//   const onDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("drop");
//   };
//   const onDragEnterHandler = (e, params: { group: number; item: number }) => {
//     const currentItemRef = dragItem.current;
//     if (dragNode.current != e.target.parentNode) {
//       setGroupsWithCards((oldList) => {
//         let newList = JSON.parse(JSON.stringify(oldList));
//         // console.log(newList);
//         const currentItem = newList[currentItemRef.group].items.splice(
//           currentItemRef.item,
//           1
//         )[0];
//         console.log(currentItem);
//         newList[params.group].items.splice(params.item, 0, currentItem);
//         // console.log(newList);
//         dragItem.current = params;
//         return newList;
//       });
//     }
//   };

//   const onDragStartHandler = (e, params: { group: number; item: number }) => {
//     dragItem.current = params;
//     dragNode.current = e.target;
//     dragNode.current!.addEventListener("dragend", onDragEndHandler);
//     setTimeout(() => {
//       setDragging(true);
//     }, 0);
//   };

//   const getStyles = (group: number, item: number) => {
//     let current = dragItem.current;
//     if (group === current.group && current.item === item) {
//       return boardStyles.current;
//     }
//     return boardStyles.card;
//   };
//   return (
//     <div className={boardStyles.columns}>
//       {groupsWithCards.map((c, ci) => (
//         <div className={boardStyles.column} key={c.title}>
//           <h4>{c.title}</h4>
//           {/* add media and move to class */}
//           <div style={{ height: "1000px" }}>
//             <div
//               className={boardStyles.content}
//               onDragEnter={(e) =>
//                 dragging && !c.items.length
//                   ? onDragEnterHandler(e, {
//                       group: ci,
//                       item: 0,
//                     })
//                   : null
//               }
//             >
//               {c.items.map((card, i) => (
//                 <div
//                   key={card.id}
//                   draggable={true}
//                   onDragEnter={(e) => {
//                     console.log(e.target);
//                     dragging && !c.items.length
//                       ? onDragEnterHandler(e, {
//                           group: ci,
//                           item: i,
//                         })
//                       : null;
//                   }}
//                   onDragStart={(e) =>
//                     onDragStartHandler(e, { group: ci, item: i })
//                   }
//                   className={dragging ? getStyles(ci, i) : boardStyles.card}
//                 >
//                   <div>{card.id}</div>
//                   {/* <Card {...{ ...card, style: getStyles(c, card.id) }} /> */}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default DragAndDrop;

// import { cards, columnNames } from "../data";
// import boardStyles from "../styles/Board.module.scss";

// function DragAndDrop() {
//   const [dragging, setDragging] = useState(false);
//   const dragItem = useRef({ group: null, item: null });
//   const dragNode = useRef(null);
//   const onDragEndHandler = (e) => {
//     setDragging(false);
//     dragNode.current!.removeEventListener("dragend", onDragEndHandler);
//     dragItem.current = null;
//     dragNode.current = null;
//   };
//   const onDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log("drop");
//   };
//   const onDragEnterHandler = (e, params: { group: string; item: string }) => {
//     // e.preventDefault();
//     // e.stopPropagation();
//     const { group, item } = params;
//     console.log("enter", group, item);
//   };
//   const onDragStartHandler = (e, params: { group: string; item: string }) => {
//     // e.preventDefault();
//     // e.stopPropagation();
//     console.log("sttart");
//     dragItem.current = params;
//     dragNode.current = e.target;
//     dragNode.current!.addEventListener("dragend", onDragEndHandler);
//     setTimeout(() => {
//       setDragging(true);
//     });
//   };

//   const renderColumn = (c: string) => {
//     const getStyles = (group, item) => {
//       let current = dragItem.current;
//       console.log("change syle", group, current.group, current.item, item);
//       if (group === current.group && current.item === item) {
//         return boardStyles.current;
//       }
//       return boardStyles.card;
//     };
//     return (
//       <div className={boardStyles.column} key={c}>
//         <h4>{c}</h4>
//         {/* add media and move to class */}
//         <div style={{ height: "1000px" }}>
//           <div className={boardStyles.content}>
//             {cards.map(
//               (card, i) =>
//                 card.group === c && (
//                   <div
//                     key={card.id}
//                     draggable={true}
//                     onDragEnter={(e) =>
//                       dragging
//                         ? onDragEnterHandler(e, { group: c, item: card.id })
//                         : null
//                     }
//                     onDragStart={(e) =>
//                       onDragStartHandler(e, { group: c, item: card.id })
//                     }
//                     className={
//                       dragging ? getStyles(c, card.id) : boardStyles.card
//                     }
//                     // style={{ backgroundColor: "red" }}
//                   >
//                     <div>{card.id}</div>
//                     {/* <Card {...{ ...card, style: getStyles(c, card.id) }} /> */}
//                   </div>
//                 )
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
//   const renderColumns = () => {
//     return (
//       <div className={boardStyles.columns}>
//         {columnNames.map((c) => renderColumn(c))}
//       </div>
//     );
//   };
//   return <div>{renderColumns()}</div>;
// }

// export default DragAndDrop;
