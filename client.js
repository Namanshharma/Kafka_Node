const { Kafka } = require('kafkajs')

export const kakfaClient = new Kafka({
    brokers: ['http://172.27.80.1:9092'],
    clientId: 'Kafka Node App'
})