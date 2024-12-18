import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";
import { DATA } from './data'
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];



function App() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion]= useState("");
  const [answer, setAnswer]=useState("");
  const [answerArray, setAnswerArray] = useState([]);
  const [keywords,setKeywords] = useState([]);
  const [resultQuestion,setResultQuestion] = useState(false);
  const [wrong,setWrong] = useState(false);
  const shuffle = (array) => {
    return array.sort(()=> Math.random()- 0.5);
  }

  const setKeyword = (keyword) => {
    if (keywords.length < answer.length) {
      setKeywords([...keywords, keyword]);
    }
    if(keywords.length == answer.length){
      if(answer == keywords.join("")){
        setIndex(index + 1);//Cevap doğru ise yeni soruya geçmek için index 1 artar.
        setKeywords([]);//Yeni gelen data için keyword sıfırlanır.
        setResultQuestion(true);
      }else{
        setWrong(true);
      }
    }
  };
  

  useEffect(()=>{
    setWrong(false);
    setResultQuestion(false  );

    if (index >= DATA.length) {
      // Sorular bittiğinde
      setAnswer("");
      setQuestion("");
      setAnswerArray([]);
    } else {
      if(typeof DATA[index] != undefined){
        const answer = DATA[index].answer.toLowerCase();
        setAnswer(answer);
        setQuestion(DATA[index].question);
        const stringToArray = answer.split("");
        stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        stringToArray.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
        const alphabetLowerData = stringToArray.map((answer) => answer.toLowerCase());
        setAnswerArray(shuffle(alphabetLowerData));
      }
    }
  },[index,resultQuestion]);

  const removeKeyword = (index) => {
    keywords.splice(index,1);
    setKeywords([...keywords])
  }

  
  return (
    <>

      <div className='App'>
        {answer != "" && 
        <div>
          <div className='question'>
             <span>{question}</span>
            </div>
            <div className='keywords'>
              {keywords.map((item,index)=> (
                <span style={{'border-bottom':(wrong) ?'30px solid red' : '30px solid #ddd'}} onClick={() => removeKeyword(index)} key={index}>{item}</span>
              ))}
            </div>
            <div className='answers'>
              {answerArray.map((item,index)=>(
                <button className='button' key={index} onClick={()=>setKeyword(item)}>{item}</button>    
              ))}
            </div>
        </div>
        }
        {answer == "" &&
            <div className={'empty-message'}>Sorular Bitti!</div>
        }
      </div>

    </>
  )
}

export default App
