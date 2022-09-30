export enum OpCode {
  Join = "Join",
  Leave = "Leave",
  Message = "Message",
}

export type Operation<T> = {
  code: OpCode;
  payload?: T;
};

export type NameOp = {
  display_name: string;
};

export type Message = NameOp & {
  message: string;

  is_self: boolean;
  is_system: boolean;
};

export enum EventCode {
  Error = "Error",
  Joined = "Joined",
  Left = "Left",
  Message = "Message",
}

export type Event<T = null> = {
  code: EventCode;
  payload?: T;
};

export enum ErrorCode {
  InvalidOperation = "InvalidOperation",
  DisplayNameTaken = "DisplayNameTaken",
  DisplayNameAlreadySet = "DisplayNameAlreadySet",
  RateLimitExceeded = "RateLimitExceeded",
  NotJoined = "NotJoined",
  EmptyMessage = "EmptyMessage",
}

export type Error = {
  code: string;
  message: string;
};
