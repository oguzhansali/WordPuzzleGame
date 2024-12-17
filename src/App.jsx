import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DATA } from './data'
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];



function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion]= useState("");
  const [answer, setAnswer]=useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords,setKeywords] = useState([]);

  const shuffle = (array) => {
    return array.sort(()=> Math.random()- 0.5);
  }

  const setKeyword = (keyword) => {
    if (keywords.length < answer.length) {
      setKeywords([...keywords, keyword]);
    }
  };
  

  useEffect(()=>{
    const answer = DATA[index].answer.toLowerCase();
    setAnswer(answer);
    setQuestion(DATA[index].question);

    const stringToArray = answer.split("");
    stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);

    const alphabetLowerData = stringToArray.map((answer) => answer.toLowerCase());
    setAnswerArray(shuffle(alphabetLowerData));
    
  
  },[index]);

  const removeKeyword = (index) => {
    keywords.splice(index,1);
    setKeywords([...keywords])
  }

  
  return (
    <>

      <div className='App'>
        <div className='question'>
          <span>{question}</span>
        </div>

        <div className='keywords'>
          {keywords.map((item,index)=> (
            <span onClick={() => removeKeyword(index)} key={index}>{item}</span>
          ))}
        </div>

        <div className='answers'>
          {answerArray.map((item,index)=>(
            <button key={index} onClick={()=>setKeyword(item)}>{item}</button>    
          ))}
        </div>

      </div>

    </>
  )
}

export default App
