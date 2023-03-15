import { Slate, Editable } from "slate-react"
import { withReact } from "slate-react";
import { useState } from "react";
import { createEditor } from "slate";

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const RichTextEditor = ({className, onChange}) => {

    const [editor] = useState(() => withReact(createEditor()))

    return (
        // Add the editable component inside the context.
        <Slate editor={editor} value={initialValue} onChange={onChange}>
            <Editable className={className} placeholder={"What's on your mind"} maxLength={500} rows={10} />
        </Slate>
    );
}

export default RichTextEditor;