import React from 'react';
import s from '../styles/faq.module.scss';

const FAQ = () => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className={s.content}>
        <div className={s.question}>
          <h2>Question 1</h2>
          <p>This is the answer to question 1.</p>
        </div>
        <div className={s.question}>
          <h2>Question 2</h2>
          <p>This is the answer to question 2.</p>
        </div>
        {/* Add more questions as needed */}
      </div>
    </div>
  );
};

export default FAQ;
