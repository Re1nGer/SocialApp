import { Slate, Editable} from "slate-react"
import { withReact } from "slate-react";
import { useState } from "react";
import { createEditor } from "slate";

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const RichTextEditor = () => {

    const [editor] = useState(() => withReact(createEditor()))

    return (
        // Add the editable component inside the context.
        <Slate editor={editor} value={initialValue}>
            <Editable />
        </Slate>
    );
}

export default RichTextEditor;