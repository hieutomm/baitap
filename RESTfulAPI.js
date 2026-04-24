const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const FILE = "todo.json";

let list = [];

const getData = () => {
  if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE, "utf-8");
    list = JSON.parse(data);
  }
};

const saveData = () => {
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
};
app.get("/", (req, res) => {
  res.send("server đang chạy");
});
app.get("/tasks", (req, res) => {
  getData();
  res.json(list);
});

app.post("/tasks", (req, res) => {
  getData();
  const { name } = req.body;

  const newTask = {
    id: Date.now(),
    name,
    done: false,
  };
  list.push(newTask);
  saveData();
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  getData();
  const id = req.params.id;
  const { name, done } = req.body;

  const task = list.find((t) => t.id == id);

  if (!task) {
    return res.status(404).json({ messange: "Không tìm thấy dữ liệu" });
  }
  if (name !== undefined) task.name = name;
  if (done !== undefined) task.done = done;

  saveData();
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  getData();
  const id = req.params.id;
  const index = list.findIndex((t) => t.id == id);

  if (index === -1) {
    return res.status(404).json({ messange: "Không tìm thấy dữ liệu" });
  } else {
    const deleted = list.splice(index, 1);
  }
  saveData();
  res.json({ messange: "Đã xóa" });
});

app.get("/tasks", (req, res) => {
  getData();
  const done = req.params.done;

  let result = list;
  if (done === "true") {
    result = list.filter((t) => t.done);
  } else if (done === "false") {
    result = list.filter((t) => !t.done);
  }
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
