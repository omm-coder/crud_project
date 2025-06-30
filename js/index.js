//taking from httml
let model = document.querySelector("#model-add"); //the model container/box
let modelBtn_add = document.querySelector("#add"); // this button opens the model
let modelBtn_close = document.querySelector("#modelClose-button"); // this button closes the model
let indicator = document.querySelector("#indicator"); // to show message if added successfully
let p_empty = document.querySelector("#empty"); // show empty if the table has no data

let my_form = document.querySelector("#form"); // this is the form element and it hass all the tags now
let allinputTags = document.getElementsByClassName("input");
let diverror = document.getElementsByClassName("error-message");

let search_input = document.getElementById("search");
let search_icon = document.getElementById("search-icon");

let table = document.querySelector("#table"); //THIS ONE IS DIV WHICH HAS THE TABLE
let tbody = document.querySelector("#tbody");
let thead = document.querySelector("table thead");

let themeIcon = document.querySelector("#theme");
let anchor_tags = document.querySelectorAll("li a");

let model_update = document.querySelector("#model-update");

//global variables
let users = JSON.parse(localStorage.getItem("users")) || [];
let userID;

//all the functioins
function success(id) {
  Array.from(diverror).forEach((div) => {
    if (div.id == id) {
      div.textContent = "";
      div.style.opacity = "0";
      return;
    }
  });
}

function getMessageError(id) {
  switch (id) {
    case "name":
      return "name must be 3-15 character";
    case "address":
      return "address must be 3-15 character";
    case "email":
      return "email must end with @gmail.com";
    case "password":
      return "password must be 5-18 character";
    default:
      return "";
  }
}

const showAddedMessage = (h1, message, opacity) => {
  h1.textContent = message;
  h1.style.opacity = opacity;
  if (opacity == 1) h1.classList.add("add-animate");
};

//this function cleares al input tags
const clearAllInputs = () => {
  Array.from(allinputTags).forEach((input) => {
    input.value = "";
  });
};


//this function make validation
function makeValidation() {
  let isValidated = true;

  function displayErrorMessage(id, message) {
    Array.from(diverror).forEach((div) => {
      if (div.id == id) {
        div.textContent = message;
        div.style.opacity = "1";
        isValidated = false;
        return;
      }
    });
  }
  Array.from(allinputTags).forEach((input) => {
    if (input.value !== "") {
      if (
        input.value.trim().length <= 2 &&
        input.value.trim().length <= 15 &&
        input.id == "name"
      )
        displayErrorMessage(input.id, getMessageError(input.id));
      else if (input.value.trim().length <= 2 && input.id == "address")
        displayErrorMessage(input.id, getMessageError(input.id));
      else if (input.id == "email" && !input.value.endsWith("@gmail.com"))
        displayErrorMessage(input.id, getMessageError(input.id));
      else if (input.value.trim().length <= 5 && input.id == "password")
        displayErrorMessage(input.id, getMessageError(input.id));
      else success(input.id);
    } else {
      displayErrorMessage(input.id, input.id + " can not be empty");
    }
  });

  const isAllValid = () => isValidated;
  return { displayErrorMessage, isAllValid, clearAllInputs };
}

//edit user function
function editUser(id) {
  let user = users.find((user) => user.ID == id);

  user.name = allinputTags[0].value;
  user.address = allinputTags[1].value;
  user.email = allinputTags[2].value;
  user.password = allinputTags[3].value;

  console.log(user);

  localStorage.setItem("users", JSON.stringify(users));
  renderUser(users);
}

//search filter function
function search(word) {
  let listValueNames;
  listValueNames = users.filter((user) => user.name.includes(word));
  console.log(listValueNames);
  renderUser(listValueNames);
}

//this function makes delete user
function deleteUser(id) {

  let index = users.findIndex((user) => user.ID == id);
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  console.log(JSON.stringify(users, 2));
}


