import { Slate, Editable, withReact } from 'slate-react'
import { Text, createEditor, Transforms, Element, Node } from 'slate'

import { useContext, useState } from 'react'
import escapeHtml from 'escape-html'
import { Controller } from 'react-hook-form'

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    return string
  }

  console.log(node)

  const children = node.children.map((n) => serialize(n)).join('')

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
