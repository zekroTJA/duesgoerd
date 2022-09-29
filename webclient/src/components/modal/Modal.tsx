import style from "./Modal.module.scss";
import { children, Component, JSX } from "solid-js";

type Props = {
  children: JSX.Element;
};

export const Modal: Component<Props> = (props) => {
  const c = children(() => props.children);
  return (
    <div class={style.Modal}>
      <div>{c()}</div>
    </div>
  );
};
