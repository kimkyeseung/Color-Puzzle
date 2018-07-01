
var startButton = document.getElementById('startButton');
var submitButton = document.getElementById('submitButton');
var firstBlock = document.getElementById('firstBlock');

var board = document.getElementById('board');

var whatQuiz = ['Hue', 'Saturation', 'Brightness'];

var answer;


if (!localStorage.colorPuzzle) {
  localStorage.setItem('colorPuzzle', JSON.stringify({level: 1, score: 0}));
}
var storageData = JSON.parse(localStorage.getItem('colorPuzzle'));
  

//key maker
function makeKeyArray_hue(number) {
  var arr = [];
  for (var i = 1; i <= number; i++) {
    arr.push(Math.floor(300*(i/number)));
  }
  return arr;
}


//shuffle
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length; i; i--) {
    var j = Math.floor(Math.random() * i);
    var x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

//game
function game(event) {
//   var ran = Math.floor(Math.random() * 3);
//   var quizChoice = whatQuiz[ran];
  console.log('start');
  startButton.style.display = 'none';
  submitButton.style.display = 'block';
  board.style.display = 'block';
  
  
  answer = makeKeyArray_hue(storageData.level*4);
  var quiz = shuffle(answer);

  for (var i = 0; i < quiz.length; i++) {
    var madeBlock = document.createElement('li');
    madeBlock.setAttribute('draggable', 'true');
    madeBlock.classList.add('block');
    madeBlock.id = 'block' + i;
    madeBlock.style.backgroundColor = 'hsl(' + quiz[i] + ', 100%, 60%)';
    madeBlock.setAttribute('key', quiz[i]);
    board.appendChild(madeBlock);

  }

  for (var i = 0; i < board.children.length; i++) {
    board.children[i].style.width = 100 / board.children.length + '%'
  }

  var lastBlock = document.createElement('li');
  lastBlock.classList.add('block');
  board.appendChild(lastBlock);
}

startButton.addEventListener('click', game);


document.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('piece', event.target.id);
});

document.addEventListener('dragover', function(event) {
  event.preventDefault();
});

document.addEventListener('dragenter', function(event) {
  if (event.target.classList.contains('block')) {
    console.log(event.target.id);
    event.target.style.borderLeft = '4px solid CornFlowerBlue';
  }
});

document.addEventListener('dragleave', function(event) {
  if (event.target.classList.contains('block')) {
    event.target.style.borderLeft = '';
  }
});

document.addEventListener('drop', function(event) {
  if (event.target.classList.contains('block')) {
    event.target.style.borderLeft = '';
    var data = event.dataTransfer.getData('piece');
    board.insertBefore(document.getElementById(data),event.target);
  }
})


submitButton.addEventListener('click', function(event) {
  var result = [];
  for (var i = 1; i < board.children.length-1; i++) {
    result.push(Number(board.children[i].getAttribute('key')));
  }
  if (String(result) === String(answer)) {
    alert('정답입니다!');
    storageData.level++;
    localStorage.setItem('colorPuzzle', JSON.stringify(storageData));
    while (board.children.length > 1) {
      board.lastElementChild.remove();
    }
    game();
  } else {
    alert('떙! 정답이 아닙니다! 다시 해보세요');
  }
})