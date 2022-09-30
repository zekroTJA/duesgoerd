import styles from "./Footer.module.scss";
import { Component, mergeProps } from "solid-js";

type Props = {
  value: string;
  onValueChange: (v: string) => void;
  onSend: () => void;
};

export const Footer: Component<Props> = (props) => {
  const merged = mergeProps({ onChange: () => {}, onSend: () => {} }, props);

  const send = () => {
    if (!merged.value) return;
    merged.onSend();
  };

  return (
    <div class={styles.Footer}>
      <input
        value={merged.value}
        onInput={(e) => merged.onValueChange(e.currentTarget.value)}
        onKeyPress={(e) => e.key == "Enter" && send()}
      />
      <button disabled={!merged.value} onclick={() => send()}>
        <img src="src/assets/send.svg" />
      </button>
    </div>
  );
};
