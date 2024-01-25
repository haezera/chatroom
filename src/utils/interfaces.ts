import WebSocket from 'ws';

export interface socket {
  id: string | null,
  websocket: WebSocket | null
}

export interface userDbResult {
  element_exists: number
}

export interface pairing {
  session: string;
}

export interface message {
  username: string;
  message: string;
}

export interface roomEvent {
  room: string;
  session: string;
}
