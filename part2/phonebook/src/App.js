import React, {useState, useEffect} from "react";
import personDetails from './services/persons.js'
import axios from 'axios'


const Notification = ({message, classname}) => {
  if(message === null) {
    return null
  }
  return (
    <div className = {classname}>
      {message}
    </div>
  )
}
const Contact = ({contact}) => {
  return (
    <>
      <tr>
        <td> {contact.name}</td>
        <td> {contact.phoneNumber}</td>
      </tr>
    </>
  )
} 
const Name = ({person, deleteContact}) => {

  return (
    <>  
      <tr>
        <td>  {person.name} </td>
        <td> {person.phoneNumber} </td>
        <td> <button className = "delete" onClick = {deleteContact} > delete </button>  </td>
      </tr>
    </>
  )
}

const Search = ({persons}) => {

  const listItems = persons.map(person => 
    <Name key = {person.name} person = {person} />
  )
  return (
    <>  
      {listItems}
    </>
  )
}
const App = () => {
  
  const [classname, setClassname] = useState('')
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    let delay = false;
    personDetails
        .getAll()
        .then(initialDetails => {
          !delay && setPersons(initialDetails)
        return () => (delay = true)
        })
        .catch(error => {
          console.log('fail')
        })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if(newName === ''){
      alert('Please add a name')
      return
    }
    if(newPhoneNumber === '') {
      alert('Please add a phone number')
      return
    }

    const contactObject = {
      name : newName,
      phoneNumber: newPhoneNumber
    }

    for(var i = 0;i < persons.length;i++) {

      if(persons[i].name === newName) {

        const oldContact = persons[i];
        const changedContact = {...oldContact, phoneNumber: newPhoneNumber};
        if(window.confirm(newName + " is already added to Phonebook , replace the old number write a new one ?")) {

          personDetails
              .update(changedContact.id,changedContact)
              .then(returnedContact => {
                console.log(returnedContact);
                setPersons(persons.map(contact => contact.id === oldContact.id ? returnedContact : contact))
                setErrorMessage(returnedContact.name + "'s number is updated to " + returnedContact.phoneNumber)
                setClassname("success")
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
              .catch(error => {
                setErrorMessage('Information of ' + persons[i].name + ' has already been deleted from server')
                setPersons(persons.filter(n => n.id !== persons[i].id))
                setClassname("error")
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
        }
        setNewName('')
        setNewPhoneNumber('')
        return ;
      }
    }

    personDetails
        .create(contactObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewPhoneNumber('')
          setErrorMessage('Added ' + returnedContact.name)
          setClassname("success")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('fail')
        })
  }


  const handleAddName = (event) => {
    setNewName(event.target.value)
  }
  const handleAddPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }
  const editSearchTerm = (event) => {
    setSearchTerm(event.target.value)
  }


  const searchFilter = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const deleteContactOf = (id) => {

    var name = '';
    for(var i = 0;i < persons.length;i++) {
      if(persons[i].id === id) {
        name = persons[i].name;
      }
    }
    if(window.confirm('Delete ' + name + ' ?')) {
      axios.delete('http://localhost:3001/persons/' + id.toString())
      .then(response => console.log(response.data))
      .catch(error => {
        console.log('fail')
      })
      setPersons(persons.filter(n => n.id !== id))
    }
  }


  return (
    <>
      <h1> Phonebook </h1>
      <Notification message = {errorMessage} classname = {classname}/>
      Filter show with <input value = {searchTerm} onChange = {editSearchTerm} placeholder = "Search..."/> 

      <h2> Add a new contact </h2>
      <form >
        <div>
          Name: <input value = {newName} onChange = {handleAddName}/>
        </div>
        <div>
          Number: <input value = {newPhoneNumber} onChange = {handleAddPhoneNumber}/>
        </div>
        <div>
        <button type = "submit" onClick = {addContact} > Add contact</button>
        </div>
      </form>
      <h2> Numbers </h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
            {searchFilter.map(contact => 
              <Name 
                key = {contact.id} person = {contact}
                deleteContact = {() => deleteContactOf(contact.id)}
              /> 
            )}
        </tbody>
      </table> 
    </>
  )
}

export default App