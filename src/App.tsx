import { useEffect, useState } from "react";
import type { Note } from "./types";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Footer from "./components/Footer";
import "./App.scss"; // 引入样式文件




import { Input } from "antd"; // 引入 Ant Design 的栅格系统

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialized, setInitialized] = useState(false);
  // 只看星标
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // 添加新笔记
  const addNote = (content: string) => {
    if (!content.trim()) return;
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now(),
        content,
        createdAt: new Date().toLocaleString(),
        starred: false,
      },
    ]);
  };

  // 删除笔记
  const deleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // 星标
  const toggleStar = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, starred: !note.starred } : note
      )
    );
  };

  // 筛选笔记 生成新数组
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 如果只看星标，则进一步筛选
  const displayedNotes = showStarredOnly
    ? filteredNotes.filter((note) => note.starred)
    : filteredNotes;

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("本地数据解析失败", e);
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, initialized]);

  return (
    <div className="app-bg">
      {/* 毛玻璃背景 */}
      <div className="blur-circle"></div>

      <div className="logo">
        {/* <img src={logo} alt="MiniNotes Logo" style={{ width: "100px", height: "100px" }} /> */}
        <span className="logo-title">Mini Notes</span>
        <span className="logo-subtitle">⭐简洁的笔记应用⭐</span>
      </div>
      {/* 笔记表单 */}
      <NoteForm onAddNote={addNote} />

      {/* 搜索 */}
            <Input
              placeholder="搜索笔记..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "20%", marginBottom: "20px" }}
              allowClear
              className="search-input"
            />

            <label style={{ display: "block", marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={showStarredOnly}
                onChange={(e) => setShowStarredOnly(e.target.checked)}
              />
              只看星标笔记
            </label>

            <NoteList
              notes={displayedNotes}
              onDeleteNote={deleteNote}
              onToggleStar={toggleStar}
            />


      <Footer />
    </div>
  );
}

export default App;
