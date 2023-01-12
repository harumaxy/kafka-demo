import { kafka } from "../lib/kafkaInstance.ts";

const producer = kafka("producer").producer();
const getRandomNumber = () => Math.round(Math.random() * 1000);
const createMessage = (num: number) => ({
  key: `key-${num}`,
  value: `hello #${num}`,
  headers: {
    "correlation-id": `${num}-${Date.now()}`,
  },
});
const topic = "topic-test";

const sendMessage = () => {
  const messages = Array(10)
    .fill(undefined)
    .map((_) => createMessage(getRandomNumber()));
  const requestId = crypto.randomUUID();
  return producer
    .send({
      topic,
      messages,
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

const main = async () => {
  await producer.connect();
  setInterval(() => {
    sendMessage();
  }, 5000);
};
main();
