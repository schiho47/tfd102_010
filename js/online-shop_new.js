document.addEventListener("DOMContentLoaded",function(){
  //金額加總

  function calctotal() {
    let total = 0;
    const price = document.querySelectorAll(".price");
    const num = document.querySelectorAll(".number");

    for (let i = 0; i < price.length; i++) {
      let pricevalue = Number(price[i].innerText.replace("$", ""));
      let numvalue = num[i].value;
      total = total + pricevalue * numvalue;
    }
    document.querySelector(".total").innerText = "$" + total;
  }

  //加入購物車，按按鈕
  const cartbtn = document.querySelectorAll(".favimg");
  for (let i = 0; i < cartbtn.length; i++) {
    cartbtn[i].addEventListener("click", clickaddtocart);
  }

  function clickaddtocart(e) {
    const button = e.target;
    const item = button.parentElement.parentElement;
    const img = item.querySelector(".product").src;
    const title = item.querySelector(".itemname").innerText;
    const itemprice = item.querySelector("#itemprice").innerText;
    // console.log(item);
    let amount = 1;
    // console.log(img, title,itemprice);
    addItemtoCart(img, title, amount, itemprice);
    //讓購物車顯示出來
    showcart();
  }

  //讓購物車顯示出來
  function showcart() {
    const cart = document.querySelector(".cart");
    console.log(cart);
    cart.style.display = "block";
    cart.style.zIndex=30;
  }

  // //漢堡購物車
  // function hamshowcart() {
  //   const hamcart = document.querySelector('.cartham');
  //   hamcart.style.display='block';
  // }

  //加入購物車
  let cartarr = [];
  if (localStorage.getItem("cart")) {
    cartarr = JSON.parse(localStorage.getItem("cart"));
    setCart();
    carticonlight();
}

  function addItemtoCart(img, title, amount, itemprice) {
    const cartRow = document.createElement("tr");
    const productpart = document.querySelector(".carttable");
    const itemname = document.querySelectorAll(".title");
    // console.log(itemname);
    for (let i = 0; i < cartarr.length; i++) {
      if (itemname[i].innerText === title) {
        alert("商品已經在購物車了!");
        return;
      }
    }

    let newitem = {
      imgURL: `${img}`,
      name: `${title}`,
      amount: `${amount}`,
      price: `${itemprice}`,
    };
    cartarr.push(newitem);
    localStorage.setItem("cart", JSON.stringify(cartarr));
    alert('商品已加入購物車');

    for (let i = 0; i < cartarr.length; i++) {
      const cartRowContents = `
          <td><img src="${img}" class="product"></td>
          <td class="title">${title}</td>
          <td><input type="number" value="${amount}" class="number"></td>
          <td class="price">${itemprice}</td>
          <td><img src="./version2/index/times-solid.svg" alt="" class="clbtn"></td>`;
      cartRow.innerHTML = cartRowContents;
      productpart.append(cartRow);
      cartRow.querySelector(".clbtn").addEventListener("click", removecartitem);
      cartRow.querySelector(".number").addEventListener("change", numchange);
      calctotal();
      carticonlight();
    }
    // setCart();
  }

  function setCart() {
    let cartList = "";
    for (let i = 0; i < cartarr.length; i++) {
      cartList = `
          <td><img src="${cartarr[i].imgURL}" class="product"></td>
          <td class="title">${cartarr[i].name}</td>
          <td><input type="number" value="${cartarr[i].amount}" class="number"></td>
          <td class="price">${cartarr[i].price}</td>
          <td><img src="./version2/index/times-solid.svg" alt="" class="clbtn"></td>`;
      const productpart = document.querySelector(".carttable");
      const cartRow = document.createElement("tr");
      cartRow.innerHTML = cartList;
      productpart.append(cartRow);
      cartRow.querySelector(".clbtn").addEventListener("click", removecartitem);
      cartRow.querySelector(".number").addEventListener("change", numchange);
      calctotal();
    }
  }

  //數量改變更新總和
  const num = document.querySelectorAll(".number");

  for (let i = 0; i < num.length; i++) {
    num[i].addEventListener("change", numchange);
  }

  function numchange(e) {
    const input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    const whatchanged=input.closest("td").previousElementSibling.innerText;
    cartarr=JSON.parse(localStorage.getItem('cart'));
    for(let i=0; i<cartarr.length; i++){
        if(cartarr[i].name===whatchanged){
            cartarr[i].amount=input.value;
        }
    }
    localStorage.setItem('cart',JSON.stringify(cartarr));
    calctotal();
    carticonlight();
  }


  //亮燈
  function carticonlight() {
    const light = document.querySelector(".incart");
    const lightham=document.querySelector('.incartham');

    cartarr = JSON.parse(localStorage.getItem("cart"));
    // console.log(cartarr);
    let incart=[];
    for(let i=0; i<cartarr.length;i++){
        incart.push(cartarr[i].amount);
    }
    console.log(incart);
    let sum=0;
    for(let i =0;i<incart.length;i++){
        let eachamount = Number(incart[i]);
        sum = sum + eachamount;
    }
    console.log(sum);
    light.innerText =sum;
    lightham.innerText=sum;
    if(sum===0){
        light.style.display='none';
        lightham.style.display='none';
        closecart();
    }else{
        light.style.display = "block";
        lightham.style.display='block';
    }
  }

  //按按鈕移除

  const clsbtn = document.querySelectorAll(".clbtn");
  for (let i = 0; i < clsbtn.length; i++) {
    clsbtn[i].addEventListener("click", removecartitem);
  }

  function removecartitem(e) {
    e.target.parentElement.parentElement.remove();
    cartarr = JSON.parse(localStorage.getItem("cart"));
    const etitle = e.target.closest("tr").childNodes[2].nextSibling.innerText;
    // console.log(etitle);
    for (let i = 0; i < cartarr.length; i++) {
      if (etitle === cartarr[i].name) {
        cartarr.splice(i,1);
      }
    }
    console.log(cartarr);
    localStorage.setItem("cart", JSON.stringify(cartarr));

    calctotal();
    carticonlight();
  }

  //關閉購物車
  const bigclosebtn = document.querySelector(".closeall");
  bigclosebtn.addEventListener("click", closecart);
  function closecart() {
    const cart = document.querySelector(".cart");
    cart.style.display = "none";
  }

  //按icon打開
  const iconshop = document.querySelector(".iconshop");
  const itemname = document.querySelectorAll(".title");
  const iconham = document.querySelector(".iconshopham");
  //   console.log(itemname);
  iconshop.addEventListener("click", showcart);
  iconham.addEventListener("click", showcart);

});

       