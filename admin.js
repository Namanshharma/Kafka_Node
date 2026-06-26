const { kakfaClient } = require('./client')

async function init() {
    // Creating Admin from Kakfa Client
    const admin = kakfaClient.admin();
    console.log("Admin is connecting...");
    admin.connect();
    console.log("Admin is connected");


    console.log("Creating Topic... - [Rider_Updates]");
    // Creating Topics from Admin
    await admin.createTopics({
        topics: [{
            topic: "Rider_Updates",
            numPartitions: 2
        }]
    })
    console.log("Created Topic - [Rider_Updates]");
    console.log("Disconnecting Admin");
    admin.disconnect();
}


init();