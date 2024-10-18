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

const p79 = [
  163,
60,
79,
32,
0,
75,
237,
111,
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
104,
235,
111,
0,
8,
0,
0,
0,
204,
237,
111,
0,
8,
1,
0,
0
]

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
    case 3:
      const packet03 = new Packet([0, 0, 4, 0, 0]);
      const packetEncoded03 = packet03.encode();

      server.send(packetEncoded03, 0, packetEncoded03.length, info.port, info.address);

      // 79
      const packet79 = new Packet(p79);
      const packetEncoded79 = packet79.encode();

      server.send(packetEncoded79, 0, packetEncoded79.length, info.port, info.address);

      break;
  }
});

//
//let b = '56ba475a567b965756a69efc55267cfc55';

// 4
//let b = 'e895ece8e8'

79
//let b = 'a33cec83a3e84ecca35c5c5c5ca3a3a3a3e3a3a3a3cb48cca3aba3a3a36f4ecca3aba2a3a3'

// 2
//let b = 'a724a5a3a7a6a7a7a7a6a3a74399a7a7';

// from client
//let b = '06eb0f04060702069e270606'

let b = '94249690949594949495909405d49894'

let d = []
for (let i = 0; i < b.length; i += 2) {
  d.push(Number(`0x${b[i]}${b[i + 1]}`))
}

const _packet = new Packet(d);
const decoded = _packet.decode();

for (let i = 0; i < decoded.length; i++) {
  console.log(decoded[i])
}

server.bind(5150);