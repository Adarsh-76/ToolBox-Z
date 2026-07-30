import React, { useState } from 'react';
import { createPortal } from 'react-dom'; // Added createPortal
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './HomepageBuilder.module.css';

const SortableItem = ({ section, index, total, onMoveUp, onMoveDown }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: section.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableItem}>
      <span className={styles.dragHandle} {...attributes} {...listeners}>⠿</span>
      <span className={styles.itemIcon}>{section.icon}</span>
      <span className={styles.itemName}>{section.name}</span>
      
      <div className={styles.arrowBtns}>
        <button className={styles.arrowBtn} onClick={() => onMoveUp(index)} disabled={index === 0} title="Move Up">↑</button>
        <button className={styles.arrowBtn} onClick={() => onMoveDown(index)} disabled={index === total - 1} title="Move Down">↓</button>
      </div>
    </div>
  );
};

const HomepageBuilder = ({ sections, setSections, onClose, onReset }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      setSections(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setSections(arrayMove(sections, index, index - 1));
  };

  const handleMoveDown = (index) => {
    if (index === sections.length - 1) return;
    setSections(arrayMove(sections, index, index + 1));
  };

  const handleSave = () => {
    const order = sections.map(s => s.id);
    localStorage.setItem('homeOrder', JSON.stringify(order));
    window.dispatchEvent(new Event('homeReordered'));
    onClose();
  };

  const handleResetClick = () => {
    onReset();
    onClose();
  };

  // Teleport the modal directly to <body> to escape Framer Motion's stacking context
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={`liquid-glass ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Customize Homepage</h3>
          <button className={styles.closeBtn} onClick={onClose}>✖</button>
        </div>
        <p className={styles.desc}>Drag to rearrange, or use the ↑ ↓ buttons. Layout saves automatically.</p>
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className={styles.list}>
              {sections.map((section, index) => (
                <SortableItem 
                  key={section.id} 
                  section={section} 
                  index={index}
                  total={sections.length}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className={styles.actionBtns}>
          <button className={styles.resetBtn} onClick={handleResetClick}>↩️ Reset to Default</button>
          <button className={styles.saveBtn} onClick={handleSave}>💾 Save Layout</button>
        </div>
      </div>
    </div>,
    document.body // Rendered here!
  );
};

export default HomepageBuilder;
