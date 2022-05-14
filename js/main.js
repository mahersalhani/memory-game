let button = document.querySelector(".control-button span");

button.addEventListener("click", function () {
  let yourName = prompt("What's Your Name");

  if (yourName === null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }

  document.querySelector(".control-button").remove();

  blocks.forEach((block, i) => {
    block.classList.add("flipped");

    setTimeout(function () {
      block.classList.remove("flipped");
    }, 1000);
  });
});

//زمن يلي بياخده ليقلبوا ويرجعوا
let duration = 500;

let blockContainer = document.querySelector(".memory");

let blocks = Array.from(blockContainer.children);

//طلعت عدد العناصر وضفتن ل اراي منشان استعملها بتغير ترتيب الكود
let orderRange = [...Array(blocks.length).keys()];
let orderRangeCopy = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

//Add Order Css Property To Game Blocks

blocks.forEach((block, i) => {
  //Add Css Order
  block.style.order = orderRange[i];

  //Add Click Event
  block.addEventListener("click", function () {
    //Trigger The Block Function
    flipBlock(block);
  });
});

//flip function

function flipBlock(selectBlock) {
  selectBlock.classList.add("flipped");

  //Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((el) => el.classList.contains("flipped"));

  //If Theres Two Selcted Blocks
  if (allFlippedBlocks.length === 2) {
    //Stop Clicking Function
    stopClicking();

    //Check Matched Block Function
    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//Stop Clicking Function
function stopClicking() {
  //Add Class No Click On Main Countainer
  blockContainer.classList.add("no-clicking");

  setTimeout(() => {
    blockContainer.classList.remove("no-clicking");
  }, duration);
}

//Check Matched Block Function
function checkMatchedBlock(first, second) {
  let tries = document.querySelector(".tries span");

  if (first.dataset.tec === second.dataset.tec) {
    first.classList.remove("flipped");
    second.classList.remove("flipped");

    first.classList.add("matched");
    second.classList.add("matched");

    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
    }, duration);

    document.getElementById("failure").play();
  }
}

//shuffle function

function shuffle(arr) {
  let current = arr.length,
    temp,
    random;

  while (current > 0) {
    //Get Random Number
    random = Math.floor(Math.random() * current);

    //Decrease Length By One
    current--;

    //[1] Save Current Element in Stash
    temp = arr[current]; //جيب اخر عنصر

    //[2] Current Element = Random Element
    arr[current] = arr[random]; //منشان بدل مكان الرقم الاخير ل انديكس عشوائي

    //[3] Random Element = Get Element From Stash
    arr[random] = temp;
  }
}
