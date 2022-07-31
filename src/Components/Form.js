import React, { useState, useEffect } from "react"
// import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from "uuid"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { inputClasses } from "@mui/material"

const Form = () => {
  const [input, setInput] = useState({
    name: "",
    enrollment: "",
    class: "",
    gender: "",
    photo: "",
  })
  const [records, setRecords] = useState([])
  const [currIndex, setcurrIndex] = useState(null)
  const [photoUrl, setphotoUrl] = useState("")
  const [editRecords, setEditRecords] = useState(null)
  const [counter, setCounter] = useState(0)

  const onInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(name, value)
    setInput({ ...input, [name]: value })
  }

  const handleUpdateData = (val, ind) => {
    setInput(val)
    setcurrIndex(ind)
  }

  
  const updateRecord = (name, id) => {
    const newRecord = records.map((records) => {
      return records.id === id ? { name, id } : records
    })
    setRecords(newRecord)
    setEditRecords("")
  }
 

  const onFormSubmit = (event) => {
    event.preventDefault()
    const newRecord = { ...input, id: uuidv4(),photo:photoUrl }
    setRecords([...records, newRecord])
    setInput({ name: "", enrollment: "", class: "", gender: "",photo:"" })
    setphotoUrl("")
  }

  const handleDelete = ({ id }) => {
    setRecords(records.filter((records) => records.id != id))
  }

  const handleEdit = () => {
    records[currIndex] = input
    setRecords(records)
    setCounter(counter + 1)
  }

  useEffect(() => {}, [counter])

  const handleFileData = (data) => {
       
        setphotoUrl( URL.createObjectURL(data.files[0]))
  }
  return (
    <>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", alignItems: "center", padding: "20px" }}
          >
            <label htmlFor="name" className="task-label">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="task-input"
              value={input.name}
              required
              name="name"
              onChange={onInputChange}
            />
            <label htmlFor="enrollment" className="task-label">
              Enrollment
            </label>
            <input
              type="text"
              placeholder="Enter Your Enrollment no."
              className="task-input"
              value={input.enrollment}
              required
              name="enrollment"
              onChange={onInputChange}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", padding: "20px" }}
          >
            <label htmlFor="class" className="task-label">
              Class
            </label>
            <input
              type="text"
              placeholder="Enter Your Class"
              className="task-input"
              value={input.class}
              required
              name="class"
              onChange={onInputChange}
            />
            <label htmlFor="gender" className="task-label">
              Gender
            </label>
            <input
              type="text"
              placeholder="Gender"
              className="task-input"
              value={input.gender}
              required
              name="gender"
              onChange={onInputChange}
            />
          </div>
          <div>
            <input
              type="file"
              className="photo-input"
              name="photo"
              onChange={(e) => handleFileData(e.target)}
            />
            <img id="blah" src={`${photoUrl}`} alt="Your photo" />
          </div>
        </div>
        <div className="div-button">
          <button className="button-add" type="submit" onClick={(e)=>onFormSubmit(e)} >
            Submit
          </button>
          <button className="button-add" onClick={()=>handleEdit()}>Update</button>
        </div>

      <div>
        {records.map((curElem, ind) => {
          return (
            <div key={curElem.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems : "center",
                  padding: "15px",
                  margin: "20px",
                }}
              >
                <img src={`${curElem.photo}`} alt="" />
                <p>{curElem.name}</p>
                <p>{curElem.enrollment}</p>
                <p>{curElem.class}</p>
                <p>{curElem.gender}</p>
                  <EditIcon onClick={() => handleUpdateData(curElem, ind)} style={{ cursor: "pointer" }} />
                  <DeleteIcon onClick={() => handleDelete(curElem)} style={{ cursor: "pointer" }} />
              </div>
            </div>
          )
        })}
      </div>
      
    </>
  )
}

export default Form
