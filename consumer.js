const { Kafka } = require("kafkajs");

async function run() {
  consumer = null;
  try {
    const kafka = new Kafka({
      clientId: "com.example.myapp",
      brokers: ["10.0.0.242:9092"],
    });

    consumer = kafka.consumer({
      groupId: "test",
    });
    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected ⚡️!");

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true,
    });
    console.log("Subscribed 🔔!");

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message: {result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (e) {
    console.error(`Something bad happened 👉🏿 ${e}`);
  }
}

run();
