import React from 'react'
import Head from 'next/head'
import '../styles/Home.module.css'


export default function Home() {
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState("")
  let triggerService = event => {
    if (event.key === "Enter") {
      setLoading(true)
      fetch(`/api/search?q=${value.replace(" ", "+")}`).then(res => {
        return res.text()
      }).then((res)=>{
        setLoading(false)
        let doc = document.getElementById('iframe').contentWindow.document;
        doc.open();
        doc.write(res);
        doc.close();
      })
    }
  }
  return (
    <div>
      <Head>
        <title>Google safe</title>
      </Head>
      <main>
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            value={value}
            onChange={(e)=>{setValue(e.target.value)}}
            onKeyPress={triggerService}
          />
          <svg focusable="false" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
        </div>
        <div className="iframe-container">
          {loading && <p>Loading...</p>}
          <iframe id="iframe"></iframe>
        </div>
      </main>
    </div>
  )
}
