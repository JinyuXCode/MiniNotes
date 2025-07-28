// 定义 Note 接口，包含 id、content、createdAt、starred 字段
export interface Note{
    id: number; // 唯一标识符
    content: string; // 笔记内容
    createdAt: string; // 创建时间
    starred: boolean; // 是否被标记为星标
}