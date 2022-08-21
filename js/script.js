var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var mainBtn = document.getElementById("mainBtn");
var productList;
var indexToUpdate = 0;

function regCheck() {
  regName();
  regPrice();
  regCategory();
  regDesc();
  if (regName() && regPrice() && regCategory() && regDesc()) {
    return true;
  }
}

function regName() {
  var regName = /^[A-Z][a-z]{3,5}$/;
  var nameRes = regName.test(productName.value);
  if (nameRes) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
  } else {
    if (productName.value != "") productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
  }
  return nameRes;
}

function regPrice() {
  var regPrice = /^([5-9][0-9][0-9][0-9]|10000)$/;
  var priceRes = regPrice.test(productPrice.value);
  if (priceRes) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
  } else {
    if (productName.value != "") productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
  }
  return priceRes;
}

function regCategory() {
  var regCategory = /^[A-Z][a-z]{3,9}$/;
  var categoryRes = regCategory.test(productCategory.value);
  if (categoryRes) {
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
  } else {
    if (productName.value != "") productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
  }
  return categoryRes;
}

function regDesc() {
  var regDesc = /^.{30,}$/;
  var descRes = regDesc.test(productDesc.value);
  if (descRes) {
    productDesc.classList.remove("is-invalid");
    productDesc.classList.add("is-valid");
  } else {
    if (productName.value != "") productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
  }
  return descRes;
}

const regItem = (regex, item) => {
  var res = regex.test(item.value);
  if (res) {
    item.classList.remove("is-invalid");
  } else {
    item.classList.add("is-invalid");
  }
  return res;
};

function checker() {
  if (productName.value == "") {
    productName.classList.remove("is-invalid");
  } else {
    productName.addEventListener("blur", regName);
  }
  if (productPrice.value == "") {
    productPrice.classList.remove("is-invalid");
  } else {
    productPrice.addEventListener("blur", regPrice);
  }
  if (productCategory.value == "") {
    productCategory.classList.remove("is-invalid");
  } else {
    productCategory.addEventListener("blur", regCategory);
  }
  if (productDesc.value == "") {
    productDesc.classList.remove("is-invalid");
  } else {
    productDesc.addEventListener("blur", regDesc);
  }
}

window.addEventListener("change", checker);

mainBtn.addEventListener("click", onMainButtonClick);

function onMainButtonClick() {
  if (mainBtn.innerHTML == "Add Product") {
    addProduct();
  } else {
    updateProductOnClick();
  }
}

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
  displayData();
} else {
  productList = [];
}

mainBtn.disabled = true;

const btnToggler = () => {
  var disable = false;
  document.querySelectorAll(".input").forEach((elem) => {
    if (elem.value === "") {
      disable = true;
    }
  });
  mainBtn.disabled = disable;
};

for (var i = 0; i < document.querySelectorAll(".input ").length; i++) {
  var input = document.querySelectorAll(".input")[i];
  input.addEventListener("change", btnToggler);
}

function addProduct() {
  if (regCheck()) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDesc.value,
    };
    productList.push(product);
    setInStorage();
    displayData();
    removeIsValid();
    updateFormValue();
  }
}

document.addEventListener("wheel", function () {
  if (document.activeElement.type === "number") {
    document.activeElement.blur();
  }
});

function setInStorage() {
  localStorage.setItem("productList", JSON.stringify(productList));
}

function displayData() {
  var container = ``;
  for (var i = 0; i < productList.length; i++) {
    container += `<tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button class="btn btn-info" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tBody").innerHTML = container;
}

function updateFormValue(data) {
  productName.value = data ? data.name : "";
  productPrice.value = data ? data.price : "";
  productCategory.value = data ? data.category : "";
  productDesc.value = data ? data.desc : "";
}

function updateProduct(index) {
  indexToUpdate = index;
  updateFormValue(productList[index]);
  mainBtn.innerHTML = "Update";
  mainBtn.classList.remove("btn-primary");
  mainBtn.classList.add("btn-info");
}

function updateProductOnClick() {
  if (regCheck()) {
    productList[indexToUpdate].name = productName.value;
    productList[indexToUpdate].price = productPrice.value;
    productList[indexToUpdate].category = productCategory.value;
    productList[indexToUpdate].desc = productDesc.value;
    productList.splice(indexToUpdate, 1, productList[indexToUpdate]);
    mainBtn.innerHTML = "Add Product";
    mainBtn.classList.remove("btn-info");
    mainBtn.classList.add("btn-primary");
    setInStorage();
    displayData();
    removeIsValid();
    updateFormValue();
  }
}

function removeIsValid() {
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
}

function deleteProduct(index) {
  productList.splice(index, 1);
  setInStorage();
  displayData();
}

function searchItem(term) {
  var container = ``;
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      container += `<tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td><button class="btn btn-info" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
        `;
    }
  }
  document.getElementById("tBody").innerHTML = container;
}
