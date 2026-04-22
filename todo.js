const readline = require("readline");
const fs = require("fs");
const list_file = "todo.json";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let list = [];

const getData = () => {
  if (fs.existsSync(list_file)) {
    const data = fs.readFileSync(list_file, "utf-8");
    list = JSON.parse(data);
  }
};

const saveData = () => {
  fs.writeFileSync(list_file, JSON.stringify(list, null, 2));
};

const showMenu = () => {
  rl.question(
    `
1.list
2.add
3.checklist
4.exit
Chọn 1 đến 4: `,
    (choice) => {
      input(choice);
    },
  );
};

const input = (choice) => {
  switch (choice) {
    case "1":
      console.log("List:");
      if (list.length === 0) {
        console.log("chưa có công việc");
      } else {
        list.forEach((work, i) => {
          const status = work.done ? "Đã xong" : "Chưa xong";
          console.log(`${i + 1}. ${work.name} - ${status}`);
        });
      }
      showMenu();
      break;

    case "2":
      rl.question("Nhập công việc cần làm: ", (job) => {
        list.push({ name: job, done: false });
        saveData();
        console.log("Thành công");
        showMenu();
      });
      break;

    case "3":
      rl.question("Nhập số của công việc đã xong :", (number) => {
        const index = parseInt(number) - 1;
        if (list[index]) {
          list[index].done = true;
          saveData();
          console.log("Đã cập nhật");
        } else {
          console.log("Không có trong danh sách");
        }
        showMenu();
      });
      break;
    case "4":
      console.log("kết thúc chương trình");
      rl.close();
      break;

    default:
      console.log("Chỉ chọn từ 1 đến 4");
      showMenu();
      break;
  }
};

showMenu();
