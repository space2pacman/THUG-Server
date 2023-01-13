const serverDescription = [
  0,//   xor
  0,
  16,//  type
  224,// length
  0,//   empty
  0,//   num players
  8,//   max players
  0,//   num observers
  0,//   max observers
  0,//   password
  1,//   game started
  1,//   host mode
  0,//   ranked
  84,//  >> T // server name (16 length)
  72,//  >> H
  80,//  >> U
  83,//  >> G
  32,// >> s
  78,// >> r
  79,// >> v
  68,//  >> V
  69,//  >> 2
  46,//  >> 
  74,//  >> T
  83,//  >> A
  0,//  >> +
  0,//  >> C
  0,//  >> M
  0,//  >> F
  77,//  >> M // level name (32 length)
  97,//  >> a
  110,// >> n
  104,// >> h
  97,//  >> a
  116,// >> t
  116,// >> t
  97,//  >> a
  110,// >> n
  0,
  19,
  106,
  184,
  5,
  42,
  1,
  48,
  239,
  179,
  0,
  179,
  56,
  180,
  101,
  0,
  0,
  0,
  0,
  16,
  242,
  179,
  0,//   end level name
  70,//  >> F // mode name (32 length)
  114,// >> r
  101,// >> e
  101,// >> e
  115,// >> s
  107,// >> k
  97,//  >> a
  116,// >> t
  101,// >> e
  0,
  183,
  101,
  179,
  241,
  179,
  0,
  255,
  255,
  255,
  255,
  192,
  241,
  179,
  0,
  10,
  29,
  183,
  101,
  0,
  0,
  0,
  0,//   end mode name
  2,//   skill level uint32
  0,//   skill level
  0,//   skill level
  0,//   skill level
  146,// 146 timestamp int
  20,//  20  timestamp
  0,//   0   timestamp
  0,//   0   timestamp
  150,// >> P 1 player name (16 length)
  29,//  >> r
  183,// >> o
  101,// >> S
  211,// >> k
  241,// >> a
  179,// >> t
  0,//   >> e
  255,// >> r
  255,
  255,
  255,
  0,
  0,
  0,
  0,
  7,//  >> 2 player name (16 length)
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  216,// >> 3 player name (16 length)
  4,
  42,
  1,
  136,
  30,
  42,
  1,
  184,
  5,
  42,
  1,
  1,
  0,
  0,
  0,
  224,// >> 4 player name (16 length)
  241,
  179,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  18,// >> 5 player name (16 length)
  89,
  63,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,// >> 6 player name (16 length)
  242,
  179,
  0,
  1,
  0,
  0,
  0,
  20,
  242,
  179,
  0,
  1,
  0,
  0,
  0,
  179,// >> 7 player name (16 length)
  241,
  179,
  0,
  255,
  255,
  255,
  255,
  0,
  0,
  0,
  0,
  64,
  0,
  0,
  0,
  208,// >> 8 player name (16 length)
  239,
  179,
  0,
  8,
  0,
  0,
  0,
  52,
  242,
  179,
  0,
  1,
  0
];

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const Packet = require('./core/Packet');

const opcodes = {
  FIND_SERVER: 17
}

server.on('message', (data, info) => {
  const _packet = new Packet(data);
  const packetDecoded = _packet.decode();
  const opcode = packetDecoded[2];

  switch(opcode) {
    case opcodes.FIND_SERVER:
      const packet = new Packet(serverDescription);
      const packetEncoded = packet.encode();

      server.send(packetEncoded, 0, packetEncoded.length, info.port, info.address);

      break;
  }
});

server.bind(5150);