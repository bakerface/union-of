import { unionOf, TypeOf } from ".";

const DeviceEvents = unionOf({
  Disconnected: {
    at: Date,
    host: String,
    port: Number,
  },
  Connected: {
    at: Date,
    host: String,
    port: Number,
  },
  ReceivedDataFromDevice: {
    at: Date,
    host: String,
    port: Number,
    data: String,
  },
  SentDataToDevice: {
    at: Date,
    host: String,
    port: Number,
    data: String,
  },
});

export type DeviceEvent = TypeOf<typeof DeviceEvents>;

const toMessage = DeviceEvents.caseOf({
  Connected({ at, host, port }) {
    return `Connected to device ${host}:${port} at ${at.toISOString()}`;
  },
  Disconnected({ at, host, port }) {
    return `Disconnected from device ${host}:${port} at ${at.toISOString()}`;
  },
  ReceivedDataFromDevice({ at, host, port, data }) {
    return `Received "${data}" from device ${host}:${port} at ${at.toISOString()}`;
  },
  SentDataToDevice({ at, host, port, data }) {
    return `Sent "${data}" to device ${host}:${port} at ${at.toISOString()}`;
  },
});

const host = "localhost";
const port = 80;

const events: DeviceEvent[] = [
  DeviceEvents.Connected({ host, port, at: new Date() }),
  DeviceEvents.SentDataToDevice({
    host,
    port,
    at: new Date(),
    data: "GET / HTTP/1.0",
  }),
  DeviceEvents.ReceivedDataFromDevice({
    host,
    port,
    at: new Date(),
    data: "HTTP/1.0 200 OK",
  }),
  DeviceEvents.Disconnected({ host, port, at: new Date() }),
];

events.map(toMessage).map((message) => console.log(message));
