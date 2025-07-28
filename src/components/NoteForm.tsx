// 用于处理输入逻辑

import { useState } from 'react';

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
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // 阻止默认表单提交行为
        if (!inputValue.trim()) return; // 如果输入为空则不添加 
        onAddNote(inputValue);
        setInputValue(''); // 清空输入框
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
            <input 
                value={inputValue}
                onChange={handleInputChange}
                placeholder='输入笔记内容...'
                style={{ flex: 1, padding: '10px', fontSize: '16px' }}
            />

            <button 
                type='submit'
                style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}
            >
                添加笔记
            </button>
        </form>
    )
}

export default NoteForm;

