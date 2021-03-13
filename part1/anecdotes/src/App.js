import React, {useState} from 'react'


const Button = ({text, OnClickHandler}) => {
	return (
		<>
			<button onClick = {OnClickHandler} > {text}</button>
		</>
	)
} 

const HighestVote = ({maxVotes, anecdotes}) => {
	var idx = 0;
	for(var i = 0;i  < anecdotes.length;i++) {
			if(anecdotes[i].counter > anecdotes[idx].counter) {
				idx = i;
			}
	}
	return (
		<>
			<h1> {maxVotes} </h1>
			<p>
				{anecdotes[idx].name}
			</p>
			<p>
				has {anecdotes[idx].counter} votes
			</p>
		</>
	)
}
const App = () => {
	const maxVotes = 'Anecdote with most votes'
	const [anecdotes, setAnecdotes] = useState([
		{ 
			id: 0,
			name: 'If it hurts, do it more often',
			counter : 0
		},
		{ 
			id: 1,
			name: 'Adding manpower to a late software project makes it later!',
			counter : 0
		},
		{ 
			id: 2,
			name: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
			counter : 0
		},
		{ 
			id: 3,
			name: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
			counter : 0
		},
		{
			id: 4,
			name: 'Premature optimization is the root of all evil.',
			counter: 0
		},
		{
			id: 5,
			name: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
			counter: 0
		}
	])

	const [initialanecdote, maxVoteAnecdote] = useState(
				{
					name : '',
					counter  : 0
				}
	);
	const [selected, setSelected] = useState(0)
	const genRandomNum = () =>  setSelected(Math.floor((Math.random() * maxNumber) + 1))
	const upVote = () => { 
			for(var i = 0;i  < anecdotes.length;i++) {

					if((anecdotes[selected].id) === (i)) {
						var g = {
							id : anecdotes[selected].id,
							name : anecdotes[selected].name,
							counter : anecdotes[selected].counter + 1
						}
						setAnecdotes([
							...anecdotes.slice(0, selected),
							g,
							...anecdotes.slice(selected + 1)
						])

						// console.log(anecdotes);
					}
				}
		}
	
	const maxNumber = 5;
  	return (
    <div>
    	<h1> Anecdote Of the day </h1>
    	<p>	
    		{anecdotes[selected].name}
    	</p>
    	<p>
    		has {anecdotes[selected].counter} votes
    	</p>
    	<button onClick = {upVote}>vote</button>
    	<Button text = 'next anecdote' OnClickHandler = {genRandomNum} />
    	<HighestVote maxVotes = {maxVotes} anecdotes = {anecdotes}  />
    </div>
  )
}

export default App;
