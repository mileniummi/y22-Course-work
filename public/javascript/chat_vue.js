let chatId = `${location.pathname}`.match(/(\d+)/)[0];
console.log(chatId);
let app = new Vue({
  delimiters: ["${", "}"],
  el: "#v-app",
  data: {
    interlocutor: "Aliftina Cherednichenko",
    text: "",
    user: "",
    messages: ["Versage", "sdfisdjis jdfiwj3r84 439 ur349 ru3489, sdfusfhdus"],
    socket: null,
  },
  methods: {
    sendMessage() {
      console.log(this.user);
      console.log(`send ${this.text}`);
      this.socket.emit("msgToServer", this.text);
      this.text = "";
    },
    receiveMessage(msg) {
      console.log(`resv ${msg}`);
      this.messages.push(msg);
    },
  },
  created() {
    this.socket = io("http://localhost:12345");
    this.socket.on("msgToClient", (msg) => {
      this.receiveMessage(msg);
    });
  },
});
