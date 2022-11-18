const images = [
    "images/01.png",
    "images/02.png",
    "images/03.png",
    "images/04.png",
    "images/05.png",
    "images/06.png",
    "images/07.png",
  ];

  var index = 0;
    // function drawImage() {
    //   var img = document.createElement("img");
    //   img.src = images[index];
    //   document.getElementById("content").appendChild(img);
    // }

    // 76 = 'l' key
    document.addEventListener("keydown", function (event) {
      if (event.keyCode == 82) {
        if (index == 0) {
          index = 6;
          console.log(index);
        } else {
          index--;
          console.log(index);
        }
        document.getElementById("images").src = images[index];
        console.log("L.");
      }
    });

    // 82 = 'r' key
    document.addEventListener("keydown", function (event) {
      if (event.keyCode ==76) {
        if (index == 6) {
          index = 0;
          console.log(index);
        } else {
          index++;
          console.log(index);
        }
        document.getElementById("images").src = images[index];
        console.log("R.");
      }
    });