// 用于处理输入逻辑。通过 props 传递一个函数来处理添加笔记的逻辑
// 这样可以使组件更灵活，便于在不同的上下文中使用

import { useState } from 'react';
import { Form, Input, Button } from 'antd';

interface NoteFormProps {
  onAddNote: (content: string) => void; 
}

function NoteForm({ onAddNote }: NoteFormProps) {

     const [inputValue, setInputValue] = useState('');

    // 处理输入变化  等同于 event => setInputValue(event.target.value)
    // 这里使用了 React 的事件类型来确保类型安全
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // 提交表单
    const handleSubmit = () => {
        if (!inputValue.trim()) return; // 如果输入为空则不添加 
        onAddNote(inputValue);
        setInputValue(''); // 清空输入框
    };


    return (

       <Form
      layout="inline"
      style={{ marginBottom: 20, display: 'flex', gap: 10,width: '100%' }}
      onFinish={handleSubmit}
    >
      <Form.Item style={{ flex: 1, marginBottom: 0 }}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入笔记内容..."
          style={{ fontSize: 16 }}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ fontSize: 16, minWidth: 90 }}
        >
          添加笔记
        </Button>
      </Form.Item>
    </Form>
    )
}

export default NoteForm;

