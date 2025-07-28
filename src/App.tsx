import { useState } from 'react'
import type { Note } from './types'
import NoteForm from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  // 添加新笔记
  const addNote = (content: string) => {
    if (!content.trim()) return
    setNotes(prevNotes => [
      ...prevNotes,
      {
        id: Date.now(),
        content,
        createdAt: new Date().toLocaleString(),
        starred: false,
      }
    ])
  }


  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

      <h1 style={{textAlign:"center"}}>MiniNotes 📝</h1>

      <p style={{ textAlign: 'center', color: '#666' }}>一个简单的笔记应用</p>

      <NoteForm onAddNote={addNote} />
    </div>
  )
}

export default App