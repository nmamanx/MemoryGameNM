document.addEventListener('DOMContentLoaded', () => {

  const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('#moves'),
    timer: document.querySelector('#timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    spinner: document.querySelector('#spinnerTime')
  }

  const state = {
      gameStarted: false,
      flippedCards: 0,
      totalMoves: 0,
      totalTime: 0,
      loop: null,
      rating: 0,
      ratingStar: 0 
  }

  const Array = [1,2,3,4,5,6,7,8,9,10];
  Array.sort(() => 0.5 - Math.random())

  const SixArray = []; 
  for(let j=0;j<6;j++)
  {
    SixArray.push(Array[j]); 
  }

  const cardArray = [];
  for(let x=0;x<SixArray.length;x++)
  {
    if(SixArray[x]=='1'){cardArray.push({name: '1',img: 'images/1.png'});cardArray.push({name: '1',img: 'images/1.png'});}
    if(SixArray[x]=='2'){cardArray.push({name: '2',img: 'images/2.png'});cardArray.push({name: '2',img: 'images/2.png'});}
    if(SixArray[x]=='3'){cardArray.push({name: '3',img: 'images/3.png'});cardArray.push({name: '3',img: 'images/3.png'});}
    if(SixArray[x]=='4'){cardArray.push({name: '4',img: 'images/4.png'});cardArray.push({name: '4',img: 'images/4.png'});}
    if(SixArray[x]=='5'){cardArray.push({name: '5',img: 'images/5.png'});cardArray.push({name: '5',img: 'images/5.png'});}
    if(SixArray[x]=='6'){cardArray.push({name: '6',img: 'images/6.png'});cardArray.push({name: '6',img: 'images/6.png'});}
    if(SixArray[x]=='7'){cardArray.push({name: '7',img: 'images/7.png'});cardArray.push({name: '7',img: 'images/7.png'});}
    if(SixArray[x]=='8'){cardArray.push({name: '8',img: 'images/8.png'});cardArray.push({name: '8',img: 'images/8.png'});}
    if(SixArray[x]=='9'){cardArray.push({name: '9',img: 'images/9.png'});cardArray.push({name: '9',img: 'images/9.png'});}
    if(SixArray[x]=='10'){cardArray.push({name: '10',img: 'images/10.png'});cardArray.push({name: '10',img: 'images/10.png'});}
  }
  
  cardArray.sort(() => 0.5 - Math.random())


  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []


  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', 'images/blank.png')
      card.setAttribute('data-id', i)
      //card.setAttribute('class', 'grid-template-columns: repeat(4, auto)')
      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    state.totalMoves++
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      console.log('You have clicked the same image!')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      console.log('You found a match')

      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      console.log('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenId = []
    //resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      //resultDisplay.textContent = 'Congratulations! You found them all!'
      clearInterval(state.loop);
      state.rating = state.totalTime * state.totalMoves;
      console.log('state.rating: ' + state.rating);
      let buildMsgHtml = ;
      if(state.rating < 180)
      {state.ratingStar=3
        buildMsgHtml='<div><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span></div>'}
      else {
        if(state.rating > 350)
        {state.ratingStar=1
          buildMsgHtml='<div><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span></div>'}
        else
        {state.ratingStar=2
          buildMsgHtml='<div><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span></div>'}
      }
      console.log('state.ratingStar: ' + state.ratingStar);
      
  

      console.log('befor ModalPP');
      $('#ModalPP').modal({show:true,focus:true});
      console.log('after ModalPP');
    }
  }

  //flip your card
  function flipCard() {
    state.flippedCards++

    if (!state.gameStarted) {
      startGame()
    }

    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  
  const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalMoves} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 1000)
  }

  createBoard()
})