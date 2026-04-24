const readline = require("readline");
const fs = require("fs");
const { stdout } = require("process");
const FILE = "todo.json";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let list = [];

const getData = () => {
  if (fs.existsSync(FILE)) {
    const data = fs.readFileSync(FILE, "utf-8");
    list = JSON.parse(data);
  }
};
const loadData = () => {
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
};

const findByID = (id) => {
  return list.find((t) => t.id == id);
};
const showList = (data = list) => {
  if (data.length === 0) {
    console.log("Chưa có công việc");
  } else {
    console.log("Danh sách công việc của bạn : ");
    data.forEach((tasks, i) => {
      const status = tasks.done ? "Hoàn thành" : "Chưa làm";
      console.log(`${i + 1}. ${tasks.name} - ${status}`);
    });
  }
};
showMenu = () => {
  rl.question(
    `
    Chào mừng đến với todoapp:
    1. Xem danh sách công việc
    2. Thêm công việc vào danh sách
    3. Sửa công việc
    4. Sửa trạng thái công việc
    5. Xóa công việc
    6. Bộ lọc
    7. Thoát chương trình.
    -----------------------
    Nhập lựa chọn của bạn : `,
    (choice) => input(choice),
  );
};

const input = (choice) => {
  switch (choice) {
    case "1":
      getData();
      showList();
      showMenu();
      break;
    case "2":
      showList();
      rl.question(` Nhập công việc cần làm : `, (task) => {
        list.push({ id: Date.now(), name: task, done: false });
        loadData();
        console.log("Đã ghi công việc mới");
        showList();
        showMenu();
      });
      break;
    case "3":
      rl.question(` Nhập id công việc muốn sửa đổi :`, (id) => {
        const task = findByID(id);
        if (task) {
          rl.question(` Nhập tên công việc mới : `, (newName) => {
            task.name = newName;
            loadData();
            console.log(` 
                Sửa tên công việc thành công
                ----------------------------`);
            showList();
            showMenu();
          });
        } else {
          console.log("Không có trong danh sách");
          return showMenu();
        }
      });
      break;
    case "4":
      rl.question(` Nhập id công việc cần đổi trạng thái :`, (id) => {
        const task = findByID(id);
        if (task) {
          rl.question(
            `
                    1. Ghi nhận hoàn thành
                    2. Ghi nhận chưa hoàn thành`,
            (status) => {
              if (status === "1") {
                task.done = true;
                loadData();
                showList();
                showMenu();
              } else if (status === "2") {
                task.done = false;
                loadData();
                showList();
                showMenu();
              } else {
                console.log("Lựa chọn không hợp lệ");
                return showMenu();
              }
            },
          );
        }
      });

      break;
    case "5":
      rl.question(` Nhập id công việc cần xóa :`, (id) => {
        const task = findByID(id);
        if (task) {
          list.splice(task, 1);
          loadData();
          console.log(`
                    Xóa công việc thành công
                    -------------------------`);
          showList();
          showMenu();
        } else {
          console.log("Không có trong danh sách");
          return showMenu();
        }
      });
      break;
    case "6":
      rl.question(
        ` 
            1. Những công việc đã hoàn thành
            2. Những công việc chưa hoàn thành
            -----------------------------------
            Nhập lựa chọn của bạn : `,
        (choice) => {
          if (choice === "1") {
            showList(list.filter((status) => status.done));
          } else if (choice === "2") {
            showList(list.filter((status) => !status.done));
          }
          showMenu();
        },
      );
      break;
    case "7":
      console.log("Thoát chương trình!");
      rl.close();
      break;
    default:
      console.log("Lựa chọn của bạn không hợp lệ ( Chọn từ 1 đến 7)");
      showMenu();
      break;
  }
};
showMenu();
