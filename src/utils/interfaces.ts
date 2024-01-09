import WebSocket from 'ws';

export interface socket {
  id: string | null,
  websocket: WebSocket | null
}

export interface userDbResult {
  element_exists: number
}
