import style from "./Messages.module.scss";
import { Component, For } from "solid-js";
import { Message } from "../../api/models";

type Props = {
  messages: Message[];
};

export const Messages: Component<Props> = (props) => {
  return (
    <div class={style.Messages}>
      <For each={props.messages}>
        {(message) => (
          <div class={message.is_self ? style.SelfMessage : style.Message}>
            <span>{message.display_name}</span>
            {message.message}
          </div>
        )}
      </For>
    </div>
  );
};
