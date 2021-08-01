import Image from "next/image";
import React from "react";
import cardUsersStyles from "../styles/CardUsers.module.scss";

interface ICardUsersProps {
  size: 1 | 2;
}

const CardUsers = (props: ICardUsersProps) => {
  const { size } = props;
  const images = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDk3Mzh8MHwxfHNlYXJjaHwxfHxhdmF0YXJ8ZW58MHx8fHwxNjI3NDM0NDU1&ixlib=rb-1.2.1&q=80&w=200",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDk3Mzh8MHwxfHNlYXJjaHwxfHxhdmF0YXJ8ZW58MHx8fHwxNjI3NDM0NDU1&ixlib=rb-1.2.1&q=80&w=200",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDk3Mzh8MHwxfHNlYXJjaHwxfHxhdmF0YXJ8ZW58MHx8fHwxNjI3NDM0NDU1&ixlib=rb-1.2.1&q=80&w=200",
  ];
  const renderSingleAvatar = (i) => {
    let sizeClass = size == 1 ? cardUsersStyles.large : cardUsersStyles.small;
    return (
      <div
        className={cardUsersStyles.avatar}
        style={{ height: size == 2 ? 30 : 50, width: size == 2 ? 30 : 50 }}
      >
        <Image
          className="border border-white rounded-circle"
          src={i}
          alt=""
          width={0}
          height={0}
          layout="responsive"
        />
      </div>
    );
  };
  const renderAvatars = () => {
    return (
      <div className={cardUsersStyles.container}>
        {images.map((i) => renderSingleAvatar(i))}
      </div>
    );
  };
  return <div>{renderAvatars()}</div>;
};

export default CardUsers;
