import request, { HttpVerb } from 'sync-request-curl';

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const SERVER_URL = `http://${HOST}:${PORT}}`;
// Helpers
/**
 * Adds params to url, e.g.
 *     parseRouteParams('/post/:postid', { postid: 999 }) => /post/999
 */
const parseRouteParams = (route: string, params: Record<string, number>): string =>
  Object.entries(params).reduce((route, [key, value]) => route.replace(`:${key}`, value.toString()), route);

const requestHelper = (method: HttpVerb, path: string, payload: object) => {
  let qs = {};
  let json = {};
  if (['GET', 'DELETE'].includes(method)) {
    qs = payload;
  } else {
    // PUT/POST
    json = payload;
  }
  const res = request(method, SERVER_URL + path, { qs, json, timeout: 10000 });
  if (res.statusCode !== 200) {
    return res.statusCode;
  }
  return JSON.parse(res.body.toString());
};

const requestUserCreate = (
    username: string, 
    email: string, 
    password: string
) => {
    
}
