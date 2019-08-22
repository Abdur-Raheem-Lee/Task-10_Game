import React, { PureComponent } from 'react';
import './App.css';
import Header from './Components/Header';
import Card from './Components/Card';
import GameOver from './Components/GameOver';

class App extends PureComponent {
  // Setting the initial state
  state = { 
    isFlipped: Array(16).fill(false),
    shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
    clickCount: 1,
    prevSelectedCard: -1,
    prevCardId: -1
  };
  
  // Duplicating the animal names in the array because each card needs a duplicate
  static duplicateCard = () => {
    return ["Duck", 
            "Horse",
            "Donkey",
            "Penguin",
            "Fish",
            "Dog",
            "Cat",
            "Parrot"].reduce((preValue, current) => {
      return preValue.concat([current, current])
    },[]);
  };

  // The method for flipping the card when clicked
  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    // Changes is flipped to true and prevents a card that is already flipped from responding to the click event again
    const newFlipps = this.state.isFlipped.slice();
    this.setState({
        prevSelectedCard: this.state.shuffledCard[cardId],
        prevCardId: cardId
    });

    if (newFlipps[cardId] === false) {
      newFlipps[cardId] = !newFlipps[cardId];
      this.setState(prevState => ({ 
        isFlipped: newFlipps,
        clickCount: this.state.clickCount + 1
      }));
      // Checking if the number of flipped cards is two. If it is then the cards are checked to see of they match
      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const previousCard = this.state.prevSelectedCard;

        this.isCardMatch(previousCard, newCard, prevCardId, cardId);
      }
    }
  };

  // This method is called in the metod above and this checks if the two cards that were clicked are a match
  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -1;
      // Setting an interval so that the cards display the numbers first rather than just turning away
      setTimeout(() => {
        this.setState(prevState => ({
          shuffledCard: hideCard
        }))
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
  };

  // Resets the game
  restartGame = () => {
    this.setState({
      isFlipped: Array(16).fill(false),
      shuffledCard: App.duplicateCard().sort(() => Math.random() - 0.5),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1
    });
  };

  // Checks whether the game is over or not
  isGameOver = () => {
    return this.state.isFlipped.every((element) => element !== false);
  };

  render() {
    return (
     <div>
       {/* The Header component is passed through here */}
       <Header restartGame={this.restartGame} />
       { this.isGameOver() ? <GameOver restartGame={this.restartGame} /> :
       <div className="grid-container">
          {
            this.state.shuffledCard.map((cardNumber, index) => 
              <Card
                key={index} 
                id={index} 
                cardNumber={cardNumber} 
                isFlipped={this.state.isFlipped[index]} 
                handleClick={this.handleClick}     
              />
            )
          }
        </div>
       }
     </div>
    );
  }
}

export default App;