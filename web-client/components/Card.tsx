import Image from "next/image";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import pic from "../assets/images/randomCard.jpg";
import cardStyles from "../styles/Card.module.scss";
import CardUsers from "./CardUsers";

interface ICardProps {
  id: string;
  title: string;
  storyName: string;
}
const Card = (props: ICardProps) => {
  const { id, title, storyName } = props;

  return (
    <div className={`${cardStyles.container}`}>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ width: "100%" }}
      >
        <div className={cardStyles.storyName}>{storyName}</div>
        <div className={cardStyles.actions}>
          <div className={cardStyles.id}>{id}</div>
        </div>
      </div>
      <div className={cardStyles.name}>{title}</div>
      <div className={cardStyles.image}>
        <Image alt="" src={pic} layout="responsive" />
      </div>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        <CardUsers size={2} />
        <div className={cardStyles.metaData}>
          {/* <span>Sept, 5</span> */}
          {true && <i className="fas fa-hourglass-end fa-lg"></i>}
          {true && <i className="fas fa-paperclip fa-lg"></i>}
          {true && <i className="far fa-comments fa-lg"></i>}
        </div>
      </div>
      <div className="w-100 mt-3">
        <ProgressBar variant="success" now={40} style={{ height: "0.2rem" }} />
      </div>
    </div>
  );
};

export default Card;
