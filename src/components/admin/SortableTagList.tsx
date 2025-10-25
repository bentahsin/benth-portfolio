'use client';
import React, { useState, useTransition } from 'react';
import type { Tag } from '@prisma/client';
import { updateTagOrder } from '@/actions/tagActions';
import Link from 'next/link';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';

type TagWithCount = Tag & { _count: { posts: number } };

interface SortableTagListProps {
    categories: TagWithCount[];
}

type TagOrderUpdate = {
    id: string;
    order: number;
};

const SortableTagList: React.FC<SortableTagListProps> = ({ categories }) => {

    const [items, setItems] = useState(() => [...categories].sort((a, b) => a.order - b.order));
    const [isPending, startTransition] = useTransition();

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(items);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);

        setItems(reorderedItems);
    };

    const handleSaveOrder = () => {

        const updateData: TagOrderUpdate[] = items.map((item, index) => ({
            id: item.id,
            order: index,
        }));

        startTransition(() => {

            updateTagOrder(updateData);
        });
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>Etiketler</h1>
                <div>
                    <button onClick={handleSaveOrder} className="admin-button" disabled={isPending}>
                        {isPending ? 'Sıralama Kaydediliyor...' : 'Sıralamayı Kaydet'}
                    </button>
                    <Link href="/admin/tags/new" className="admin-button primary" style={{ marginLeft: '1rem' }}>
                        Yeni Etiket
                    </Link>
                </div>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}></th>
                                <th>Etiket Adı</th>
                                <th>Yazı Sayısı</th>
                                <th style={{ width: '120px' }}>İşlemler</th>
                            </tr>
                        </thead>
                        <Droppable droppableId="tags">
                            {(provided) => (
                                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                    {items.map((tag, index) => (
                                        <Draggable key={tag.id} draggableId={tag.id} index={index}>
                                            {(provided) => (
                                                <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <td><i className="fas fa-grip-vertical" style={{ cursor: 'grab' }}></i></td>
                                                    <td>{tag.name}</td>
                                                    <td>{tag._count.posts}</td>
                                                    <td className="actions-cell">
                                                        <Link href={`/admin/tags/edit/${tag.id}`} className="admin-button small">
                                                            Düzenle
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            )}
                        </Droppable>
                    </table>
                </div>
            </DragDropContext>
        </div>
    );
};

export default SortableTagList;