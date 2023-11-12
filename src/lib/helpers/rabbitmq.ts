import amqplib from 'amqplib'
/**
 * Sends a payload to a specified queue.
 *
 * @param {string} queueName - The name of the queue.
 * @param {any} payload - The payload to send.
 * @return {Promise<void>} - A promise that resolves when the payload is sent successfully.
 */
export const sendPayload = async (queueName: string, payload: any) => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: false })
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)))
    await channel.close()
    await connection.close()
}

export const accumulatePayload = async (queueName: string) => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName, { durable: false })
   channel.consume(queueName, (msg) => {
       if (msg !== null) {
          console.log("[X] Received ",JSON.parse(msg.content.toString()))
           channel.ack(msg)
       }
   }, { noAck: false })
    await channel.close()
    await connection.close()
}