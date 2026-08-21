import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const socket = io("http://localhost:8000", {
    autoConnect: false,
    transports: ["websocket", "polling"],
  });

  return {
    provide: {
      socket,
    },
  };
});
