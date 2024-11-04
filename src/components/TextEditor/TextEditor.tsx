import Quill from "quill";
import "quill/dist/quill.snow.css";
import styles from "./textEditor.module.css";
import { useCallback, useEffect, useState } from "react";
import { TEXT_EDITOR_OPTIONS } from "../../lib/constants";

type TextEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

export default function TextEditor({ value, onChange }: TextEditorProps) {
  const [quill, setQuill] = useState<Quill>();

  // Update the form data when the editor content changes
  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper === null) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TEXT_EDITOR_OPTIONS },
    });

    // Restore the content if value is provided
    if (value) {
      q.root.innerHTML = value; // Alternatively, you can use q.setContents() with Delta
    }

    // Set up event listener for text change
    q.on("text-change", () => {
      console.log("Changing the parent element with quill html")
      onChange(q.root.innerHTML); // Pass the actual content
    });

    setQuill(q);
  }, []);

  useEffect(() => {
    // Only set the content when the editor is first initialized
    if (quill && value !== quill.root.innerHTML) {
      console.log("changing quill with parent value")
      quill.root.innerHTML = value;
    }
  }, [value, quill]);

  return (
    <div>
      <h1 className="block text-lg mb-1">Location Content</h1>
      <div ref={wrapperRef} className={`mb-4 py-2 ${styles.container}`}></div>
    </div>
  );
}
