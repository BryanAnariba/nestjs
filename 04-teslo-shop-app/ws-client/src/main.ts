import { connecToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Web Socket Client</h1>
    <p id="server-status">Disconnected!</p>

    <ul id="clients-connected">
    </ul>
    <form id="message-form">
      <input type="text" placeholder="message" id="message-input" />
    </form>
  </div>
`;

connecToServer();
