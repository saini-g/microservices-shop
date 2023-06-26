const { connect, StringCodec } = require('nats');

const NATS_BROKER_URL = process.env.NATS_BROKER_URL;

class NatsClient {
  #conn;
  #codec;

  constructor() {
    this.#codec = StringCodec();
  }

  async startup() {
    this.#conn = await connect({ servers: NATS_BROKER_URL });
    console.log(`Connected to nats broker on "${this.#conn.getServer()}"`);
  }

  sendMessage(channel, message) {
    this.#conn.publish(
      channel,
      this.#codec.encode(message)
    );
  }

  subscribe(channel, cb) {
    this.#conn.subscribe(channel, {
      callback: (err, payload) => {
        cb(err, this.#codec.decode(payload.data))
      }
    });
    console.log(`Subscribed to messaging channel "${channel}"`);
  }
}

module.exports.NatsClient = NatsClient;
