import ws from 'k6/ws';

const namespace = 'marka-challenge'; // choose your namespace

export const options = {
  vus: 3,
  duration: "30s"
};

export default function () {
  const url = `ws://wa-alina.azurewebsites.net/${namespace}/`;

  const res = ws.connect(url, null, function (socket) {
    socket.on('open', function open() {
      console.log(`VU ${__VU}: connected`);
    });

    socket.on('sendMessage', function () {
      console.log('sendMessage!');

      socket.send(JSON.stringify({ event: 'receiveMessage', message: 'This is the message echoed back' }));
    });

  });

  // check(res, { 'Initialized': (r) => r && r.status === 101 });
}

// ws_sessions...........: 24     0.713484/s


