import Image from "next/image";
import React from "react";
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
      <CardUsers />
      <div className={cardStyles.metaData}>
        <div className={cardStyles.attachments}></div>
        <div className={cardStyles.comments}></div>
      </div>
    </div>
  );
};

export default Card;
