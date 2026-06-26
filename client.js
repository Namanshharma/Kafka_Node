const { Kafka } = require('kafkajs')

exports.kafkaClient = new Kafka({
    brokers: ['172.27.80.1:9092'],
    clientId: 'Kafka Node App'
})