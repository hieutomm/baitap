const readline = require("readline");
const { fileURLToPath } = require("url");
const fs = require("fs");

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

const saveData = () => {
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
};

const showList = (data = list) => {
  console.log("List of work:");
  if (data.length === 0) {
    console.log("Dont have any work to do!");
  } else {
    data.forEach((work, i) => {
      const status = work.done ? "Done" : "in process";
      console.log(`${work.id}.${work.name} - ${status}`);
    });
  }
};
const searchByID = (number) => {
  return list.find((t) => t.id == number);
};
const showMenu = () => {
  rl.question(
    `WELCOME TO TODO APP
    1. Show job list
    2. Add work need to do
    3. Edit work's status
    4. sửa
    5. xóa
    6. lọc
    7. thoát
    ---------------------
    Enter your choice: `,
    (choice) => {
      input(choice);
    },
  );
};

const input = (choice) => {
  switch (choice) {
    case "1":
      showList();
      getData();
      showMenu();
      break;
    case "2":
      rl.question("Enter work you need to do: ", (job) => {
        list.push({ id: Date.now(), name: job, done: false });
        saveData();
        console.log("DONE");
        showMenu();
      });
      break;
    case "3":
      showList();
      rl.question("Nhập id công việc :", (number) => {
        const task = searchByID(number);
        if (task) {
          task.done = true;
          saveData();
        } else {
          console.log("Done exist in the list");
        }
        showMenu();
      });

      break;
    case "4":
      showList();
      rl.question("Nhập số công việc cần sửa :", (number) => {
        const task = searchByID(number);
        if (task) {
          rl.question("Nhập tên mới: ", (newName) => {
            task.name = newName;
            saveData();
            showMenu();
          });
        } else {
          console.log("Không có trong danh sách ");
          return showMenu();
        }
      });
      break;
    case "5":
      showList();
      rl.question("Nhập tên số công việc muốn xóa : ", (number) => {
        const task = searchByID(number);
        if (task) {
          list.splice(task, 1);
          saveData();
          console.log("xóa thành công ");
          showMenu();
        } else {
          console.log("Không có trong danh sách0");
          return showMenu();
        }
      });
      break;
    case "6":
      rl.question(
        `
          Chọn bộ lọc:
          1. Đã xong
          2. Chưa thực hiện
          Nhập lựa chọn của bạn: 
          `,
        (choice) => {
          if (choice === 1) {
            showList(list.filter((t) => t.done));
          } else if (choice === 2) {
            showList(list.filter((t) => !t.done));
          } else {
            console.log("lựa chọn không hợp lệ");
          }
        },
      );

    case "7":
      console.log("Program has been close");
      rl.close();
      break;
    default:
      console.log("Only have 4 options");
      showMenu();
      break;
  }
};
showMenu();
