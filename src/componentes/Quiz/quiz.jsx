
import React, { useRef, useState } from "react";
import './quiz.css'
import { data } from '../../Assets/data'

function Quiz () {

    let [index, setIndex] = useState(0)
    const dados = data[index]
    let [lock, setLock] = useState(false)
    let [pontos, setPontos] = useState(0)
    let [resultado, setResultado] = useState(false)

    let opcao1 =useRef(null)
    let opcao2 =useRef(null)
    let opcao3 =useRef(null)
    let opcao4 =useRef(null)

    let opcaoArrray = [opcao1, opcao2, opcao3, opcao4]

    function resposta (e, respostaCerta) {
        if(lock === false){
            if (dados.ans === respostaCerta){
                e.target.classList.add("correto")
                setLock(true)
                setPontos(prev => prev + 1)
            }
            else{
                e.target.classList.add("errado")
                setLock(true)
                opcaoArrray[dados.ans - 1].current.classList.add("correto")
            }
        }
        else{

        }
    }


    function proximaQuestao(){
        if(lock === true){

            if(index === data.length - 1){
                setResultado(true)
                return 0
            }
            
            
            setIndex(++index)
            setLock(false)

            opcaoArrray.map((escolha) =>{
                escolha.current.classList.remove("correto")
                escolha.current.classList.remove("errado")
                return null
            })
        }
    }

    function reset() {
        setIndex(0)
        setPontos(0)
        setLock(false)
        setResultado(false)
    }

    return(
        <div className="content">
            <h1>Quiz App</h1>
            <hr />
            {resultado ? 
                <>
                    <h1>Game Over</h1>
                    <h2>Você marcou {pontos} pontos de {data.length} questões.</h2>
                    <button type="reset" onClick={reset}>Reset</button>
                </> 
                    : 
                <>          
                    <h2>{index + 1}. {data[index].question}</h2>
                    <ul>
                        <li ref={opcao1} onClick={(e) => resposta(e, 1)}> {dados.option1} </li>
                        <li ref={opcao2} onClick={(e) => resposta(e, 2)}> {dados.option2} </li>
                        <li ref={opcao3} onClick={(e) => resposta(e, 3)}> {dados.option3} </li>
                        <li ref={opcao4} onClick={(e) => resposta(e, 4)}> {dados.option4} </li>
                    </ul>
                    <button onClick={proximaQuestao}>Next</button>
                    <div className="index">
                        {index + 1} de {data.length} questões.
                    </div>
                </>
            }
        </div>
    )
}

export default Quiz;