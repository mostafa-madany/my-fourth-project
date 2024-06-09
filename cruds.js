let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "creat";
let assistant_var;
function getTotal() {
  if (price.value != "") {
    let result = +taxes.value + +ads.value + +price.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
let data_product = [];
if (localStorage.product != null) {
  data_product = JSON.parse(localStorage.getItem("product"));
} else {
  data_product = [];
}
submit.onclick = function () {
  let new_product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (mood === "creat") {
    if (new_product.count > 1) {
      for (let i = 0; i < new_product.count; i++) {
        data_product.push(new_product);
      }
    } else {
      data_product.push(new_product);
    }
  } else {
    data_product[assistant_var] = new_product;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(data_product));
  clearData();
  readData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function readData() {
  getTotal();
  let table = "";
  for (let i = 0; i < data_product.length; i++) {
    table += `
    <tr>
        <td>${i}</td>
        <td>${data_product[i].title}</td>
        <td>${data_product[i].price}</td>
        <td>${data_product[i].taxes}</td>
        <td>${data_product[i].ads}</td>
        <td>${data_product[i].discount}</td>
        <td>${data_product[i].total}</td>
        <td>${data_product[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (data_product.length > 0) {
    deleteAll.innerHTML = `
    <button onclick="deleteAll()">deleteAll ( ${data_product.length} )</button>
    
    `;
  } else {
    deleteAll.innerHTML = ``;
  }
}
function deleteData(i) {
  data_product.splice(i, 1);
  localStorage.product = JSON.stringify(data_product);
  readData();
}
document.addEventListener("DOMContentLoaded", readData);

function deleteAll() {
  localStorage.clear();
  data_product.splice(0);
  readData();
}

function updateData(i) {
  title.value = data_product[i].title;
  price.value = data_product[i].price;
  taxes.value = data_product[i].taxes;
  ads.value = data_product[i].ads;
  discount.value = data_product[i].discount;
  count.style.display = "none";
  category.value = data_product[i].category;
  getTotal();
  submit.innerHTML = "update";
  mood = "update";
  assistant_var = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";
function getSearch(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "search By" + searchMood;
  search.focus();
  search.value = "";
  readData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < data_product.length; i++) {
    if (searchMood == "title") {
      if (data_product[i].title.includes(value.toLowerCase())) {
        table += `
    <tr>
        <td>${i}</td>
        <td>${data_product[i].title}</td>
        <td>${data_product[i].price}</td>
        <td>${data_product[i].taxes}</td>
        <td>${data_product[i].ads}</td>
        <td>${data_product[i].discount}</td>
        <td>${data_product[i].total}</td>
        <td>${data_product[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    } else {
      if (data_product[i].category.includes(value.toLowerCase())) {
        table += `
    <tr>
        <td>${i}</td>
        <td>${data_product[i].title}</td>
        <td>${data_product[i].price}</td>
        <td>${data_product[i].taxes}</td>
        <td>${data_product[i].ads}</td>
        <td>${data_product[i].discount}</td>
        <td>${data_product[i].total}</td>
        <td>${data_product[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
