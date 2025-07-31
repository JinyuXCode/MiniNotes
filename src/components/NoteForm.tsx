// 用于处理输入逻辑。通过 props 传递一个函数来处理添加笔记的逻辑
// 这样可以使组件更灵活，便于在不同的上下文中使用

import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { TwitterOutlined } from "@ant-design/icons"; // 引入 Twitter 图标

const { TextArea } = Input; // 使用 Ant Design 的 TextArea 组件
interface NoteFormProps {
  onAddNote: (content: string) => void;
}

function NoteForm({ onAddNote }: NoteFormProps) {
  const [inputValue, setInputValue] = useState("");
  const placeholderText = "💕请记录下来你认为值得记录的事情（限制200字）"; // 输入框的占位符文本
  // 处理输入变化  等同于 event => setInputValue(event.target.value)
  // 这里使用了 React 的事件类型来确保类型安全
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  // 提交表单
  const handleSubmit = () => {
    if (!inputValue.trim()) {
      message.error("你还没有添加内容🫣"); // 使用 Ant Design 的 message 组件显示错误信息
      return;
    }
    onAddNote(inputValue);
    setInputValue(""); // 清空输入框
    message.success("记录成功，记得常翻阅💕"); // 显示成功信息
  };

  return (
    <Form
      style={{ marginBottom: 20, width: "40%", margin: "0 auto" }}
      onFinish={handleSubmit}
    >
      <Form.Item style={{ flex: 1, marginBottom: 0 }}>
        <TextArea
          rows={4}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholderText}
          maxLength={200}
          className="note-input"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: 0, display: "flex", justifyContent: "center" }}
      >
        <Button
          
          htmlType="submit"
          size="large"
          className="add-note-button"
          variant="link"
          color="cyan" 
        >
          <TwitterOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NoteForm;
