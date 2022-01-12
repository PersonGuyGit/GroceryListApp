import React from 'react'

const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

export const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div ref={ref}>
        <h2>Grocery List Contents</h2>
      </div> 
    );
  });