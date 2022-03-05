import React from 'react';
import cl from './NotFound.module.scss';

function NotFound(): JSX.Element {
  const text = `There's nothing here!`;

  return (
    <main className={cl.container}>
      <p>{text}</p>
    </main>
  );
}

export default NotFound;
