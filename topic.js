const { Kafka } = require("kafkajs");

async function run() {
  admin = null;
  try {
    const kafka = new Kafka({
      clientId: "com.example.myapp",
      brokers: ["10.0.0.242:9092"],
    });

    admin = kafka.admin();
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected ⚡️!");
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created Successfully 🙂!");
  } catch (e) {
    console.error(`Something bad happened 👉🏿 ${e}`);
  } finally {
    if (admin != null) {
      await admin.disconnect();
    }
    process.exit(0);
  }
}

run();
