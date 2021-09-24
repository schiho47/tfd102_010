document.addEventListener("DOMContentLoaded", function() {
  //美食
  const food = document.querySelectorAll(".foodpic");
  const intr = document.querySelectorAll(".foodIntr");
  for (let i = 0; i < food.length; i++) {
    food[i].addEventListener("click", function () {
      for (let j = 0; j < intr.length; j++) {
        if (intr[j].id === this.id) {
          intr[j].classList.remove("hidden");
        } else {
          intr[j].classList.add("hidden");
        }
      }
    });

    food[i].addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1)";
    });
    food[i].addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  }

  //商家輪播
  const nextRight = document.querySelector(".nextbtn");
  const sliderRow = document.getElementsByClassName("shop");
  //向右查看
  let range = 0;
  let imgIndex = 0;
  nextRight.addEventListener("click", function () {
    range -= 200;
    imgIndex += 1;
    console.log(range);
    console.log(imgIndex);
    $(".shop").css("transform", `translateX(${range}px)`);
    if (range <= -800) {
      range = 200;
    } else if (range < 0) {
      $(".prev").css("visibility", "visible");
    } else if (range > 0) {
      range = 0;
      imgIndex = 0;
    } else if (range === 0) {
      // $(".prev").css("visibility", "hidden");
      imgIndex = 0;
    }
  });
  // //向左查看
  // imgIndex=[...sliderRow].length-1;
  let move = 0;
  let index = 0;
  $(".prev").click(function () {
    move += 200;
    if (index === -1) {
      index = [...sliderRow].length - 1;
      move = 0;
    }
    if (imgIndex === 0) {
      index = [...sliderRow].length - 1;
    }

    imgIndex -= 1;
    test = -index * 100;
    console.log(test);
    $(".shop").css("transform", `translateX(${test}px)`);
    index -= 1;
    console.log(move);
    console.log(index);
  });

  // //hover 效果
  $(".prev").mouseenter(function () {
    $(".leftarrow").animate({ "margin-left": "-60px" }, 300);
    $(".leftgray").css("display", "inline");
    $(".prev").addClass("after");
  });
  $(".prev").mouseleave(function () {
    $(".leftarrow").css("margin-left", "0px");
    $(".leftgray").css("display", "none");
    $(".prev").removeClass("after");
  });

  $(".nextbtn").mouseenter(function () {
    $(".rightarrow").animate({ "margin-right": "-60px" }, 300);
    $(".rightgray").css("display", "inline");
    $(".nextbtn").addClass("after");
  });
  $(".nextbtn").mouseleave(function () {
    $(".rightarrow").css("margin-right", "0px");
    $(".rightgray").css("display", "none");
    $(".nextbtn").removeClass("after");
  });

  const weather = async function () {
    const res = await fetch(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-329DD8B4-A037-4F7A-A993-0B33D02AD5F0&format=JSON"
    );
    const data = await res.json();
    console.log(data);
    const html = ` <h1>天氣資訊  <img src="/images/weather.png" alt="圖片出去玩了"></h1>
    <div class="view">
        <iframe width="625" height="400" src="https://embed.windy.com/embed2.html?lat=24.284&lon=120.280&detailLat=25.050&detailLon=121.532&width=650&height=450&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>
    </div>
    <div class="weatherBlock">
    <h2>${data.records.locations[0].location[3].locationName}</h2>
        <span>${data.records.locations[0].location[3].weatherElement[1].time[0].startTime.slice(
          0,
          11
        )}</span>
        <br>
        <span>${
          data.records.locations[0].location[3].weatherElement[6].time[0]
            .elementValue[0].value
        } </span>
        <br>
        <span>  平均溫度：</span>
        <span>${
          data.records.locations[0].location[3].weatherElement[1].time[0]
            .elementValue[0].value + "°C"
        } </span>
        <br>
        <span>降雨機率：</span>
        <span>${
          data.records.locations[0].location[3].weatherElement[0].time[0]
            .elementValue[0].value + "％"
        }</span>
        <br>
        <span>紫外線指數：</span>
        <span>${
          data.records.locations[0].location[3].weatherElement[9].time[0]
            .elementValue[0].value
        } ${
      data.records.locations[0].location[3].weatherElement[9].time[0]
        .elementValue[1].value
    }</span>
    <br>
    <img src="/images/daton.png" class="daton1">
    <img src="/images/daton.png" class="daton2">
    <img src="/images/daton.png" class="daton3">
    </div>`;
    const weather = document.querySelector(".weather");
    // console.log(data.records.locations[0].location[3].weatherElement[9].time[0].elementValue);

    weather.innerHTML = html;
  };
  weather();

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
    cart.style.zIndex = 30;
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
    alert("商品已加入購物車");

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
    const whatchanged = input.closest("td").previousElementSibling.innerText;
    cartarr = JSON.parse(localStorage.getItem("cart"));
    for (let i = 0; i < cartarr.length; i++) {
      if (cartarr[i].name === whatchanged) {
        cartarr[i].amount = input.value;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cartarr));
    calctotal();
    carticonlight();
  }

  //亮燈
  function carticonlight() {
    const light = document.querySelector(".incart");
    // const lightham = document.querySelector(".incartham");

    cartarr = JSON.parse(localStorage.getItem("cart"));
    // console.log(cartarr);
    let incart = [];
    for (let i = 0; i < cartarr.length; i++) {
      incart.push(cartarr[i].amount);
    }
    console.log(incart);
    let sum = 0;
    for (let i = 0; i < incart.length; i++) {
      let eachamount = Number(incart[i]);
      sum = sum + eachamount;
    }
    console.log(sum);
    light.innerText = sum;
    // lightham.innerText = sum;
    if (sum === 0) {
      light.style.display = "none";
      // lightham.style.display = "none";
      closecart();
    } else {
      light.style.display = "block";
      // lightham.style.display = "block";
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
        cartarr.splice(i, 1);
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
  // const iconshop = document.querySelector(".iconshop");
  const itemname = document.querySelectorAll(".title");
  const iconham = document.querySelector(".iconshopham");
  //   console.log(itemname);
  // iconshop.addEventListener("click", showcart);
  iconham.addEventListener("click", showcart);
});
