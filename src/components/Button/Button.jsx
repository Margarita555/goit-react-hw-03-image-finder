import s from "./Button.module.css";

const Button = ({ onMoreBtnClick }) => {
  return (
    <button className={s.button} onClick={onMoreBtnClick}>
      Load more
    </button>
  );
};

export default Button;
