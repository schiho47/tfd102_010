document.addEventListener("DOMContentLoaded", function() {

    //開場

    const map = document.querySelector('#begin');
    const main = document.querySelector('#back');
    console.log(map);
    map.addEventListener('click',function(){
        this.style.display='none';
        main.style.display='block';
    });






    //popup
    let overlay_show = document.querySelector(".overlay"); // 只有一個的時候用 querySelector，會只抓到一個元素，className 一律會是陣列
    let link_popup = document.getElementsByClassName("link_popup");
    let model_show= document.getElementsByClassName("model");
    
    // console.log(link_popup)
    
    for (let i=0; i<link_popup.length ; i++){
        link_popup[i].addEventListener("click",function(){
            model_show[i].classList.add("active");
            overlay_show.classList.add("active");
        });
    }
    
    let close_btn = document.getElementsByClassName("close_botton");
    
    for (let j=0; j<close_btn.length; j++){
        close_btn[j].addEventListener("click",function(){
            overlay_show.classList.remove("active");
            close_btn[j].closest(".model").classList.remove("active");
        });
    };

})


//typewriting effect





