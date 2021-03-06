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
  const renderSingleAvatar = (src: string, key: string) => {
    let sizeClass = size == 1 ? cardUsersStyles.large : cardUsersStyles.small;
    return (
      <div
        key={key}
        className={cardUsersStyles.avatar}
        style={{ height: size == 2 ? 25 : 45, width: size == 2 ? 25 : 45 }}
      >
        <Image
          className="border border-white rounded-circle"
          src={src}
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
        {images.map((src, ind) => renderSingleAvatar(src, `${ind}`))}
      </div>
    );
  };
  return <div>{renderAvatars()}</div>;
};

export default CardUsers;
