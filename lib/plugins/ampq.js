'use strict';

const fp = require('fastify-plugin');
const Amqplib = require('amqplib');


class AMPQ_plugin {

  constructor({ hostname, port, connectionName, queueName, routingKey, mqttExchangeName}) {

    this.rabbitConfig = {
      hostname,
      port,
      connectionName
    }

    this.queueName = queueName;
    this.mqttExchangeName = mqttExchangeName
    this.routingKey = routingKey;
  }


    /**
     * This function initializes the rabbit configurations and devices queue.
     *
     */
  async initialize() {

    this.connectUrl = `amqp://${this.rabbitConfig.hostname}:${this.rabbitConfig.port}`;

    try {

        this.consumerConnection = await Amqplib.connect(this.connectUrl, {
            clientProperties: {
                connection_name: this.rabbitConfig.connectionName
            }
        });

        this.queue = await this.initializeTopicQueue({ connection: this.consumerConnection });

    }
    catch (error) {
        throw error;
    }
  }

  /**
   * Asserts the creation of a rabbit queue.
   *
   * @param {String} name
   * The name of the queue.
   * @param {Object} connection
   * An amqp connection.
   *
   * @returns {Object}
   * The queue.
   */
  async initializeQueue({ name, connection }) {

      const channel = await connection.createChannel();

      const queue = await channel.assertQueue(name, { durable: true });

      await channel.close();

      return queue;
  }

  /**
   * Configures rabbit exchange and queue for devices messages.
   *
   * @param {Object} connection
   * An amqp connection.
   *
   */
  async initializeTopicQueue({ connection }) {

      const channel = await connection.createChannel();

      const topicQueue = await this.initializeQueue({ name: this.queueName, connection });

      const topicsQueue = await channel.bindQueue(topicQueue.queue, this.mqttExchangeName, this.routingKey);

      await channel.close();

      return topicsQueue;
  }


  /**
   * Starts a rabbit consumer to retrieve messages
   */
  async runConsumer({ handlerFunction }) {

      const channel = await this.consumerConnection.createChannel();

      // Device messages consumer
      channel.consume(this.queueName, async (msg) => {
          if (msg !== null) {

              const message = msg.content.toString();

              channel.ack(msg);
              await handlerFunction(message);
          }
      });
  }
}

async function fastifyRabbitMQ (fastify, opts, next) {

  const { hostname, port, connectionName, queueName, routingKey, mqttExchangeName } = opts;

  fastify.decorate('ampq', new AMPQ_plugin({ hostname, port, connectionName, queueName, routingKey, mqttExchangeName }));

  next();
}

module.exports = fp(fastifyRabbitMQ)
