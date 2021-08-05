import React, { Children, ReactElement, ReactNode } from 'react';
import './App.css';

//* Conventional props
//? SETUP BASED ON => https://www.youtube.com/watch?v=z8lDwLKthr8

function Heading({title}: {title: string}){
  return<h1>{title}</h1>
}

function HeadingWithContent({children}: {children: ReactNode}): ReactElement{
  return <h1>{children}</h1>
}

function App() {
  return (
    <div>
      <Heading title="Hello Wolrd"></Heading>    
      <HeadingWithContent>
        <strong>Still here!</strong>
      </HeadingWithContent>
    </div>
  );
}

export default App;
