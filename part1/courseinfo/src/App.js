import React, {useState} from 'react'


const x = 1
let y = 5;
console.log(x, y);
y += 10
console.log(x, y);
y = "sometext"
console.log(x, y)

// x = 4 causes an error

const t = [1, 2, 3]

t.push(5);

console.log(t.length)
console.log(t[3]) // 5
// console.log(t[5]) undefined



t.forEach(value => {
  console.log(value)
})
const m1 = t.map(value => value*2)
console.log(m1)

const m2 = t.map(value => '<ol>' + value + '</ol>')
console.log(m2)

const tmp = [1,2,3,4,5]
const[first, second, ...rest] = tmp

console.log(first, second)
console.log(rest)

const object1 = {
  name: 'Arto Hellas',
  age: 35,
  educatin: 'phD',
}

const object2 = {
  name: 'Full Stack web application development',
  level: 'intermediate studies',
  size: 5,
}

const object3 = {
  name : {
    first: 'Dan',
    last: 'Abramov'
  },
  grades: [2,3,5,3],
  department: 'Stanford University',
}

const fieldName = 'age'
console.log(object1[fieldName])

object1.address = 'Helsinki'
object1['secret number'] = 12341
console.log(object1);

const sum = (p1, p2) =>{
  console.log(p1)
  console.log(p2)
  return p1 + p2;
}

const result = sum(1, 5)
console.log(result);

const square = (p1) =>{
  console.log(p1)
  return p1 * p1;
}

const res = square(5)
console.log(res);


const arto = {
  name :'Arto Hellas',
  age: 35,
  education : 'phD',
  greet: function() {
    console.log('hello, my name is ' + this.name);
  },
  doAddition: function(a,b) {
    console.log(a + b)
  },
}

// arto.greet();

arto.growOlder = function() {
  this.age += 1;
}


console.log(arto.age)
arto.growOlder();
console.log(arto.age)

arto.doAddition(1, 4)

const referenceToAddition = arto.doAddition
referenceToAddition(10, 25)

arto.greet()   //"hello, my name is Arto Hellas" gets printed

// const referenceToGreet = arto.greet
// referenceToGreet() // prints "hello , my name is undefined"

setTimeout(arto.greet.bind(arto), 1000)



class Person {
  constructor(name, age) {
    this.name = name;
    this.age  = age;
  }
  greet() {
    console.log('hello, my name is ' + this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()

const Hello = (props) => {
  const {name , age} = props.Person
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
        So You were probably born in {bornYear()}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p> {props.part},  {props.exercises} </p>
    </>
  )
}
const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1> {props.course} </h1>
    </>
  )
}
const Content = (props) => {
  
  return (
    <>
      <>
        <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises} />
        <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises} />
        <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises} />
      </>
    </>
  )

} 
const Total = (props) => {
  return (
    <>
      <>
        Number of exercises, {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </>
    </>
  )
} 

const Display = ({counter}) => <div> {counter} </div>


const Button = ({handleClick, text}) => {
  return (
      <button onClick = {handleClick}>
        {text}
      </button> 
  )
}

const History = (props) => {
  if(props.allClicks.length === 0) {
    return (
      <div> 
        The app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join('')}
    </div>
  )
}



const App = (props) => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks , setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }






  const [counter , setCounter] = useState(0)
  // setTimeout (
  //   () => setCounter(counter + 1),
  //   1000
  // )
  const setToZero = () => setCounter(0)
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)

  // const handleClick = () => {
  //   console.log('clicked');
  // }

  console.log('rendering...', counter)

  const Person = {
    name : 'Akash Raghuwanshi',
    age : 22
  }
  const course = {
    course: 'Half Stack application development',
    parts: [
      {  
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name : 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  } 

  return (
    <div>
        <Display counter = {counter} />
        <Header course = {course.course}/>
        <Content parts = {course.parts} /> 
        <Total parts = {course.parts} />
        <Hello Person = {Person}/>
        <Button 
          handleClick = {setToZero} 
          text = {"Zero"}
        />
        <Button 
          handleClick = {increaseByOne}
          text = {"Plus"}
        />
        <Button 
          handleClick = {decreaseByOne}
          text = {"Minus"}
        />
        {left}
        <Button handleClick = {handleLeftClick} text = 'left'/>
        <Button handleClick = {handleRightClick} text = 'right'/>
        <button onClick = {handleRightClick}>right</button>
        {right}

        <History allClicks = {allClicks}/>

    </div>
  )
}


export default App

