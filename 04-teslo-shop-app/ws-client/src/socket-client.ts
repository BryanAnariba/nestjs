import {Manager, Socket} from 'socket.io-client';

export const connecToServer = () => {
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

  // Nos conectamos al namespace del backend
  const socket = manager.socket('/');
  // console.log('Socket: ', socket)
  addListeners(socket);
}

const addListeners = (socket: Socket) => {

  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput = document.querySelector<HTMLInputElement>("#message-input")!;
  const serverStatusLabel = document.querySelector('#server-status')!;

  // on para escuchar el estado del server, emit es para hablar con ser server
  socket.on('connect', () => {
    // console.log('Connected');
    serverStatusLabel.innerHTML = 'Connected!';
  });

  socket.on('disconnect', () => {
    // console.log('Disconnected');
    serverStatusLabel.innerHTML = 'Disconnected!';
  });

  socket.on('clients-updated', (clients: string[]) => {
    console.log({clients})
    let clientsConnectedList = '';
    const clientsConnected = document.querySelector('#clients-connected')!;
    clients.forEach(client => {
      clientsConnectedList += `<li>${client}</li>`;
    });
    clientsConnected.innerHTML = clientsConnectedList;
  });

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (messageInput.value.trim().length <= 0) return;

    // console.log({id: 'Yo!!', message: messageInput.value});

    // Mandamos la informacion al backend para que la reciba
    socket.emit('message-from-client', {
      id: 'Yo!',
      message: messageInput.value,
    });

    messageInput.value = '';
  });
}