import  { useRef,useState } from 'react';
import  "./App.css"

import Editor from '@monaco-editor/react';
import Navbar from './Navbar';

function App() {
  const editorRef = useRef('');
  const [firstt, setfirstt] = useState("")
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }



  function handleEditorChange(value) {
setfirstt(value);
console.log(firstt)
  }
  const [first, setfirst] = useState()
 const senddata =  {
    source_code:firstt,
    language_id: "71",
    number_of_runs: null,
    stdin: "Judge0",
    expected_output: null,
    cpu_time_limit: null,
    cpu_extra_time: null,
    wall_time_limit: null,
    memory_limit: null,
    stack_limit: null,
    max_processes_and_or_threads: null,
    enable_per_process_and_thread_time_limit: null,
    enable_per_process_and_thread_memory_limit: null,
    max_file_size: null,
    enable_network: null
}


const timer = (ff)=>{setTimeout(() => {
  // Perform the second fetch here
  fetch(`http://localhost:2358/submissions/${ff}`) // Replace with the URL of your second endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData)
      if(responseData.stdout === undefined){
        timer(responseData.token)
      }
else{
      setfirst(responseData.stdout)
    }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, 3000);

}

  const data = ()=>{
    fetch('http://localhost:2358/submissions',{
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(senddata),  
    }
    ).then(gg=>gg.json()).then(ff=>{console.log(ff);timer(ff.token)})
  }  
  function showValue(){
    console.log(firstt)
    data()
  }
  const [selectedFontSize, setSelectedFontSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  const handleSelectLanguage = (event) => {
     setSelectedLanguage(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10); // Parse the selected value as an integer
    setSelectedFontSize(selectedValue);
  };


  const editorOptions = {
    fontSize: selectedFontSize, // Change this value to your desired font size
    language:"c++",
    // Other editor options...
  };

  return (
    <>
    <Navbar showValue={showValue}/>
    <div className='flex'>
    <div className="left">
 
      <Editor
        className="gg"
        height="90vh"
        width="80vw"
        options={editorOptions}
        theme="vs-dark"
        ref={editorRef}
        onMount={handleEditorDidMount}
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />  
    <p>{first}</p>
    </div>
    <div className="right">
      <h3 className='white'>Language</h3>
      <select className='selectt'
        id="fontSizeSelect"
        name="fontSizeSelect"
        value={selectedLanguage}
        onChange={handleSelectLanguage}
      >
        <option  value="javascript">javascript</option>
        <option value="python">python</option>
        <option value="c++">c++</option>
        <option value="java">java</option>
      </select>


    <h3 htmlFor="fontSizeSelect" className='white'>Select Font Size:</h3>
      <select className='select'
        id="fontSizeSelect"
        name="fontSizeSelect"
        value={selectedFontSize}
        onChange={handleSelectChange}
      >
        <option  value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
        <option value="24">24</option>
        <option value="26">26</option>
      </select>
    </div>
    </div>
    </>
  )
}

export default App
