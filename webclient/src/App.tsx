import { Component, createEffect, createSignal, Show } from "solid-js";

import styles from "./App.module.scss";
import { Footer } from "./components/footer/Footer";
import {
  Message,
  NameOp,
  Event,
  EventCode,
  OpCode,
  Operation,
} from "./api/models";
import { Messages } from "./components/messages/Messages";
import { init } from "./api/ws";
import { Modal } from "./components/modal/Modal";

const App: Component = () => {
  const [newMsg, setNewMsg] = createSignal("");
  const [displayName, setDisplayName] = createSignal<string>();
  const [displayNameInpt, setDisplayNameInpt] = createSignal<string>("");
  const [messages, setMessages] = createSignal<Message[]>([]);

  const { send, observer } = init("ws://localhost:8080");

  const login = () => {
    const display_name = displayNameInpt();
    setDisplayName(display_name);
    send({ code: OpCode.Join, payload: { display_name } } as Operation<NameOp>);
  };

  const sendMsg = () => {
    const message = newMsg();
    send({ code: OpCode.Message, payload: { message } } as Operation<Message>);
    setNewMsg("");
  };

  observer.subscribe((e) => {
    switch (e.code) {
      case EventCode.Message:
        const message = (e as any as Event<Message>).payload;
        if (message) {
          if (message.display_name === displayName()) {
            message.is_self = true;
          }
          setMessages([...messages(), message]);
        }
        break;
    }
  });

  createEffect(() => {});

  return (
    <div class={styles.App}>
      <Show when={!displayName()}>
        <Modal>
          <div class={styles.DisplayNameModal}>
            <h1>Join Chat</h1>
            <span>
              Please enter below how you want to be displayed in the chat.
            </span>
            <div>
              <input
                value={displayNameInpt()}
                onInput={(e) => setDisplayNameInpt(e.currentTarget.value)}
              />
              <button disabled={!displayNameInpt()} onclick={() => login()}>
                <img src="src/assets/arrow.svg" />
              </button>
            </div>
          </div>
        </Modal>
      </Show>
      <Messages messages={messages()} />
      <Footer value={newMsg()} onValueChange={setNewMsg} onSend={sendMsg} />
    </div>
  );
};

export default App;
