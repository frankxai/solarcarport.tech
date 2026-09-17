import fs from 'node:fs';

const tabs = await (await fetch('http://127.0.0.1:9224/json')).json();
const tab = tabs.find((item) => item.type === 'page');
if (!tab) throw new Error('No Chrome page target found');

const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const eventWaiters = new Map();

ws.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
    return;
  }
  const waiters = eventWaiters.get(message.method);
  if (waiters?.length) waiters.shift()(message.params);
};

await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});

const call = (method, params = {}) => new Promise((resolve, reject) => {
  const requestId = ++id;
  pending.set(requestId, { resolve, reject });
  ws.send(JSON.stringify({ id: requestId, method, params }));
});
const event = (method) => new Promise((resolve) => {
  const waiters = eventWaiters.get(method) ?? [];
  waiters.push(resolve);
  eventWaiters.set(method, waiters);
});

await call('Page.enable');
await call('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: 390,
  screenHeight: 844,
});
await call('Page.reload', { ignoreCache: true });
await event('Page.loadEventFired');
await new Promise((resolve) => setTimeout(resolve, 750));
const metrics = await call('Runtime.evaluate', {
  expression: 'JSON.stringify({innerWidth,innerHeight,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,dpr:devicePixelRatio,h1:document.querySelector("h1").getBoundingClientRect().toJSON()})',
  returnByValue: true,
});
const screenshot = await call('Page.captureScreenshot', {
  format: 'png',
  fromSurface: true,
  captureBeyondViewport: false,
});
const output = new URL('./evidence/solarcarport-mobile-cdp-390.png', import.meta.url);
fs.mkdirSync(new URL('./evidence/', import.meta.url), { recursive: true });
fs.writeFileSync(output, Buffer.from(screenshot.data, 'base64'));
console.log(metrics.result.value);
console.log(output.pathname);
ws.close();
