import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import suggestions from "../suggestion";

const CodeEditor = ({Code, setCode, Trans,editorRef}) => {
  
  const monaco = useMonaco();
  const [completionDisposable, setcompletionDisposable] = useState({});
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () =>
      console.log("hello world")
    );
  }
  function createDependencyProposals(range) {
    // returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
    // here you could do a server side lookup
    const suggestion = suggestions(range, monaco);
    return suggestion;
  }
  useEffect(() => {
    return () => {
      // if (typeof completionDisposable.dispose === "function") {
      //   completionDisposable.dispose();
      // }
    };
  }, [completionDisposable]);
  useEffect(() => {
    // do conditional chaining

    setcompletionDisposable(
      monaco?.languages.registerCompletionItemProvider("python", {
        provideCompletionItems: function (model, position) {
          // find out if we are completing a property in the 'dependencies' object.
          var textUntilPosition = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });
          var match = textUntilPosition.match(
            /transforms\.Compose\(\[\s*([^"]*)?/
          );
          if (!match) {
            return { suggestions: [] };
          }
          var word = model.getWordUntilPosition(position);
          var range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
          return {
            suggestions: createDependencyProposals(range),
          };
        },
      })
    );

    // setcompletionDisposable(monaco?.languages.registerCompletionItemProvider('python', {
    //   provideCompletionItems: function (model, position) {
    //     // find out if we are completing a property in the 'dependencies' object.
    //     var textUntilPosition = model.getValueInRange({
    //       startLineNumber: 1,
    //       startColumn: 1,
    //       endLineNumber: position.lineNumber,
    //       endColumn: position.column
    //     });
    //     var match = textUntilPosition.match(
    //       /"\s*"/
    //     );
    //     if (!match) {
    //       return { suggestions: [] };
    //     }
    //     var word = model.getWordUntilPosition(position);
    //     var range = {
    //       startLineNumber: position.lineNumber,
    //       endLineNumber: position.lineNumber,
    //       startColumn: word.startColumn,
    //       endColumn: word.endColumn
    //     };
    //     return {
    //       suggestions: {
    //         label: "transforms.CenterCrop",
    //         kind: monaco.languages.CompletionItemKind.Function,
    //         documentation: "Composes several transforms together. This transform does not support torchscript.",
    //         insertText: "transforms.Compose(${1:transforms})",
    //         range: range,
    //         insertTextRules:
    //           monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //       }
    //     };
    //   }
    // }));
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);
  return (
    <div>
      <Editor
        height="40vh"
        defaultLanguage="python"
        defaultValue={Code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        onChange={(val,event)=>setCode(val)}
        value={Code}
      />
    </div>
  );
};

export default CodeEditor;
