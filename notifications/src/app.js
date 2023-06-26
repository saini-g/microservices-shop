const { NatsClient } = require('./nats-client');

const natsClient = new NatsClient();

const NEW_ORDER_MESSAGING_CHANNEL = process.env.MESSAGING_CHANNEL_NAME;

function handleMessages(err, message) {
  if (err) {
    console.log(`Error while reading messages: ${err}`);
    return;
  }
  console.log(`Message received on channel "${NEW_ORDER_MESSAGING_CHANNEL}"`);
  console.log(message);
}

async function main() {
  await natsClient.startup();
  natsClient.subscribe(NEW_ORDER_MESSAGING_CHANNEL, handleMessages);
}

main().catch(console.log);
