const { Kafka } = require("kafkajs");

const value = process.argv[2];
const partition = value[0] < "N" ? 0 : 1;
async function run() {
  producer = null;
  try {
    const kafka = new Kafka({
      clientId: "com.example.myapp",
      brokers: ["10.0.0.242:9092"],
    });

    producer = kafka.producer();
    console.log("Connecting...");
    await producer.connect();
    console.log("Connected ⚡️!");
    const result = await producer.send({
      topic: "Users",
      messages: [
        {
          value: value,
          partition,
        },
      ],
    });
    console.log(`Send Successfully ${JSON.stringify(result)}`);
  } catch (e) {
    console.error(`Something bad happened 👉🏿 ${e}`);
  } finally {
    if (producer != null) {
      await producer.disconnect();
    }
  }
}

run();
