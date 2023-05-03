'use strict';

const { SNSClient, CreatePlatformEndpointCommand, PublishCommand, DeleteEndpointCommand } = require("@aws-sdk/client-sns");
const fp = require('fastify-plugin');

class SNS_Service {

    constructor({ pushNotificationPlatformArn, accessId, secretKey, region }) {

        this.pushNotificationPlatformArn = pushNotificationPlatformArn;
        this.SNS = new SNSClient({
            region: region,
            credentials: {
              accessKeyId: accessId,
              secretAccessKey: secretKey
            }
        });
    }

    /**
     * Registers device for push notifications on AWS SNS.
     *
     * @param {string} deviceToken
     *  The device token to register.
     *
     * @return {string} The ARN of the registered device.
     */
    async registerSNSPlatformEndpoint({ deviceToken }) {

        try {
            const params = {
                PlatformApplicationArn: this.pushNotificationPlatformArn,
                Token: deviceToken
            };
            
            const command = new CreatePlatformEndpointCommand(params);

            const { EndpointArn: endpointArn } = await this.SNS.send(command);

            return endpointArn;
        }
        catch (error) {
            throw error
        }
    }

    /**
     * Deregisters device for push notifications on AWS SNS.
     *
     * @param {string} endpointArn
     *  The endpointArn of device to deregister.
     *
     */
    async deregisterSNSPlatformEndpoint({ endpointArn }) {

        try {
            const params = {
                EndpointArn: endpointArn
            };
            
            const command = new DeleteEndpointCommand(params);

            await this.SNS.send(command);

            return;
        }
        catch (error) {
            throw error
        }
    }

    /**
     *
     * Send a push notification to a customer.
     *
     * @param {string} message
     * The message to send.
     * @param {string} user_id
     * The user id of the customer.
     *
     * @returns {boolean} True if the message was sent.
     */
    async sendPushNotification({ message, endpointArn }) {

        try{
            const params = {
                Message: JSON.stringify({"GCM": JSON.stringify(message)}),
                TargetArn: endpointArn,
                MessageStructure: "json"
            };

            const command = new PublishCommand(params);
            return await this.SNS.send(command);
        }
        catch(error){
            throw error
        }
    }   
}

async function awsSNS (fastify, opts, next) {

    const { pushNotificationPlatformArn, accessId, secretKey, region } = opts;

    fastify.decorate('aws_sns', new SNS_Service({ pushNotificationPlatformArn, accessId, secretKey, region }));

    next();
}

module.exports = fp(awsSNS);
