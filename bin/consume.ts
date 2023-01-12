import { kafka } from "../lib/kafkaInstance.ts";

const topic = "topic-test";
const consumer = kafka("consumer").consumer({ groupId: "test-group" });

async function main() {
  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await console.log({
        value: message.value?.toString(),
        key: message.key?.toString(),
        headers: message.headers,
      });
    },
  });
}

main();
