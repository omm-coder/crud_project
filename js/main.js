let btn_add = document.querySelector("#add");
let model = document.querySelector("#model-add");
let form = document.querySelector("#form");
let allInputs = document.getElementsByClassName("input");
let display_error = document.getElementsByClassName("error-message");
let indicator = document.querySelector("#indicator");
let table = document.querySelector("table");
let empt_p = document.querySelector("#empty");
let anchortag = document.querySelectorAll("a");

// all global variables
let messageError, isDark = false;

let user = {
  userName: "c/laahi",
  address: "SHBS",
  email: "omm@gmail.com",
  password: "234dcx",
};
let user2 = {
  userName: "muqtaar",
  address: "SHBS",
  email: "omm@gmail.com",
  password: "234dcx",
};
let user3 = {
  userName: "asmo",
  address: "WDJR",
  email: "ASMo@gmail.com",
  password: "234dcx",
};
let user4 = {
  userName: "kaafiyow",
  address: "KXD",
  email: "KAAFi@gmail.com",
  password: "234dcx",
};
let user5 = {
  userName: "Liiban",
  address: "KXD",
  email: "KAAFi@gmail.com",
  password: "234dcx",
};
let user6 = {
  userName: "kowsar",
  address: "KXD",
  email: "KAAFi@gmail.com",
  password: "234dcx",
};
let user7 = {
  userName: "xasan",
  address: "KXD",
  email: "KAAFi@gmail.com",
  password: "234dcd",
};
let user8 = {
  userName: "xuseen",
  address: "WDJR",
  email: "KAAFi@gmail.com",
  password: "234dcx",
};
let users = [user, user2, user3, user4, user5, user6, user7, user8];

//useful methods
let getAndSetMessageError = (id) => {
  switch (id) {
    case "name":
      messageError = "name can't be empty and must be 3-15 character";
      break;
    case "address":
      messageError = "Address can't be empty and must be 3-15 character";
      break;
    case "email":
      messageError = "email can't be empty must end with @gmail.com";
      break;
    case "password":
      messageError = "password can't be empty and must be at least 5 character";
      break;
    default:
      messageError = "";
      break;
  }

  for (let child of display_error) {
    if (child.id == id) {
      child.textContent = messageError;
      child.style.opacity = "1";
      return;
    }
  }
};

function setSucess(id) {
  for (let child of display_error) {
    if (child.id === id) {
      child.textContent = "";
      child.style.opacity = "0";
    }
  }
}

let saveUserAndLoad = function () {
  // users = localStorage.getItem(users) || [];

  users.push({
    userName: allInputs[0].value,
    address: allInputs[1].value,
    email: allInputs[2].value,
    password: allInputs[3].value,
  });
  printUsers(users);
};

function makeValidation() {
  for (let input of allInputs) {
    if (input.id == "name") {
      if (input.value.trim() == "" || input.value.length <= 2)
        getAndSetMessageError(input.id);
      else setSucess(input.id);
    }
    if (input.id == "address") {
      if (input.value.trim() == "" || input.value.length <= 2)
        getAndSetMessageError(input.id);
      else setSucess(input.id);
    }
    if (input.id == "email") {
      if (input.value.trim() == "" || !input.value.endsWith("@gmail.com"))
        getAndSetMessageError(input.id);
      else setSucess(input.id);
    }
    if (input.id == "password") {
      if (input.value.trim() == "" || input.value.length <= 5)
        getAndSetMessageError(input.id);
      else setSucess(input.id);
    }
  }

  if (!Array.from(display_error).some((child) => child.textContent !== "")) {
    saveUserAndLoad();
    Array.from(allInputs).forEach((input) => {
      input.value = "";
    });
    setTimeout(() => {
      model.style.visibility = "hidden";
    }, 1000);
    indicator.style.opacity = "1";
    setTimeout(() => {
      indicator.style.opacity = "0";
    }, 3000);
  }
}

// making Dynamic table
function printUsers(arrayOfUsers) {
  let tbody = document.querySelector("tbody");

  arrayOfUsers.forEach((user) => {
    //make a new tr of table
    let tr = document.createElement("tr");

    let td = document.createElement("td");

    let td1 = document.createElement("td");
    td1.textContent = user.userName;

    let td2 = document.createElement("td");
    td2.textContent = user.address;

    let td3 = document.createElement("td");
    td3.textContent = user.email;

    let td4 = document.createElement("td");
    td4.textContent = user.password;

    //make edit and delete links
    let edit = document.createElement("a");
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    edit.href = "#";
    edit.appendChild(icon);

    let delte = document.createElement("a");
    let icon2 = document.createElement("i");
    icon2.classList.add("fa-solid", "fa-trash");
    delte.href = "#";
    delte.appendChild(icon2);

    let td5 = document.createElement("td");
    td5.appendChild(edit);

    let td6 = document.createElement("td");
    td6.appendChild(delte);

    isDark == false
      ? tr.classList.add("dark-tbody-tr")
      : tr.classList.remove("dark-tbody-tr");

    tr.append(td, td1, td2, td3, td4, td5, td6);
    tbody.appendChild(tr);
  });
}

//event listeners
btn_add.addEventListener("click", () => {
  document.querySelector("#model-add").style.visibility = "visible";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  makeValidation();
});
theme.addEventListener("click", () => {
   if (isDark) {
    theme.classList.replace("fa-moon", "fa-sun");
    document.body.classList.remove("dark-theme");
    table.tHead.classList.remove("dark-thead");
    isDark = false;
    localStorage.setItem('isdark', isDark);
  } else {
    theme.classList.replace("fa-sun", "fa-moon");
    document.body.classList.add("dark-theme");
    table.tHead.classList.add("dark-thead");
    isDark = true;
    localStorage.setItem('isdark', isDark);
  }
});

printUsers(users);

// alert(table.tBodies[0].rows.length)
// if(table.tBodies[0].rows.length == 0) {
//     table.style.display = 'none'
//     table.tHead.style.opacity = '0'
//     empt_p.style.opacity = '1';
// }
// else {
//     table.style.display = 'block'
//     table.tHead.style.opacity = '0'
//     // users = [];
//     printUsers(users);
// }


