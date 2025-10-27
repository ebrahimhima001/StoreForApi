

// get data of Api
async function getProducts() {
  let request = await fetch(`https://fakestoreapi.com/products`);
  let data = await request.json();
  printProducts(data);
}
getProducts();

// print data of HTML
function printProducts(Products) {
  let cartona = ``;
  for (var i = 0; i < Products.length; i++) {
    cartona += `
        <div class="col-md-3 mt-4">
                <img class='w-100 image' src="${Products[i].image}" alt="">
                <h4>${Products[i].title.split(" ").splice(0, 3).join(" ")}</h4>
                <p>${Products[i].description
                  .split(" ")
                  .splice(0, 5)
                  .join(" ")}</p>
                <strong>$${Products[i].price}</strong>
                <button onclick="addToCart(${Products[i].id})" class="btn btn-success">Add To Cart</button>
            </div>
        `;
  }
  document.getElementById("box").innerHTML = cartona;
}


let ProductsIDS = JSON.parse(localStorage.getItem("Cart")) || [];

function addToCart(id) {
  ProductsIDS.push(id);
  console.log("ID : ", ProductsIDS);
  localStorage.setItem("Cart", JSON.stringify(ProductsIDS));
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
    title: "تم اضافة هذا المنتج بنجاح",
  });
}
