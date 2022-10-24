import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions,setQuestions] = useState([]);
  const [isLoaded, setIsLoaded]= useState(false);
  useEffect(()=>{
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then(data => {
      setQuestions(data);
      setIsLoaded(true);
    })
  },[])
function handleAdd(newQuestion){
  const newObj = {
    "prompt": newQuestion.prompt,
    "answers": [newQuestion.answer1,newQuestion.answer2,newQuestion.answer3,newQuestion.answer4],
    "correctIndex": newQuestion.correctIndex
  };
  fetch('http://localhost:4000/questions',
  {
    headers: { "Content-Type": "application/json" },
    method:"POST",
    body:JSON.stringify(newObj)
  })
  .then(response => response.json)
  .then(()=>{
    setQuestions(prev => [...prev,newObj]);
  })
}
function handleDelete(questionId){
  fetch(`http://localhost:4000/questions/${questionId}`,
  {
    method: "DELETE",
  })
  .then(res => res.json())
  .then(()=>{
    setQuestions(prev => prev.filter(x=>x.id !== questionId));
  })
}

function handleUpdate(id,newIndex){
  console.log(id,newIndex)
  fetch(`http://localhost:4000/questions/${id}`,
  {
    headers: { "Content-Type": "application/json" },
    method:"PATCH",
    body:JSON.stringify({
      "correctIndex": newIndex
    })
  })
  .then(response => response.json)
  .then(()=>{
    setQuestions(prev => prev.map(x=>{
      if (x.id === id){
        x.correctIndex = newIndex;
      }
      return x;
    }));
  })
}
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={handleAdd}/> : <QuestionList questions={questions} isLoaded={isLoaded} deleteQuestion={handleDelete} updateAns={handleUpdate}/>}
    </main>
  );
}

export default App;
