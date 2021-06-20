import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState,useEffect} from 'react'
import axios from 'axios'


const Home=()=> {
  
  const [service,setService]=useState("gmail")
  const [user,setUser]=useState("")
  const [pass,setPass]=useState("")
  const [to,setTo]=useState("")
  const [subject,setSubject]=useState("")
  const [html,setHtml]=useState("")
  const [red,setRed]=useState("")
  const [green,setGreen]=useState("")
  
  const send=()=>{
  axios.post("http://localhost:2000/api/send",{user,service,pass,to,subject,html}).then(response=>{
    if(response.data.err){
      setRed(response.data.err)
      setGreen("")
    }else{
    setGreen(response.data)
    setRed("")
    }
  }).catch(err=>{
    alert(err)
    
  })
}

  
  
  
  
  
  return (
    <div>
      <Head>
        <title>Mail html</title>
        <meta name="description" content="send html mail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <br/><br/>
      <center>
    <div className={styles.card}>
    <br />
  {red?<span id="red">{red}</span>:<span></span>}
    {green?<span id="green">{green}</span>:<span></span>}
    
    <br/>
    <input id="in" type="email" placeholder="from" value={service} onChange={(e)=>setService(e.target.value )}/><br/><br/>
    <input id="in" type="email" placeholder="from" onChange={(e)=>setUser(e.target.value )}/><br/><br/>
    <input id="in" type="email" placeholder="to" onChange={(e)=>setTo(e.target.value )}/><br/><br/>
    <input id="in" type="password" placeholder="password" onChange={(e)=>setPass(e.target.value )}/><br/><br/>
    <input id="in" type="text" placeholder="Subject" onChange={(e)=>setSubject(e.target.value )}/><br/><br/>
    <textarea placeholder="html" onChange={(e)=>setHtml(e.target.value )} rows="8" cols="20"></textarea><br/><br/>
    <button onClick={send}>send</button>
    <br/><br/>
  
    </div>
  
    </center>
        </main>
    </div>
  )
}
export default Home
