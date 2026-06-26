const { kafkaClient } = require('./client')

async function init() {

    const consumer = kafkaClient.consumer({ groupId: "Group_1" })
    await consumer.connect();
    console.log("Consumer is connected");

    await consumer.subscribe({ topic: "Rider_Updates", fromBeginning: true });
    console.log("Consumer is subscribed to topic - [Rider_Updates]");
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(`Topic - ${topic}, Partition - ${partition}, 
                Received message: ${message.value.toString()}`);
        }
    });
}

init();