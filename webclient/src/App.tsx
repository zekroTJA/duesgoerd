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
  Error,
  ErrorCode,
} from "./api/models";
import { Messages } from "./components/messages/Messages";
import { init } from "./api/ws";
import { Modal } from "./components/modal/Modal";

const App: Component = () => {
  const [newMsg, setNewMsg] = createSignal("");
  const [displayName, setDisplayName] = createSignal<string>();
  const [displayNameInpt, setDisplayNameInpt] = createSignal<string>("");
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [error, setError] = createSignal<Error>();

  const { send, observer } = init(
    import.meta.env.SERVER_URL ?? "ws://localhost:8080"
  );

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
    if (!e) return;
    switch (e.code) {
      case EventCode.Error: {
        const ev = e as any as Event<Error>;
        if (ev.payload) {
          setError(ev.payload);
          console.error(e);
          switch (ev.payload.code) {
            case ErrorCode.DisplayNameTaken:
              setDisplayName(undefined);
          }
        }
        break;
      }
      case EventCode.Message: {
        const message = (e as any as Event<Message>).payload;
        if (message) {
          if (message.display_name === displayName()) {
            message.is_self = true;
          }
          setMessages([...messages(), message]);
        }
        break;
      }
      case EventCode.Joined: {
        const event = (e as any as Event<NameOp>).payload;
        if (event) {
          const message = {
            message: `${event.display_name} joined the chat.`,
            is_system: true,
          } as Message;
          setMessages([...messages(), message]);
        }
        break;
      }
      case EventCode.Left: {
        const event = (e as any as Event<NameOp>).payload;
        if (event) {
          const message = {
            message: `${event.display_name} left the chat.`,
            is_system: true,
          } as Message;
          setMessages([...messages(), message]);
        }
        break;
      }
    }
  });

  createEffect(() => {});

  return (
    <div class={styles.App}>
      <Show when={error() && error()?.code !== ErrorCode.DisplayNameTaken}>
        <Modal error={true}>
          <div class={styles.ErrorModal}>
            <h1>Error</h1>
            <span>
              {error()?.message} ({error()?.code})
            </span>
            <button onClick={() => setError(undefined)}>Ok</button>
          </div>
        </Modal>
      </Show>
      <Show when={!displayName()}>
        <Modal>
          <div class={styles.DisplayNameModal}>
            <h1>Join Chat</h1>
            <span>
              Please enter below how you want to be displayed in the chat.
            </span>
            <Show when={error()?.code === ErrorCode.DisplayNameTaken}>
              <div class={styles.Error}>This user name is already taken.</div>
            </Show>
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
