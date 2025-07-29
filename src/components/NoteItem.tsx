// 仅仅用于展示笔记项的组件
// 通过 props 接收一个 note 对象，并展示其内容和创建时间

import type { Note } from "../types";

interface NoteItemProps {
  note: Note;
  onDeleteNote?: (id: number) => void; // 可选的删除笔记函数
  onToggleStar?: (id: number) => void; // 可选的星标切换函数
}

function NoteItem({ note, onDeleteNote, onToggleStar }: NoteItemProps) {
  return (
    <li
      style={{
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
      }}
    >
      <h3 style={{ margin: 0 }}>{note.content}</h3>
      <p style={{ color: "#666", fontSize: "0.9em" }}>
        创建于：{note.createdAt}
      </p>

      {/* 条件渲染删除按钮 */}
      {onDeleteNote && (
        <button
          onClick={() => onDeleteNote(note.id)}
          style={{
            marginTop: "10px",
            padding: "5px 10px",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
          }}
        >
          删除
        </button>
      )}

      {/* 条件渲染星标按钮 样式为黄色五角星  */}
      { onToggleStar && (
        <button
          onClick={() => onToggleStar(note.id)}
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: note.starred ? "#ffd700" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
          }}
        >
          {note.starred ? "取消星标" : "星标"}
        </button>
      )}
    </li>
  );
}

export default NoteItem;
