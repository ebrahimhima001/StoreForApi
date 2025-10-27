let productsCart = [];

if (localStorage.getItem("Cart")) {
  productsCart = JSON.parse(localStorage.getItem("Cart"));
}

async function getData(productsCart) {
  let arr = [];
  for (var i = 0; i < productsCart.length; i++) {
    var requests = await fetch(
      `https://fakestoreapi.com/products/${productsCart[i]}`
    );
    var result = await requests.json();
    arr.push(result);
  }
  printProducts(arr);
}

getData(productsCart);

function printProducts(products) {
  let box = ``;
  for (var i = 0; i < products.length; i++) {
    box += `
            <div class="col-md-3 mt-4">
                <img class='w-100 image' src="${products[i].image}" alt="">
                <h4>${products[i].title.split(" ").splice(0, 3).join(" ")}</h4>
                <p>${products[i].description
                  .split(" ")
                  .splice(0, 5)
                  .join(" ")}</p>
                <strong>$${products[i].price}</strong>
                <button onclick="removeItem(${
                  products[i].id
                })" class="btn btn-danger">Remove Item</button>
            </div>
        `;
  }
  document.getElementById("box").innerHTML = box;
}

// remove Item
function removeItem(ItemID) {
  let index = productsCart.indexOf(ItemID);
  if (index !== -1) {
    productsCart.splice(index, 1);
  }
  localStorage.setItem("Cart", JSON.stringify(productsCart));
  getData(productsCart);
  console.log(productsCart);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: ` تم حذف المنتج بنجاح رقم  (${index + 1})`,
  });

  noData()
}

function noData() {
  let noItems = "";
  if (productsCart == "") {
    noItems = `
        <div class="titleInfo"> <strong> 😕 لا توجد نتائج الأن</strong> </div>
      <br>
      <a href="../index.html"><button class="btn btn-primary backHome"> رجوع للصفحة الرئسية </button></a>
        `;
  }else{
    productsCart = productsCart
  }
  document.getElementById("NotFound").innerHTML = noItems
}

noData()


