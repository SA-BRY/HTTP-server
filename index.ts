import net from "net"


function newConnection(socket: net.Socket): void {

  console.log('new connection', socket.remoteAddress, socket.remotePort)

  server.on('data', (data: Buffer) => {
    console.log(`data : ${data}`);
    socket.write(data);
    if (data.includes('q')) {
      console.log('closing')
      socket.end();

    }
  })

  server.on('end', () => {
    console.log('EOF.')
  })


}

let server: net.Server = net.createServer();
server.on('connection', newConnection)
server.on('error', (err: Error) => { throw (err) })
server.listen({
  "host": '127.0.0.1',
  "port": 4000
})
