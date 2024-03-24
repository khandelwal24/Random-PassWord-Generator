import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [len, setlen] = useState(8)
  const [num, setnum] = useState(false)
  const [char, setchar] = useState(false)
  const [pass,setpass] = useState("")

  // Use ref hook...
  const pass_ref = useRef(null);

// use callback in react hook
  const passGen = useCallback(()=>{  
    let passs = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(num) str+="0123456789";
    if(char) str+="!@#$%^&*(){}~?/<>";

    for(let i=1; i<=len; i++){
      let char = Math.floor(Math.random()*str.length + 1);
      passs += str.charAt(char);
    }
    
    setpass(passs) // this is for optimization..

  },[len,num,char,setpass])
 

  const copyPassword = useCallback(()=>{
    pass_ref.current?.select()
    window.navigator.clipboard.writeText(pass)
  },[pass])
  
  useEffect(()=>{passGen()},[len,num,char,setpass]);

 

  return (
    <>
    <div className='w-[100%] max-w-[500px] mx-auto shadow-md rounded-lg px-4 py-5 bg-gray-500'>Password Generator
    <div className='flex flex-row justify-center items-center place-self-center my-3 gap-2'>
      <input type='text' placeholder='Password' value={pass} className='px-3 py-2 w-full rounded-xl' readOnly ref={pass_ref}></input>
      <button className='border-[1px] bg-black text-white rounded-xl p-2 hover:bg-gray-800' onClick={copyPassword}>Copy</button>
    </div>

    <div className='flex gap-5 items-center flex-wrap content-start'>
    <p className='flex flex-row items-center justify-center gap-2'>
    <label for="101">Number</label>
    <input type='checkbox' id="101" defaultChecked={num} onChange={()=>{setnum((prev)=>!prev)}}></input>
    </p>

    <p className='flex items-center justify-center gap-2'>
    <label for="102">Character</label>
    <input type='checkbox' id="102" defaultChecked={char} onChange={()=>{setchar((prev)=>!prev)}}></input>
    </p>
    <p className='flex gap-2 items-center justify-center'>
      <input type='range' min={8} max={25} value={len} id="12" className='cursor-pointer' onChange={(e)=>{setlen(e.target.value)}}></input>
      <label for="12">length ({len})</label>
    </p>
    </div>
    
    </div>
    
    </>
  )
}

export default App
