const { kafkaClient } = require('./client')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function init() {
    const producer = kafkaClient.producer();
    console.log("Producer is connecting...");

    await producer.connect();
    console.log("Producer is connected");

    rl.setPrompt(" > ");
    rl.prompt();

    rl.on('line', async (input) => {
        const [raiderName, raiderLocation] = input.split(' ');
        await producer.send({
            topic: "Rider_Updates",
            messages: [
                {
                    key: "Rider_Location_Update",
                    value: `Raider Name: ${raiderName}, Location: ${raiderLocation}`,
                    partition: raiderLocation.toLocaleLowerCase() === "north" ? 0 : 1
                },
            ]
        })
    }).on('close', async () => {
        console.log("Disconnecting Producer");
        await producer.disconnect();
    })
}

init();