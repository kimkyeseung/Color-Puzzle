
var startButtonH = document.getElementById('startButtonH');
var startButtonS = document.getElementById('startButtonS');
var startButtonB = document.getElementById('startButtonB');

var submitButton = document.getElementById('submitButton');
var firstBlock = document.getElementById('firstBlock');

var board = document.getElementById('board');

var your = document.getElementById('your');
var yourHueClass = document.getElementById('yourHueClass');
var yourBrightnessClass = document.getElementById('yourBrightnessClass');
var yourSaturationClass = document.getElementById('yourSaturationClass');

var sideYou = document.getElementById('sideYou');
var sideYourClass = document.getElementById('sideYourClass');

var whatQuiz = ['Hue', 'Saturation', 'Brightness'];

var answer;

var hierarchy = [,'거지', '천민', '평민', '부자', '귀족', '영주', '장군', '왕', '황제', '마스터', '슈퍼마스터', '슈퍼그랜드마스터', '킹갓제너럴그랜드마스터', '우주의 지배자', '신'];

var submitFlag;

var win = document.getElementById('win');

if (!localStorage.colorPuzzle) {
  localStorage.setItem('colorPuzzle', JSON.stringify({hLevel: 1, sLevel: 1, bLevel: 1}));
}
var storageData = JSON.parse(localStorage.getItem('colorPuzzle'));

if ((storageData.hLevel >= 15) && (storageData.sLevel >= 15) && (storageData.bLevel >= 15)) {
  document.getElementById('title').style.display = 'none';
  document.getElementById('buttonGroup').style.display = 'none';
  your.innerHTML = '<p>당신은</p><p class="class">색채의 신</p><p>입니다.</p>'
  var regame = document.createElement('p');
  regame.textContent = '처음부터 다시하기';
  regame.id = 'regame';
  regame.addEventListener('click', function(event) {
    localStorage.setItem('colorPuzzle', JSON.stringify({hLevel: 1, sLevel: 1, bLevel: 1}));
    window.location.reload();
  });
  your.appendChild(regame);
}

yourHueClass.textContent = '색상 : ' + hierarchy[storageData.hLevel];
yourBrightnessClass.textContent = '명도 : ' + hierarchy[storageData.bLevel];
yourSaturationClass.textContent = '채도 : ' + hierarchy[storageData.sLevel];
  

//key maker
function makeKeyArray_300(number) {
  var arr = [];
  for (var i = 1; i <= number; i++) {
    arr.push(Math.floor(300*(i/number)));
  }
  return arr;
}

