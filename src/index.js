import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function ButtonItem(props) {
  return (
    //Create one button for each element of buttons
    <button
      key={props.id}
      id={props.id}
      className={props.classValue}
      value={props.value}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function ButtonList(props) {
  const btnList = props.buttons.map(bouton => {
    return (
      <ButtonItem
        key={bouton.id}
        id={bouton.id}
        classValue={bouton.class}
        value={bouton.value}
        onClick={bouton.onClick}
      />
    );
  });
  return btnList;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ["0"]
    };

    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.resultat = this.resultat.bind(this);

    this.buttons = [
      {
        value: "0",
        id: "zero",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "1",
        id: "one",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "2",
        id: "two",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "3",
        id: "three",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "4",
        id: "four",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "5",
        id: "five",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "6",
        id: "six",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "7",
        id: "seven",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "8",
        id: "eight",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "9",
        id: "nine",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: ".",
        id: "decimal",
        class: "num",
        onClick: this.handleClick
      },
      {
        value: "=",
        id: "equals",
        class: "calcul",
        onClick: this.resultat
      },
      {
        value: "+",
        id: "add",
        class: "calcul",
        onClick: this.handleClick
      },
      {
        value: "-",
        id: "subtract",
        class: "calcul",
        onClick: this.handleClick
      },
      {
        value: "*",
        id: "multiply",
        class: "calcul",
        onClick: this.handleClick
      },
      {
        value: "/",
        id: "divide",
        class: "calcul",
        onClick: this.handleClick
      },
      {
        value: "AC",
        id: "clear",
        class: "clear",
        onClick: this.clear
      }
    ];
  }

  handleClick(e) {
    let newDisplay = this.state.display;
    switch (
      e.target.value //ajouter les touches saisies dans le display
    ) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        //gérer le '0' , l'enlever si il est avant un chiffre en début d'newDisplayay
        let test = ["0", "+", "/", "*", "."];
        if (test.includes(newDisplay[0])) {
          newDisplay.shift();
          newDisplay.push(e.target.value);
          this.setState({
            display: newDisplay
          });
        } else {
          newDisplay.push(e.target.value);
          this.setState({
            display: newDisplay
          });
        }
        break;

      case ".":
        let chiffre = /\d/;
        let str = newDisplay.join("");
        console.log(newDisplay);
        if (newDisplay.includes(".") === false) {
          //si il n'y a pas encore de point
          newDisplay.reverse();
          if (newDisplay[0].match(chiffre)) {
            //ajouter un point seulement si il est précédé d'un chiffre
            newDisplay.reverse();
            newDisplay.push(e.target.value);
            this.setState({
              display: newDisplay
            });
          } else {
            newDisplay.reverse();
            this.setState({
              display: newDisplay
            });
          }
        } else if (
          // si il y a déjà un operator saisi
          newDisplay.includes("+") ||
          newDisplay.includes("/") ||
          newDisplay.includes("-") ||
          newDisplay.includes("*")
        ) {
          if (
            // si le dernier operator a été saisi après le dernier point
            str.lastIndexOf("+") > str.lastIndexOf(".") ||
            str.lastIndexOf("/") > str.lastIndexOf(".") ||
            str.lastIndexOf("*") > str.lastIndexOf(".") ||
            str.lastIndexOf("-") > str.lastIndexOf(".")
          ) {
            newDisplay.push(e.target.value);
            this.setState({
              display: newDisplay
            });
          } else {
            this.setState({
              display: newDisplay
            });
          }
        } else {
          this.setState({
            display: newDisplay
          });
        }
        break;

      case "+":
      case "*":
      case "/":
        newDisplay.reverse();
        let operator = ["/", "*", "-", "+", "."];
        console.log(newDisplay);
        if (Number.isInteger(newDisplay[0])) {
          newDisplay.reverse();
          newDisplay.push(e.target.value);
          this.setState({
            display: newDisplay
          });
        } else {
          while (operator.includes(newDisplay[0])) {
            newDisplay.shift();
          }
          console.log(newDisplay);
          newDisplay.reverse();
          newDisplay.push(e.target.value);
          this.setState({
            display: newDisplay
          });
        }
        break;

      case "-":
        newDisplay.reverse();
        console.log(newDisplay);
        let testMoins = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "/",
          "*",
          "+"
        ];
        if (testMoins.includes(newDisplay[0])) {
          newDisplay.reverse();
          newDisplay.push(e.target.value);
          this.setState({
            display: newDisplay
          });
        } else {
          if (
            newDisplay.includes("/") === true ||
            newDisplay.includes("+") === true ||
            newDisplay.includes("-") === true ||
            newDisplay.includes("*") === true
          ) {
            newDisplay.reverse();
            newDisplay.push(e.target.value);
            this.setState({
              display: newDisplay
            });
          } else {
            newDisplay.reverse();
            this.setState({
              display: newDisplay
            });
          }
        }
        break;
      default:
        console.log("erreur");
    }
  }

  clear() {
    this.setState({
      display: ["0"]
    });
  }

  resultat(e) {
    let operation = this.state.display.join("");
    console.log(operation);
    console.log(eval(operation));
    let result = Math.round(eval(operation) * 100000) / 100000;
    this.setState({
      display: [result]
    });
  }

  render() {
    return (
      <div id="wrapper">
        <div id="display">{this.state.display}</div>
        <ButtonList buttons={this.buttons} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Calculator />, rootElement);

/*
const assert = require('assert')

function test(msg, fn) {
  console.log()
  console.log(msg)
  try {
    fn()
    console.log('O Success')
  } catch(err) {
    console.log('X Fail')
    console.log(err.message)
  }
}

function handle(newDisplay, e) {

  switch (e) { //ajouter les touches saisies dans le display
    case '0' :
    case '1' :
    case '2' :
    case '3' :
    case '4' :
    case '5' :
    case '6' :
    case '7' :
    case '8' :
    case '9' :
      //gérer le '0' , l'enlever si il est avant un chiffre en début d'newDisplayay
      if  (newDisplay[0] === '0') {            
          newDisplay.shift()
          newDisplay.push(e)
           this.setState({
            display: newDisplay
          });;  
      } else {
          newDisplay.push(e)
           this.setState({
            display: newDisplay
          });
      };
      break;

    case '.' : //ajouter un point seulement si il est précédé d'un chiffre
      newDisplay.reverse()
      console.log(newDisplay)
        if (newDisplay[0] === '0'||newDisplay[0] ==='1'||newDisplay[0] ==='2'||newDisplay[0] ==='3'||newDisplay[0] ==='4'||newDisplay[0] ==='5'||newDisplay[0] ==='6'||newDisplay[0] ==='7'||newDisplay[0] ==='8'||newDisplay[0] ==='9') {
          newDisplay.reverse().push(e)
           this.setState({
            display: newDisplay
          });;
        } else {
           this.setState({
            display: newDisplay
          });.reverse()
        };
      break;

    case '+' :
    case '-' :
    case '*' :
    case '/' :
      newDisplay.reverse()
      console.log(newDisplay)
        if (newDisplay[0] === '/'||newDisplay[0] ==='*'||newDisplay[0] ==='+'||newDisplay[0] ==='-'||newDisplay[0] ==='.') {
          newDisplay.shift()
          newDisplay.reverse()
          newDisplay.push(e)
           this.setState({
            display: newDisplay
          });;
        } else {
           this.setState({
            display: newDisplay
          });.reverse()
        }
    break;

    case '=' : // Après avoir cliqué sur égal, résultat du calcul
      var x = newDisplay.join('')
      newDisplay = eval(x)
       this.setState({
            display: newDisplay
          });
  }
}

test('addition', () => {
  assert.deepEqual(
    handle(['1', '+', '2'], '='),
    3
  )
})

test('zéro', () => {
  assert.deepEqual(
    handle(['0'],'2'),
    ['2']
  )
})

test('point', () => {
  assert.deepEqual(
    handle(['3','+'], '.'), 
    ['3','+']
  )
})

test('double point', () => {
  assert.deepEqual(
    handle(['0','.','1','+','0'], '.'),
    ['0','.','1','+','0', '.']
  )
})

test('double operator', () => {
  assert.deepEqual(
    handle(['0','.','1','+'], '/'),
    ['0','.','1','/']
  )
})

*/
