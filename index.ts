// For further developments element id generator import uuid from "./uuid";
/* 
  2021 - Dombul DOM Operator
  :gear: Still in development !!

  Github: github.com/movwf
*/
function DOM() {
  function render(childNode, parentNode) {
    const { type, props } = childNode;

    // Selective dom element
    const element =
      type.toLowerCase() === "text"
        ? document.createTextNode(props.innerText)
        : document.createElement(type);

    parentNode.appendChild(element);

    // Spread props
    Object.keys(props)
      .filter(isAttribute)
      .forEach((attribute) => {
        element[attribute] = props[attribute];
      });

    // Spread listeners
    Object.keys(props)
      .filter(isListener)
      .forEach((listener) => {
        element.addEventListener(
          listener.toLowerCase().substr(2), // Event Type : onClick -> "click"
          props[listener] // Event callback : () => {}
        );
      });

    // Append child elements
    if (props.children) {
      props.children.forEach((childElement) => {
        render(childElement, element);
      });
    }

    // Append element to parent
    parentNode.appendChild(element);
  }

  function isListener(prop) {
    return prop.startsWith("on");
  }

  function isAttribute(prop) {
    return !isListener(prop) && prop !== "children";
  }

  return {
    render,
  };
}

export const DombulDOM = DOM();
