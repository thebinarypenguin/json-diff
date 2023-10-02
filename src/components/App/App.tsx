import stringify from "json-stable-stringify";
import { DiffEditor } from "@monaco-editor/react";

// types
import { editor } from "monaco-editor";

import "./App.css";
import { useState } from "react";
import FilePicker from "../FilePicker/FilePicker";
import JSONEditor from "../JSONEditor/JSONEditor";

const App = () => {
  const [mode, setMode] = useState("input");
  const [leftJson, setLeftJson] = useState("");
  const [rightJson, setRightJson] = useState("");

  const [leftValid, setLeftValid] = useState(true);
  const [rightValid, setRightValid] = useState(true);

  const handleLeftChange = (c = "") => {
    setLeftJson(c);
  };

  const handleLeftValidate = (markers: editor.IMarker[]) => {
    const invalid = markers.some((m) => m.owner === "json");
    if (invalid) {
      setLeftValid(false);
    } else {
      setLeftValid(true);
    }
  };

  const handleRightChange = (c = "") => {
    setRightJson(c);
  };

  const handleRightValidate = (markers: editor.IMarker[]) => {
    const invalid = markers.some((m) => m.owner === "json");
    if (invalid) {
      setRightValid(false);
    } else {
      setRightValid(true);
    }
  };

  const isButtonEnabled = () => {
    if (leftJson !== "" && rightJson !== "" && leftValid && rightValid) {
      return true;
    }

    return false;
  };

  return (
    <>
      <h1>JSON Diff</h1>

      {mode === "input" && (
        <div className="row">
          <div className="left">
            <FilePicker
              name="leftJson"
              onChange={handleLeftChange}
              onError={console.log}
            />
            <JSONEditor
              contents={leftJson}
              onChange={handleLeftChange}
              onValidate={handleLeftValidate}
            />
          </div>
          <div className="middle">
            <button
              disabled={!isButtonEnabled()}
              onClick={() => {
                setLeftJson(stringify(JSON.parse(leftJson), { space: 4 }));
                setRightJson(stringify(JSON.parse(rightJson), { space: 4 }));
                setMode("result");
              }}
            >
              Diff
            </button>
          </div>
          <div className="right">
            <FilePicker
              name="rightJson"
              onChange={handleRightChange}
              onError={console.log}
            />
            <JSONEditor
              contents={rightJson}
              onChange={handleRightChange}
              onValidate={handleRightValidate}
            />
          </div>
        </div>
      )}

      {mode === "result" && (
        <>
          <div className="row">
            <div className="middle">
              <button onClick={() => {
                setLeftJson('');
                setRightJson('');
                setMode("input");
              }}>Reset</button>
            </div>
          </div>

          <div className="row">
            <div className="left jsonEditor">
              {/* background color #1e1e1e */}
              <DiffEditor
                height="70vh"
                language="json"
                theme="vs-dark"
                options={{
                  // lineNumbers: 'off'
                  minimap: {
                    enabled: false,
                  },
                  scrollBeyondLastLine: false,
                }}
                original={leftJson}
                modified={rightJson}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
