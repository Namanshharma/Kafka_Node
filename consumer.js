const { kafkaClient } = require('./client')
const group = process.argv[2];

async function init() {

    const consumer = kafkaClient.consumer({ groupId: group })
    await consumer.connect();
    console.log("Consumer is connected");

    await consumer.subscribe({ topic: "Rider_Updates", fromBeginning: true });
    console.log("Consumer is subscribed to topic - [Rider_Updates]");
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Group - ${group}, Topic - ${topic}, Partition - ${partition}, Received message: ${message.value.toString()}`);
        }
    });
}

init();