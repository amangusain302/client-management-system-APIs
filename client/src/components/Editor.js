import React, { useEffect, useState } from 'react';
import { Editor} from "react-draft-wysiwyg";
import {EditorState, convertToRaw} from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { useSelector, useDispatch } from 'react-redux';
import { updateState } from '../state/actions';
// import { useState } from "react";

const TextEditor = () => {
    const emailState = useSelector(state=>state.UserReducer.email);
    const dispatch = useDispatch();
    const [editorState, setEditorState] = useState(() => {
        EditorState.createEmpty()
    });
    const[ mailText, setMailText ] = useState(""); 
    const text = ()=>{
        let htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setMailText(draftToHtml(htmlContent));
        dispatch(updateState({filter:"email",data:{to:emailState.to,subject:emailState.subject,mailText:htmlContent}}))
        
    }
    
    useEffect(()=>{
        
        // setMailText(emailState.mailText);
    })
    
    return (
        <>
            <Editor
                toolbar={{options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'textAlign', 'emoji','link']}}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor p-2"
                onEditorStateChange={setEditorState}
                onChange={text}
                
            />
        </>
    )
}
export default TextEditor;
