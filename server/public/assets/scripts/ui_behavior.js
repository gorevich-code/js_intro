const createUsrBtnHeader = document.getElementById("create-usr-header-btn");
const getAllUsrsBtnHeader = document.getElementById("get-all-usr-header-btn");
const getUsrBtnHeader = document.getElementById("get-usr-header-btn");
const updateUsrBtnHeader = document.getElementById("update-usr-header-btn");
const deleteUsrBtnHeader = document.getElementById("dlt-usr-header-btn");

const hideAllForms = () => {
  Array.from(document.getElementById("forms-wrapper").children).forEach((child) => {
    console.log(child);
    child.style.display = "none";
  });
};
hideAllForms();
createUsrBtnHeader.addEventListener("click", () => {
  hideAllForms();
  document.getElementById("create-user-form-wrapper").style.display = "block";
});

getAllUsrsBtnHeader.addEventListener("click", () => {
  hideAllForms();
  document.getElementById("get-all-users-form-wrapper").style.display = "block";
});

getUsrBtnHeader.addEventListener("click", () => {
  hideAllForms();
  document.getElementById("get-user-by-id-form-wrapper").style.display = "block";
});

updateUsrBtnHeader.addEventListener("click", () => {
  hideAllForms();
  document.getElementById("update-user-form-wrapper").style.display = "block";
});

deleteUsrBtnHeader.addEventListener("click", () => {
  hideAllForms();
  document.getElementById("delete-user-form-wrapper").style.display = "block";
});
