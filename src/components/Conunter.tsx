import React from 'react';
import './Counter.scss'

const Counter = () => {

  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {`conunter: ${count}`}
    </button>
  );
};

export default Counter;
