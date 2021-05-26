import React, { useEffect, useState } from "react";
import QuestionItem from './QuestionItem'
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [data, setData] = useState([])
  const [page, setPage] = useState("List");

  const URL = "http://localhost:4000/questions"

  useEffect(() => {
    fetch(URL, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => setData(json))
  }, [])

  function createNewQuestion(body) {
    const passsingData={
      prompt:body.prompt, 
      correctIndex:parseInt(body.correctIndex),
      answers: [body.answer1,body.answer2,body.answer3,body.answer4]
    }
    
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passsingData)
    }

    fetch(URL, requestOptions)
    .then(res=>res.json())
    .then(json=> {
      const newQues=[...data,json]
      setData(newQues)
    })

  }

  function deleteQuestion(iD){
     fetch(`${URL}/${iD}`,{method: 'DELETE'})
     .then(res=>res.json())
     .then(()=> {
     let newData=data.filter((e)=> e.id !== iD)
      setData(newData)
     })
   }
 function editAnswer(index,iD){

  let requestOption = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({correctIndex: parseInt(index)})
  }
   fetch(`${URL}/${iD}`,requestOption)

  }

  return (<>
    <AdminNavBar onChangePage={setPage} />
    {page === "Form" ? <QuestionForm createQuez={createNewQuestion} /> :
      <section>
        <h1>Quiz Questions</h1>
        <ul>{data.map((e) => { return <QuestionItem 
        question={e} 
        key={e.id} 
        deleteQuez={deleteQuestion}
        editAnswer={editAnswer}
        /> })}</ul>
      </section>}
  </>);
}

export default QuestionList;
