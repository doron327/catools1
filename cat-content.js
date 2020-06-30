chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);

        if (request.click === true) { // triggered by click in order to change
            clickToChange();

        } else { // triggered by load/refresh page
            if (request.imageId === undefined || request.imageId === "99") {
                return;
            }
            changeBackground(request.imageId);
        }
        sendResponse(true);
    }
);

$(document).ready(function () {
    chrome.runtime.sendMessage(
        {trigger: true},
        function (response) {
            console.log(response);
        }
    );
});

function clickToChange() {
    var imageId;

    if (isDoubleClick()) {
        restoreToUglyBackground();
        imageId = "99"; // 99 represent the default boring background
    } else {
        var audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/6/62/Meow.ogg');
        audio.volume = 0.1;
        audio.play();
        document.body.style.cursor = "url('http://www.rw-designer.com/cursor-view/82207.png'), auto"
        imageId = changeBackground(); // return a new image ID
    }
    console.log("hello from cat-random script!");

    chrome.runtime.sendMessage(
        {imageId: imageId},
        function (response) {
            console.log(response);
        }
    );
}

function restoreToUglyBackground() {
    var elements = document.getElementsByClassName('sn-frameset-header');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background = 'inherit';
    }
    var elements = document.getElementsByClassName('sn-aside_themed');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background = 'inherit';
    }
    document.body.style.cursor = "auto";
}

function changeBackground(imageId) {
    var images = ["url('https://i.pinimg.com/originals/57/d2/74/57d2747b82e3366ff434d3468a6f52fd.png')",
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2kCUhAGH_XrJlSTcrUOFHqD9CSZ4i6FssTQ&usqp=CAU')",
        "url('https://i.pinimg.com/originals/54/0b/df/540bdf0f83edd58966842eae5d25abd1.jpg')",
        "url('https://stoffe.kawaiifabric.com/images/product_images/large_img/natural-color-with-cat-animal-flower-laminate-fabric-from-Japan-219472-2.jpg')",
        "url('https://i.pinimg.com/originals/4d/fb/c3/4dfbc318aee3927f0f889e3761ac8bb0.jpg')",
        "url('https://i.pinimg.com/originals/7a/01/f9/7a01f929488b24d61d732f3995104ab3.png')",
        "url('https://i.pinimg.com/originals/76/dd/dd/76ddddd104d978777c8fade319f4464e.jpg')",
        "url('https://www.dealsanimg.com/d/l400/pict/164167958395_/japanese-fabric-panel.jpg')",
        "url('https://previews.123rf.com/images/seniorpepeto/seniorpepeto1806/seniorpepeto180600001/103993227-cute-seamless-pattern-with-cats-and-flowers-wallpapers-for-kids-drawing-for-pajamas-and-linen-vector.jpg')",
        "url('https://i.pinimg.com/originals/52/08/64/5208649be6caffe3e6f65d392202a780.jpg')",
        "url('https://www.muralsyourway.com/media/catalog/product/cache/1/base/1200x/040ec09b1e35df139433887a97daa66f/h/a/halloween-cat-pattern-wallpaper.jpg')",
        "url('https://static.vecteezy.com/system/resources/previews/000/362/239/non_2x/cat-sitting-on-moon-night-sky-seamless-pattern-background-cute-magic-occult-design-vector.jpg')",
        "url('https://garden.spoonflower.com/c/9063430/p/f/m/_hCSu4h4eBjSRn_FZJNhiekoIte9E0-8m7nj87F2QdKARhWnTf8/Meowgical_friends_-_Anya_%26_Misha_cat_fabric_pattern..jpg')",
        "url('https://stoffe.kawaiifabric.com/images/product_images/large_img/coral-light-pink-fabric-cute-cat-flower-square-from-Japan-211805-1.JPG')",
        "url('https://i.pinimg.com/originals/7c/a7/ff/7ca7ffb1448ef40ff340ce9bc16251ab.png')",
        "url('https://data.whicdn.com/images/337825877/original.jpg')",
        "url('https://www.collectpnw.com/wp-content/uploads/2013/06/Screen-Shot-2013-06-25-at-8.50.01-AM.png')",
        "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMHI77V2_N8o_0Wiz9zYJi3LiNjMMvtjfZVVOMokutyTRpxoU&s')",
        "url('https://cdn.shopify.com/s/files/1/0159/6210/products/Pablo_Cat_Collage_1024x1024.jpg?v=1572656424')",
        "url('https://i.pinimg.com/originals/da/c4/6a/dac46ad39a73cdab286bc6a5118e8ca3.jpg')",
        "url('https://d2gg9evh47fn9z.cloudfront.net/thumb_COLOURBOX11523273.jpg')",
        "url('https://www.itl.cat/pngfile/big/18-188211_cat-wallpaper-phone-kangaroo.png')",
        "url('https://1001freedownloads.s3.amazonaws.com/vector/412194/preview/wm_10.jpg')"
    ];

    if (imageId === undefined) {
        imageId = Math.floor(Math.random() * 23);
    }

    var elements = document.getElementsByClassName('sn-frameset-header');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background = images[imageId];
    }
    var elements = document.getElementsByClassName('sn-aside_themed');
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background = images[imageId];
    }

    return imageId;
}

function isDoubleClick() {
    var result = false;
    if (localStorage.lastClickTime === undefined) {
        var time = new Date();
        localStorage.lastClickTime = time.getTime();
    } else {
        var currentClickTime = new Date();
        if (currentClickTime.getTime() - localStorage.lastClickTime < 500) {
            result = true;
        }
        localStorage.lastClickTime = currentClickTime.getTime();
    }
    return result;
}


