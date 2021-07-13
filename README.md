# Dombul-DOM

> Simple DOM Orchestrator

[NPM Package Link](https://www.npmjs.com/package/dombul-dom)

![Image](https://i.ibb.co/7X5NY0S/dombul-logo.png)

### How to Install
- Install Dombul-DOM

` npm install dombul-dom `

- Import in main.js

```js
import { DombulDOM } from 'dombul-dom';


// Object Style
const App = () => {
  return{
    type:"div",
    props:{
      id:"test",
      children:[
        { type: "TEXT", props: { nodeValue: "Testing" } },
      ]
    }
  }
};

// JSX Style
const App = () => {
  return (
    <div id="test">
      {"Testing"}
    </div>
  )
};

// Initiate render

DombulDOM.render(App(),document.getElementById("root"));
```

### With Parcel & Babel

Install;

- npm install --save-dev parcel-bundler @babel/core @babel/preset-react

#### .babelrc

```JSON
{
  "presets": [
    [
      "@babel/preset-react",
      {
        "pragma":"DombulDOM.createElement"
        }
    ]
  ]
}

```

### Version History

- 1.0.0 - Simple DOM object rendering features initiated.
- 1.1.0 - JSX rendering capabilities added.
- 1.1.1 - README added.
