import React, { useContext } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { StateContext } from "../../App";
import './style.css';


 function TextArea() {
  const stateContext = useContext(StateContext);
  return (
   <div className="TextArea">
      <CodeMirror
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
        }}
        editorDidMount={(editor) => editor.setSize("", "100%")}
        onChange={(editor) => {
          stateContext.setEditor(editor);
        }}
      />
   </div>
  );
}

export default TextArea;