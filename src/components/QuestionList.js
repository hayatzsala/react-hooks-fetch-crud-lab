import React, { useEffect, useState } from "react";
import QuestionItem from './QuestionItem';
function QuestionList({questions, isLoaded, deleteQuestion, updateAns}) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{isLoaded && questions.map(x => <QuestionItem key={x.id} question={x} deleteQuestion={deleteQuestion} updateAns={updateAns}/>)}</ul>
    </section>
  );
}

export default QuestionList;
