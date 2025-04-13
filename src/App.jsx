import './App.css'
import { FaCopy } from "react-icons/fa";

import { useState } from 'react';

function App() {

  const [timeInputHours, setTimeInputHours] = useState(0)
  const [timeInputMinutes, setTimeInputMinutes] = useState(0)

  const [suspensionTime, setSuspensionTime] = useState(undefined)

  // function getCurrentTime() {
  //   const now = new Date();
  //   const hours = String(now.getHours()).padStart(2, '0');
  //   const minutes = String(now.getMinutes()).padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // }

  function defineTimeToSuspend(){

    //Verificando se a hora foi definida
    if(timeInputHours == "0" && timeInputMinutes == "0"){
      return alert("Informe o tempo")
    }

    const now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');

    hours = Number(hours) + Number(timeInputHours)
    minutes = Number(minutes) + Number(timeInputMinutes)

    //Verificando se passa de 60 minutos
    if(minutes > 60){
      hours = hours + 1
      minutes = minutes - 60
    }

    setSuspensionTime(`${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`)
  }

  //COPIA
  const [copied, setCopied] = useState(false);

  async function handleCopy (){
    try {
      await navigator.clipboard.writeText(`schtasks /create /tn "LockScreenTask" /tr "rundll32.exe user32.dll,LockWorkStation" /sc once /st ${suspensionTime} /f`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reseta após 2s
      console.log('código copiado');
      alert("código copiado")
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <div className='container'>
      <h3>Em quanto tempo você deseja que seu computador seja suspenso ?</h3>
      <div className='options'>
        <div className='timeOption' onClick={() => {setTimeInputHours(1); setTimeInputMinutes(0)}}>
          <div><p>1 hora</p></div>
        </div>
        <div className='timeOption' onClick={() => {setTimeInputHours(1); setTimeInputMinutes(30)}}>
          <div><p>1 hora e 30 min</p></div>
        </div>
        <div className='timeOption' onClick={() => {setTimeInputHours(3); setTimeInputMinutes(0)}}>
          <div><p>3 horas</p></div>
        </div>
        <div className='timeOption' onClick={() => {setTimeInputHours(4); setTimeInputMinutes(30)}}>
          <div><p>4 horas e 30 min</p></div>
        </div>
      </div>

      <div className='timeInput'>
        <div>
          <input type="number"  value={timeInputHours} onChange={(e) => {setTimeInputHours(e.target.value)}}/>
          <span>Horas</span>
        </div>
        <span>e</span>
        <div>
          <input type="number"  value={timeInputMinutes} onChange={(e) => {setTimeInputMinutes(e.target.value)}}/>
          <span>minutos</span>
        </div>
      </div>

      <button onClick={defineTimeToSuspend}>Gerar código</button>

      {suspensionTime !== undefined && suspensionTime !== "00:00" ? (
        <div className='result' onClick={handleCopy}>
          <p>{`schtasks /create /tn "LockScreenTask" /tr "rundll32.exe user32.dll,LockWorkStation" /sc once /st ${suspensionTime} /f`}</p>
          <FaCopy />
        </div>
      ) : <p></p>}
    </div>
  )
}

export default App
