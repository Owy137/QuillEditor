import React, {useState, useRef, useEffect} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import * as mammoth from 'mammoth';
import axios from 'axios';
//import express from 'express';
//import HTMLToDOCX from 'html-docx-js/dist/html-docx';
//import pdf2html from 'pdf2html';
//import HTMLtoDOCX from 'html-to-docx';
//import html_to_pdf from 'html-to-pdf';

function Editor() {
  const [value, setValue] = useState('');

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:5173/api");
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, [])

  var modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, false] }],
      [{'size': ['small', false, 'large', 'huge']}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'color': []}, {'background': []}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      [{'align':''}, {'align':'center'}, {'align':'right'}],
      ['clean'],
    ],
    history: {
      delay :2000,
      maxStack: 200,
      userOnly: true
    },
  }

  function handleSave(){
    console.log("editor content: ", {value});
  }

  async function handleFileUpload(e){

    const file = e.target.files[0];
    if (!file) return;
    let result = null;
    console.log(file);

    const arrayBuffer = await file.arrayBuffer();
    result = await mammoth.convertToHtml({ arrayBuffer });
    setValue(result.value);
  }

  return (
    <div className="editor">
      <input type="file" accept=".docx, .pdf" onChange={handleFileUpload}/>
      <ReactQuill theme="snow" value={value} onChange={setValue} 
        modules={modules}/>
      <button onClick={handleSave}>Save Contents</button>
    </div>
  )
}

export default Editor