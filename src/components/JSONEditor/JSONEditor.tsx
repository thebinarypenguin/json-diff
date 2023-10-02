import Editor, { OnChange, OnValidate } from '@monaco-editor/react';

// types
import { editor } from 'monaco-editor';

import './JSONEditor.css';
import { useState } from 'react';

export interface IJSONEditorProps {
    contents: string;
    onChange: OnChange;
    onValidate: OnValidate;
};

const JSONEditor = (props: IJSONEditorProps) => {
    const { contents, onChange, onValidate } = props;

    const [valid, setValid] = useState(true); 

    const handleValidate = (markers: editor.IMarker[]) => {
        const invalid = markers.some((m) => m.owner === "json");
        setValid(!invalid);
        onValidate(markers);
      };

    // TODO use classnames package  

    return (
        <div className={`jsonEditor ${valid? '':'invalid'}`}>
            { !valid && <div className='errorMessage'>Syntax Error: See squigglies below</div> }
            <Editor
            
                height='70vh'    // temporary
                language='json' 
                theme='vs-dark' 
                options={{
                    // lineNumbers: 'off'
                    minimap: {
                        enabled: false
                    },
                    scrollBeyondLastLine: false,
                    formatOnPaste: true,
                }} 
                value={contents} 
                onChange={onChange}
                onValidate={handleValidate}
            />
        </div>
    );
};

export default JSONEditor;