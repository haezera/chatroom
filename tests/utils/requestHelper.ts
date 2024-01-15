import request, { HttpVerb } from 'sync-request';
import { IncomingHttpHeaders } from 'http';
/// GET CONFIGURATION CONSTANTS
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

const SERVER_URL = `http://${HOST}:${PORT}`;
const TIMEOUT_MS = 15000;
// Helpers
/**
 * Adds params to url, e.g.
 *     parseRouteParams('/post/:postid', { postid: 999 }) => /post/999
 */
const parseRouteParams = (route: string, params: Record<string, string>): string =>
  Object.entries(params).reduce((route, [key, value]) => route.replace(`:${key}`, value.toString()), route);

const requestHelper = (method: HttpVerb, path: string, payload: object, headers: IncomingHttpHeaders) => {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }
  const res = request(method, SERVER_URL + path, { qs, json, headers, timeout: TIMEOUT_MS });
  if (res.statusCode !== 200) {
    return res.statusCode;
  }
  return JSON.parse(res.body.toString());
};

export const requestUserCreate = (
  username: string,
  email: string,
  password: string
) => {
  return requestHelper('POST', '/v1/auth/user/create', { username, email, password }, { });
};

export const requestUserLogin = (
  email: string,
  password: string
) => {
  return requestHelper('PUT', '/v1/auth/user/login', { email, password }, { });
};

export const requestUserLogout = (session: string) => {
  return requestHelper('DELETE', '/v1/auth/user/logout', { }, { session });
};

export const requestClear = () => {
  return requestHelper('DELETE', '/v1/auth/clear', { }, { });
};

export const requestGetSessions = (password: string) => {
  return requestHelper('GET', '/v1/auth/admin/sessions', { }, { password });
};

export const requestRoomCreate = (session: string, password: string, name: string) => {
  return requestHelper('POST', '/v1/room/create', { password, name }, { session });
};

export const requestRoomDelete = (session: string, roomId: string) => {
  return requestHelper('DELETE', '/v1/room/delete', { roomId }, { session });
};

export const requestRoomJoin = (session: string, roomId: string) => {
  return requestHelper('PUT', parseRouteParams('/v1/room/:roomId/join', { roomId: roomId }), { roomId }, { session });
};

export const requestRoomLeave = (session: string, roomId: string) => {
  return requestHelper('DELETE', parseRouteParams('/v1/room/:roomId/leave', { roomId: roomId }), { roomId }, { session });
};
