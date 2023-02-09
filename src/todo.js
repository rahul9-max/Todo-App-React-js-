import React, { useState, useEffect } from "react";
import {v4 as uuid} from 'uuid' 
import "./App.css";

const getdata=()=>{
  const listItem=localStorage.getItem("list");
  if(listItem){
    return JSON.parse(listItem)
  }else{
return []
  }
}
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items,setItems]=useState(getdata())
  const [edit,setEdit]=useState("")
  const [toggle, setToggle] = useState(false);
  

  const unique_id = uuid();

  
  const change=(e)=>{
    // console.log(e)
setInputData(e.target.value)
  }
  const addItem=()=>{
    if(!inputData){
      alert("please fill the Data")
    }else if(inputData && toggle){
        setItems(items.map((value)=>{
          if(value.id===edit) {
            return {...value,name:inputData}
          }
          return value
        })); 
        setInputData("")
        setEdit(null);
        setToggle(false)
    } else{
       const newElem={
         id :unique_id,
         // id:new Date().getTime().toString(),
         name:inputData
       }
      setItems([...items,newElem])
      setInputData("")
    }
  }
  // item which has been clicked to delete is not equal to id of that item,
  // all those items wil return to setItems array list
const delItem=(ind)=>{
const updatedItems=items.filter((val)=>{
  return val.id !== ind;
})
setItems(updatedItems)
}
// to remove all the list
const removeAll=()=>{
  setItems([])
}
const editItem=(ind)=>{
const todo_edit=items.find((value)=>{
  return value.id===ind
})
setEdit(ind)
setInputData(todo_edit.name)
setToggle(true)
}
// data is first stringified and then it is stored in local storage
useEffect(()=>{
localStorage.setItem("list",JSON.stringify(items))
},[items])
  return (
    <>
      <div className="main">
        <div className="child">
        {/* The <figure> tag in HTML is used to add self-contained content like illustrations,
         diagrams, photos, or codes listing in a document. */}
         
           <figure>
          <img src="./todo.png" alt="todo-list"/>
          <figcaption>Your List..✏️</figcaption>
         </figure>
          <div className="data">
          <input type="text" 
          placeholder="📝Enter your todo items here.."
          // onChange={(event)=>setInputData(event.target.value)}
          value={inputData}
          onChange={change} 
          />
          {/* <i className="fa fa-plus add-btn"></i> */}
          {toggle?(<i className="fa fa-edit add-btn" onClick={addItem}></i>):
          (<i className="fa-sharp fa-solid fa-user-plus" onClick={addItem}></i>)
          }
          </div>
          <div className="displayItem">
          {items.map((value)=>{
            return(
              <div className="listItem" key={value.id}>
            <h3>{value.name}</h3>
            <div className="todo-btn">
            <i className="fa fa-edit add-btn" onClick={()=>editItem(value.id)}></i>
            <i className="fa fa-trash-alt" onClick={()=>delItem(value.id)}></i>
            </div>
            </div>
            )
          })}   
          </div> 
          <div className="displayItem">
            <button
              className="button remove"
              data-sm-link-text="Remove All"
              onClick={removeAll}
              >
              <span> DELETE ALL</span>
            </button>
          </div> 
        </div>
      </div>
    </>
  );
};

export default Todo;