import React from 'react';
import styles from './Counter.module.scss';

const Counter = () => {

  const [count, setCount] = React.useState(0);

  return (
    <button className={styles.btn} onClick={() => setCount(count + 1)}>
      {`conunter: ${count}`}
    </button>
  );
};

export default Counter;
