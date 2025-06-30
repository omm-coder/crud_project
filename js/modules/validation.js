//this function make validation
function success(error_div, id) {
  Array.from(error_div).forEach((div) => {
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

export default function makeValidation(objInput, divError) {
  let isValidated = true;

  function displayErrorMessage(id, message) {
    Array.from(divError).forEach((div) => {
      if (div.id == id) {
        div.textContent = message;
        div.style.opacity = "1";
        isValidated = false;
        return;
      }
    });
  }
  Array.from(objInput).forEach((input) => {
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
      else success(divError, input.id);
    } else {
      displayErrorMessage(input.id, input.id + " can not be empty");
    }
  });

  const isAllValid = () => isValidated;
  return { displayErrorMessage, isAllValid};
}