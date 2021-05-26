import React from "react";

function QuestionItem({ question, deleteQuez,editAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function deleteQueze(e) {
    e.preventDefault()
    deleteQuez(id)
  }
function indexChanger(e){
  let indexNum=e.target.value
  editAnswer(indexNum,id)
  
}
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={indexChanger}>{options}</select>
      </label>
      <button onClick={deleteQueze}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
