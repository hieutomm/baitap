const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let list = [];

const showMenu = () => {
  rl.question(
    `
1.list
2.add
3.exit
Chọn 1 đến 3: `,
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
          console.log(`${i + 1}. ${work}`);
        });
      }
      showMenu();
      break;

    case "2":
      rl.question("Nhập công việc cần làm: ", (job) => {
        list.push(job);
        console.log("Thành công");
        showMenu();
      });
      break;

    case "3":
      console.log("kết thúc chương trình");
      rl.close();
      break;

    default:
      console.log("Chỉ chọn từ 1 đến 3");
      showMenu();
      break;
  }
};

showMenu();
