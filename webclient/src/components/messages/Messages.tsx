import style from "./Messages.module.scss";
import { Component, createEffect, For } from "solid-js";
import { Message } from "../../api/models";

type Props = {
  messages: Message[];
};

export const Messages: Component<Props> = (props) => {
  let msgbox: HTMLDivElement | undefined = undefined;

  createEffect(() => {
    if (props.messages && msgbox) {
      msgbox.scrollTo(0, msgbox.scrollHeight);
    }
  });

  return (
    <div class={style.Messages} ref={msgbox}>
      <For each={props.messages}>
        {(message) => (
          <div
            class={
              message.is_system
                ? style.SystemMessage
                : message.is_self
                ? style.SelfMessage
                : style.Message
            }
          >
            <span>{message.display_name}</span>
            {message.message}
          </div>
        )}
      </For>
    </div>
  );
};