function makeKeyArray_100(number) {
  var arr = [];
  for (var i = number-1; i >= 0; i--) {
    arr.push(Math.floor(100*(i/number)));
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

document.getElementById('buttonGroup').addEventListener('mouseover', function(event) {
  if (event.target.id !== submitFlag) {
    event.preventDefault();
    event.target.style.backgroundColor = 'red';
    var originText = event.target.textContent;
    event.target.textContent = '도전하기';
    event.target.style.color = 'white';
    event.target.addEventListener('mouseleave', function(event) {
      event.target.textContent = originText;
      event.target.style.backgroundColor = '';
      event.target.style.color = '';
    });
  }
});


//game
function game(event) {
  win.style.display = 'none';
  while (board.children.length > 1) {//게임판 비우기
    board.lastElementChild.remove();
  }
  console.log('start');
  
  document.getElementById('title').innerHTML = '<h4><a href="">도전! 색채의 신</a></h4>';

  your.style.display = 'none';

  this.style.cursor = 'default';
  this.style.backgroundColor = 'red';// 작동 x
  this.style.color = 'white';        // 작동 x

  this.removeEventListener('click', game);
  
  submitButton.style.display = 'block';
  board.style.display = 'block';
  sideYou.style.display = 'block';

  if (this.id === 'startButtonH') {
    submitFlag = 'startButtonH';

    sideYourClass.textContent = '색상 : 당신은 ' + hierarchy[storageData.hLevel] + '입니다.';
    startButtonS.style.color = '';
    startButtonB.style.color = '';
    startButtonS.style.backgroundColor = '';
    startButtonB.style.backgroundColor = '';
    startButtonS.addEventListener('click', game);
    startButtonB.addEventListener('click', game);

    answer = makeKeyArray_300(storageData.hLevel*4);

    if (storageData.hLevel >= 15) {
      win.style.display = 'block';
      win.textContent = '당신은 색상의 신입니다.';
      submitButton.style.display = 'none';
    }
    
  } else if (this.id === 'startButtonS') {
    submitFlag = 'startButtonS';

    sideYourClass.textContent = '채도 : 당신은 ' + hierarchy[storageData.sLevel] + '입니다.';
    startButtonH.style.color = '';
    startButtonB.style.color = '';
    startButtonH.style.backgroundColor = '';
    startButtonB.style.backgroundColor = '';
    startButtonH.addEventListener('click', game);
    startButtonB.addEventListener('click', game);

    answer = makeKeyArray_100(storageData.sLevel*4);
  
    if (storageData.sLevel >= 15) {
      win.style.display = 'block';
      win.textContent = '당신은 채도의 신입니다.';
      submitButton.style.display = 'none';
    }

  } else if (this.id === 'startButtonB') {
    submitFlag = 'startButtonB';

    sideYourClass.textContent = '명도 : 당신은 ' + hierarchy[storageData.bLevel] + '입니다.';
    startButtonH.style.color = '';
    startButtonS.style.color = '';
    startButtonH.style.backgroundColor = '';
    startButtonS.style.backgroundColor = '';
    startButtonH.addEventListener('click', game);
    startButtonS.addEventListener('click', game);

    answer = makeKeyArray_100(storageData.bLevel*4);

    if (storageData.bLevel >= 15) {
      win.style.display = 'block';
      win.textContent = '당신은 명도의 신입니다.';
      submitButton.style.display = 'none';
    }
  }
  
  var quiz = shuffle(answer);

  var randomColor = Math.floor(Math.random()*359);
  for (var i = 0; i < quiz.length; i++) {
    var madeBlock = document.createElement('li');
    madeBlock.setAttribute('draggable', 'true');
    madeBlock.classList.add('block');
    madeBlock.id = 'block' + i;

    if ((this.id === 'startButtonH') && (storageData.hLevel < 15)) {
      document.querySelector('.first').style.backgroundColor = 'hsl(0, 100%, 60%)';
      madeBlock.style.backgroundColor = 'hsl(' + quiz[i] + ', 100%, 60%)';

    } else if ((this.id === 'startButtonS') && (storageData.sLevel < 15)) {
      document.querySelector('.first').style.backgroundColor = 'hsl(' + randomColor + ', 100%, 50%)';
      madeBlock.style.backgroundColor = 'hsl(' + randomColor + ', ' + quiz[i] + '%, 50%)';

    } else if ((this.id === 'startButtonB') && (storageData.bLevel < 15)) {
      document.querySelector('.first').style.backgroundColor = 'white';
      document.querySelector('.first').style.color = 'black';
      madeBlock.style.backgroundColor = 'hsl(' + randomColor + ', 50%, ' + quiz[i] + '%)';
    }
    
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

startButtonH.addEventListener('click', game, false);
startButtonS.addEventListener('click', game, false);
startButtonB.addEventListener('click', game, false);


document.addEventListener('dragstart', function(event) {
  event.dataTransfer.setData('piece', event.target.id);
});

document.addEventListener('dragover', function(event) {
  event.preventDefault();
});

document.addEventListener('dragenter', function(event) {
  if (event.target.classList.contains('block')) {
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
    if (submitFlag === 'startButtonH') {
      storageData.hLevel++;
      if (storageData.hLevel >= 15) {
        window.location.reload();
      }
    } else if (submitFlag === 'startButtonS') {
      storageData.sLevel++;
      if (storageData.sLevel >= 15) {
        window.location.reload();
      }
    } else if (submitFlag === 'startButtonB') {
      storageData.bLevel++;
      if (storageData.bLevel >= 15) {
        window.location.reload();
      }
    }
    
    localStorage.setItem('colorPuzzle', JSON.stringify(storageData));
    
    game.call(document.getElementById(submitFlag));
  } else {
    alert('떙! 정답이 아닙니다! 다시 해보세요');
  }
})