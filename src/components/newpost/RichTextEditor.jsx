import { Slate, Editable } from "slate-react"
import { Text } from "slate";
import { withReact } from "slate-react";
import { useContext, useState } from "react";
import { createEditor } from "slate";
import escapeHtml from 'escape-html'
import { Transforms, Element, Node } from 'slate'
import { Controller } from "react-hook-form";

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const serialize = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    return string
  }

  console.log(node);

  const children = node.children.map(n => serialize(n)).join('')

  switch (node.type) {
    case 'quote':
      return `<blockquote><p>${children}</p></blockquote>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    default:
      return children
  }
}


const RichTextEditor = ({className, control, name}) => {

    const [editor] = useState(() => withReact(createEditor()));

    const [value, setValue] = useState(initialValue);

    //const { handleRichTextChange } = useContext(PostFormContext);

    const handleChange = () => {

    }
        
    return (
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange } }) => (
        // Add the editable component inside the context.
            <Slate editor={editor} value={value}>
                  <Editable className={className} placeholder={"What's on your mind"} />
            </Slate>
            )}
          />
    );
}

export default RichTextEditor;