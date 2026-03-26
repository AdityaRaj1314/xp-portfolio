import React, { useState, useEffect, useRef } from 'react';
import styles from './Notepad.module.css';

const Notepad = () => {
  const [text, setText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedText = localStorage.getItem('notepad-content');
    if (savedText !== null) {
      setText(savedText);
    }
    setIsLoaded(true);
  }, []);

  // Auto-save logic
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('notepad-content', text);
    }
  }, [text, isLoaded]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const executeCommand = (command: string) => {
    setActiveMenu(null);
    switch (command) {
      case 'New':
        setText('');
        localStorage.setItem('notepad-content', '');
        break;
      case 'Open':
        const saved = localStorage.getItem('notepad-content');
        if (saved !== null) setText(saved);
        break;
      case 'Save':
        localStorage.setItem('notepad-content', text);
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Untitled.txt";
        a.click();
        URL.revokeObjectURL(url);
        break;
      case 'Time/Date':
        const date = new Date();
        setText(`${text}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`);
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      default:
        break;
    }
  };

  const onTextAreaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      setText(`${text.substring(0, start)}\t${text.substring(end)}`);
      
      requestAnimationFrame(() => {
        target.selectionStart = start + 1;
        target.selectionEnd = start + 1;
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menubar} ref={menuRef}>
        <div className={styles.menuContainer}>
          <span className={styles.menuItem} onClick={() => handleMenuClick('File')}>File</span>
          {activeMenu === 'File' && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} onClick={() => executeCommand('New')}>New</div>
              <div className={styles.dropdownItem} onClick={() => executeCommand('Open')}>Open</div>
              <div className={styles.dropdownItem} onClick={() => executeCommand('Save')}>Save</div>
            </div>
          )}
        </div>
        
        <div className={styles.menuContainer}>
          <span className={styles.menuItem} onClick={() => handleMenuClick('Edit')}>Edit</span>
          {activeMenu === 'Edit' && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} onClick={() => executeCommand('Time/Date')}>Time/Date</div>
            </div>
          )}
        </div>

        <div className={styles.menuContainer}>
          <span className={styles.menuItem} onClick={() => handleMenuClick('Format')}>Format</span>
          {activeMenu === 'Format' && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} onClick={() => executeCommand('Word Wrap')}>
                {wordWrap ? "✓ Word Wrap" : "Word Wrap"}
              </div>
            </div>
          )}
        </div>

        <span className={styles.menuItem}>View</span>
        <span className={styles.menuItem}>Help</span>
      </div>
      <textarea 
        className={styles.textarea} 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
        style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre', overflowX: wordWrap ? 'hidden' : 'scroll' }}
      />
    </div>
  );
};

export default Notepad;
