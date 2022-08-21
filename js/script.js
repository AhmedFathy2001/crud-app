const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productCategory = document.getElementById("productCategory");
const productDesc = document.getElementById("productDesc");
const mainBtn = document.getElementById("mainBtn");
let productList;
let indexToUpdate = 0;
let isNameTouched = false;
let isPriceTouched = false;
let isCategoryTouched = false;
let isDescTouched = false;

function updateTouched(input) {
  switch (input.name) {
    case "name":
      isNameTouched = true;
      break;
    case "price":
      isPriceTouched = true;
      break;
    case "category":
      isCategoryTouched = true;
      break;
    case "desc":
      isDescTouched = true;
      break;
  }
}

function regCheck() {
  if (regName() && regPrice() && regCategory() && regDesc()) {
    return true;
  }
}

function regName() {
  const regName = /[A-Za-z]{3,}$/;
  const nameRes = regName.test(productName.value);
  if (nameRes) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
  } else {
    if ((productName.value == "" && isNameTouched) || productName.value != "")
      productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
  }
  return nameRes;
}

function regPrice() {
  console.log("price");
  const regPrice = /^([5-9][0-9][0-9][0-9]|10000)$/;
  const priceRes = regPrice.test(productPrice.value);
  if (priceRes) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
  } else {
    if (
      (productPrice.value == "" && isPriceTouched) ||
      productPrice.value != ""
    )
      productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
  }
  return priceRes;
}

function regCategory() {
  const regCategory = /^[A-Za-z]{3,}$/;
  const categoryRes = regCategory.test(productCategory.value);
  if (categoryRes) {
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
  } else {
    if (
      (productCategory.value == "" && isCategoryTouched) ||
      productCategory != ""
    )
      productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
  }
  return categoryRes;
}

function regDesc() {
  const regDesc = /^.{30,}$/;
  const descRes = regDesc.test(productDesc.value);
  if (descRes) {
    productDesc.classList.remove("is-invalid");
    productDesc.classList.add("is-valid");
  } else {
    if ((productDesc.value == "" && isDescTouched) || productDesc.value != "")
      productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
  }
  return descRes;
}

const regItem = (regex, item) => {
  const res = regex.test(item.value);
  if (res) {
    item.classList.remove("is-invalid");
  } else {
    item.classList.add("is-invalid");
  }
  return res;
};

productName.addEventListener("keydown", regName);
productPrice.addEventListener("keydown", regPrice);
productCategory.addEventListener("keydown", regCategory);
productDesc.addEventListener("keydown", regDesc);

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
  let disable = false;
  if (!regCheck()) {
    disable = true;
  }
  mainBtn.disabled = disable;
};

for (let i = 0; i < document.querySelectorAll(".input ").length; i++) {
  const input = document.querySelectorAll(".input")[i];
  input.addEventListener("keydown", btnToggler);
}

function addProduct() {
  if (regCheck()) {
    const product = {
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
  let container = ``;
  for (let i = 0; i < productList.length; i++) {
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
  let container = ``;
  for (let i = 0; i < productList.length; i++) {
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