function readAllUsers(arrayOfUsers) {
  arrayOfUsers.forEach((user) => {
    //create the tr and it's tds
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.textContent = user.ID;

    let td1 = document.createElement("td");
    td1.textContent = user.name;

    let td2 = document.createElement("td");
    td2.textContent = user.address;

    let td3 = document.createElement("td");
    td3.textContent = user.email;

    let td4 = document.createElement("td");
    td4.textContent = user.password;

    //make edit and delete icons
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    icon.addEventListener("click", (e) => {
      model.classList.add("show-model");
      model.classList.add("add-animate");
      document.querySelector("#model-h").textContent = "Update User";
      modelBtn_close.textContent = "Save";

      const row = e.target.closest("tr");
      const cells = row.querySelectorAll("td");
      const rowId = cells[0].textContent;

      allinputTags[0].value = cells[1].textContent;
      allinputTags[1].value = cells[2].textContent;
      allinputTags[2].value = cells[3].textContent;
      allinputTags[3].value = cells[4].textContent;

      userID = rowId;
    });

    let icon2 = document.createElement("i");
    icon2.classList.add("fa-solid", "fa-trash");

    icon2.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      const cells = row.querySelectorAll("td");
      const userData = {
        id: cells[0].textContent,
        name: cells[1].textContent,
        address: cells[2].textContent,
        email: cells[3].textContent,
        password: cells[4].textContent,
      };
      deleteUser(userData.id);
      setTimeout(() => {
        showAddedMessage(indicator, "Deleted Success Fully!!!", 1);
        renderUser(users);
      }, 1000);
      setTimeout(() => {
        showAddedMessage(indicator, "Deleted Success Fully!!!", 0);
      }, 2500);
    });

    let td5 = document.createElement("td");
    td5.appendChild(icon);

    let td6 = document.createElement("td");
    td6.appendChild(icon2);

    tr.append(td, td1, td2, td3, td4, td5, td6);
    tbody.appendChild(tr);
  });
}

function renderUser(all) {
  if (all.length !== 0) {
    table.style.opacity = "1";
    p_empty.style.opacity = "0";
    // read all users from localStorage
    // let AllUsers = JSON.parse(localStorage.getItem("users"));
    table.querySelector("table").tBodies[0].innerHTML = "";
    readAllUsers(all);
  } else {
    table.style.opacity = "0";
    p_empty.style.opacity = "1";
  }
}

//genratiing an id of user
let countID = Number(localStorage.getItem("userIDCounter")) || 1;
const countUserID = () => {
  return () => {
    let current = countID;
    countID++;
    localStorage.setItem("userIDCounter", countID);
    return current;
  };
};

function storeData() {
  let generateID = countUserID();
  let userId = generateID();
  users.push({
    ID: userId,
    name: allinputTags[0].value,
    address: allinputTags[1].value,
    email: allinputTags[2].value,
    password: allinputTags[3].value,
  });
  console.log("storing object: " + JSON.stringify(users, null, 2));
  localStorage.setItem("users", JSON.stringify(users));
  renderUser(users);
}


//event listeners

modelBtn_add.addEventListener("click", () => {
  model.classList.add("show-model");
  model.classList.add("add-animate");
  document.querySelector("#model-h").textContent = "Registeration";
  modelBtn_close.textContent = "Register";
  clearAllInputs();
});

document.querySelector("#x-icon").addEventListener("click", () => {
  model.classList.remove("show-model");
  model.classList.remove("add-animate");
  clearAllInputs();
});

my_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let { isAllValid } = makeValidation();
  let isValid = isAllValid();
  if (isValid) {
    setTimeout(() => {
      // model.style.visibility = "hidden";
      model.classList.toggle('show-model')
    }, 100);
    if (modelBtn_close.textContent === "Save") {
      setTimeout(() => {
        showAddedMessage(indicator, "updated Success Fully!!!", 1);
        editUser(userID);
        document.querySelector("#model-h").textContent = "Registeration";
        modelBtn_close.textContent = "Register";
      });
    } 
    else {
      setTimeout(() => {
        showAddedMessage(indicator, "Added Success Fully!!!", 1);
        storeData();
      }, 1400);
    }
    setTimeout(() => {
      showAddedMessage(indicator, "", 0);
      clearAllInputs();
    }, 4000);
  }
});

search_icon.addEventListener("click", () => {
  search(search_input.value);
});


renderUser(users);

//UI theme changer
if (localStorage.getItem("theme") !== "dark-theme") {
  document.body.classList.remove("dark-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
  anchor_tags.forEach((a_tag) => {
    a_tag.classList.remove("darkThem-ul-li-a");
  });
  thead.classList.remove("dark-thead");
} else {
  document.body.classList.add("dark-theme");
  themeIcon.classList.replace("fa-sun", "fa-moon");
  anchor_tags.forEach((a_tag) => {
    a_tag.classList.add("darkThem-ul-li-a");
  });
  thead.classList.add("dark-thead");
}

themeIcon.addEventListener("click", () => {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    anchor_tags.forEach((a_tag) => {
      a_tag.classList.remove("darkThem-ul-li-a");
    });
    thead.classList.remove("dark-thead");
    localStorage.setItem("theme", "light-theme");
  } else {
    document.body.classList.add("dark-theme");
    themeIcon.classList.replace("fa-sun", "fa-moon");
    anchor_tags.forEach((a_tag) => {
      a_tag.classList.add("darkThem-ul-li-a");
    });
    thead.classList.add("dark-thead");
    localStorage.setItem("theme", "dark-theme");
  }
});
