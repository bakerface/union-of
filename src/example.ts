import { unionOf, TypeOf } from ".";

const Device = unionOf({
  Local: {
    path: String,
  },
  Remote: {
    host: String,
    port: Number,
  },
});

const Data = unionOf({
  Some: String,
  None: undefined,
});

const DeviceEvents = unionOf({
  Disconnected: {
    at: Date,
    device: Device,
  },
  Connected: {
    at: Date,
    device: Device,
  },
  ReceivedDataFromDevice: {
    at: Date,
    device: Device,
    data: Data,
  },
  SentDataToDevice: {
    at: Date,
    device: Device,
    data: Data,
  },
});

type DeviceEvent = TypeOf<typeof DeviceEvents>;

const toDeviceName = Device.caseOf({
  Local: ({ path }) => `local device at "${path}"`,
  Remote: ({ host, port }) => `remote device at "${host}:${port}"`,
});

const toTimeStamp = (date: Date) => date.toISOString();

const toPrintableData = Data.caseOf({
  None: () => "an empty data packet",
  Some: (data) => `the data packet "${data}"`,
});

const toMessage = DeviceEvents.caseOf({
  Connected({ at, device }) {
    return `Connected to ${toDeviceName(device)} at ${toTimeStamp(at)}`;
  },
  Disconnected({ at, device }) {
    return `Disconnected from ${toDeviceName(device)} at ${toTimeStamp(at)}`;
  },
  ReceivedDataFromDevice({ at, device, data }) {
    return `Received ${toPrintableData(data)} from ${toDeviceName(
      device
    )} at ${toTimeStamp(at)}`;
  },
  SentDataToDevice({ at, device, data }) {
    return `Sent ${toPrintableData(data)} to ${toDeviceName(
      device
    )} at ${toTimeStamp(at)}`;
  },
});

const device = Device.Remote({
  host: "www.example.com",
  port: 80,
});

const events: DeviceEvent[] = [
  DeviceEvents.Connected({ at: new Date(), device }),
  DeviceEvents.SentDataToDevice({
    at: new Date(),
    device,
    data: Data.Some("GET / HTTP/1.0"),
  }),
  DeviceEvents.SentDataToDevice({
    at: new Date(),
    device: Device.Local({ path: "COM1" }),
    data: Data.None(),
  }),
  DeviceEvents.ReceivedDataFromDevice({
    at: new Date(),
    device,
    data: Data.Some("HTTP/1.0 200 OK"),
  }),
  DeviceEvents.Disconnected({
    at: new Date(),
    device,
  }),
];

events.map(toMessage).map((message) => console.log(message));
