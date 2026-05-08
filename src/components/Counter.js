import React, { useState } from 'react';

export default function ItemCounter({ itemName = "Diamonds" }) {
  const [count, setCount] = useState(1);
    const statusColor = count > 0 ? '#55FF55' : '#FF5555';
  return (
    <div style={{
      border: 'none',
      padding: '20px',
      backgroundColor: "var(--code-background)",
      borderRadius: '4px',
      display: 'inline-block',
      color: 'white',
      textAlign: 'center'
    }}>
      <h3>/give @s minecraft:{itemName} <span style={{ color: statusColor }}>{count}</span></h3>
      
      <button 
        onClick={() => setCount(count + 1)}
        style={{
          backgroundColor: "var(--code-background)",
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          cursor: 'pointer',
          boxShadow: 'inset -2px -2px 0px #444, inset 2px 2px 0px #DDD',
          fontWeight: 'bold'
        }}
        onMouseDown={(e) => e.target.style.boxShadow = 'inset 2px 2px 0px #444'}
        onMouseUp={(e) => e.target.style.boxShadow = 'inset -2px -2px 0px #444, inset 2px 2px 0px #DDD'}
      >
        ADD ITEM
      </button>

      <button 
        onClick={() => setCount(count - 1)}
        style={{
          backgroundColor: "var(--code-background)",
          border: 'none',
          color: 'white',
          padding: '10px 20px',
          cursor: 'pointer',
          boxShadow: 'inset -2px -2px 0px #444, inset 2px 2px 0px #DDD',
          fontWeight: 'bold'
        }}
        onMouseDown={(e) => e.target.style.boxShadow = 'inset 2px 2px 0px #444'}
        onMouseUp={(e) => e.target.style.boxShadow = 'inset -2px -2px 0px #444, inset 2px 2px 0px #DDD'}
      >
        REMOVE ITEM
      </button>
    </div>
  );
}