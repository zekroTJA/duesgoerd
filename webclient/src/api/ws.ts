import { Observable } from "rxjs";
import { Event, EventCode, Operation } from "./models";

export const init = (addr: string) => {
  const ws = new WebSocket(addr);

  const observer = new Observable<Event>((subscriber) => {
    ws.onmessage = (e) => {
      const event = JSON.parse(e.data) as Event;
      if (!event.code) return;
      subscriber.next(event);
    };
  });

  const send = <T>(op: Operation<T>) => {
    ws.send(JSON.stringify(op));
  };

  return { send, observer };
};
