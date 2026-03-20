import React, { useState } from 'react';
import styles from './Notepad.module.css';

const Notepad = () => {
  const [text, setText] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.menubar}>
        <span className={styles.menuItem}>File</span>
        <span className={styles.menuItem}>Edit</span>
        <span className={styles.menuItem}>Format</span>
        <span className={styles.menuItem}>View</span>
        <span className={styles.menuItem}>Help</span>
      </div>
      <textarea 
        className={styles.textarea} 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Notepad;
