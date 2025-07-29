import { useEffect, useState } from 'react'
import type { Note } from './types'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [initialized, setInitialized] = useState(false)
  // 只看星标
  const [showStarredOnly, setShowStarredOnly] = useState(false)


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

  // 删除笔记
  const deleteNote = (id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  // 星标
  const toggleStar = (id: number) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, starred: !note.starred } : note
      )
    )
  }


  // 筛选笔记 生成新数组
  const filteredNotes = notes.filter(note =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 如果只看星标，则进一步筛选
  const displayedNotes = showStarredOnly
    ? filteredNotes.filter(note => note.starred)
    : filteredNotes



 useEffect(() => {
  const savedNotes = localStorage.getItem('notes')
  if (savedNotes) {
    try {
      setNotes(JSON.parse(savedNotes))
    } catch (e) {
      console.error('本地数据解析失败', e)
    }
  }
  setInitialized(true)
}, [])

useEffect(() => {
  if (initialized) {
    localStorage.setItem('notes', JSON.stringify(notes))
  }
}, [notes, initialized])


  // 每次 notes 变化时保存到本地
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]) 
  

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

      <h1 style={{textAlign:"center"}}>MiniNotes 📝</h1>

      <p style={{ textAlign: 'center', color: '#666' }}>一个简单的笔记应用</p>

      <input
        type="text"
        placeholder="搜索笔记..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>
        <input
          type="checkbox"
          checked={showStarredOnly}
          onChange={(e) => setShowStarredOnly(e.target.checked)}
        />
        只看星标笔记
      </label>

      <NoteForm onAddNote={addNote} />

      <NoteList notes={displayedNotes} onDeleteNote={deleteNote} onToggleStar={toggleStar} />

    </div>
  )
}

export default App