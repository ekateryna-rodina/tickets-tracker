import Image from "next/image";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import pic from "../assets/images/randomCard.jpg";
import cardStyles from "../styles/Card.module.scss";
import CardUsers from "./CardUsers";

const Card = () => {
  return (
    <div className={cardStyles.container}>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ width: "100%" }}
      >
        <div className={cardStyles.storyName}>Story name</div>
        <div className={cardStyles.actions}>
          <div className={cardStyles.id}>IK-4567</div>
          {/* <i className="fas fa-ellipsis-h"></i> */}
        </div>
      </div>
      {/* <div className={cardStyles.id}>IK-4567</div> */}
      <div className={cardStyles.name}>Add user authentification</div>
      <div className={cardStyles.image}>
        <Image alt="" src={pic} layout="responsive" />
      </div>
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        <CardUsers />
        <div className={cardStyles.metaData}>
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
