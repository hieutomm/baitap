// async function getUser() {
//   try {
//     let res = await fetch("https://jsonplaceholder.typicode.com/users");
//     let data = await res.json();
//     data.forEach(function (user) {
//       console.log("Name:", user.name);
//       console.log("City:", user.address.city);
//       console.log("Phone:", user.phone);
//       console.log("-------------------");
//     });
//   } catch (error) {
//     console.error("Lỗi:", error);
//   }
// }
// getUser();

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then(function (data) {
    data.forEach(function (user) {
      console.log("Name:", user.name);
      console.log("City:", user.address.city);
      console.log("Phone:", user.phone);
      console.log("-------------------");
    });
  })
  .catch(function (err) {
    {
      console.error(err);
    }
  });
