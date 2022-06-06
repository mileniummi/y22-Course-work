let chatId = `${location.pathname}`.match(/(\d+)/)[0];
let app = new Vue({
  delimiters: ["${", "}"],
  el: "#v-app",
  data: {
    interlocutor: "",
    text: "",
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      this.socket.emit("msgToServer", { text: this.text, author: user, room: chatId });
      this.text = "";
    },
    receiveMessage(msg) {
      this.messages.push(msg);
    },
    initChat() {
      this.socket.emit("getChatMessages", { chatId: chatId });
      this.joinRoom();
    },
    joinRoom() {
      this.socket.emit("joinRoom", chatId);
    },
    receiveChat(data) {
      this.messages = data.messages;
      data.users.map((user_) => {
        if (user_.username !== user) {
          this.interlocutor = `${user_.firstName} ${user_.lastName}`;
        }
      });
    },
  },
  created() {
    this.socket = io(websocketsPath);
    this.initChat();
    this.socket.on("msgToClient", (msg) => {
      this.receiveMessage(msg);
    });
    this.socket.on("chatToClient", (data) => {
      this.receiveChat(data);
    });
  },
});
