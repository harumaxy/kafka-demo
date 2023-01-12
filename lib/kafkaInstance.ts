import { Kafka, logLevel } from "kafka";

const host = "localhost";
const port = 9092;

export const kafka = (clientId: string) =>
  new Kafka({
    logLevel: logLevel.DEBUG,
    logCreator: (logLevel) => (entry) => {
      // console.log(entry.log.message);
    },
    brokers: [`${host}:${port}`],
    clientId,
  });
