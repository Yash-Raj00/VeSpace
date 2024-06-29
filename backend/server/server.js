const mongoose = require("mongoose");
const Document = require("./Document.js");

mongoose.connect("mongodb://localhost/ve-space", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const defaultValue = "";

io.on("connection", (socket) => {
  socket.on("get-document", async (docId) => {
    const document = await findOrCreateDocument(docId);
    socket.join(docId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(docId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(docId, { data });
    });
  });
  console.log("connected");
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}

// ecommerce
// services


// mongodb+srv://Maalik:bobsarelove00@cluster0.68pafam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
