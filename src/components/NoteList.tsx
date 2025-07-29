// 用于遍历笔记列表并渲染每个笔记项
// 通过 props 接收笔记列表数据，并在没有笔记时显示提示信息
// 这样可以使组件更灵活，便于在不同的上下文中使用
// 组件内部使用了 NoteItem 组件来渲染每个笔记项

import type { Note } from "../types";

import NoteItem from "./NoteItem.tsx";

interface NoteListProps {
  notes: Note[];
  onDeleteNote?: (id: number) => void; // 可选的删除笔记函数

  onToggleStar?: (id: number) => void; // 可选的星标切换函数
}

function NoteList({ notes, onDeleteNote, onToggleStar }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#999" }}>
        没有笔记，快来添加一条吧！
      </p>
    );
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} onDeleteNote={onDeleteNote} onToggleStar={onToggleStar} />
      ))}
    </ul>
  );
}

export default NoteList;
