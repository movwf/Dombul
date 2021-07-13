/* 
  2021 - Dombul DOM Operator
  :gear: Still in development !!

  Github: github.com/movwf
*/
function DOM() {
  function render(childNode, parentNode) {
    const { type, props } = childNode;

    // Create DOM - Selective
    const element =
      type === "TEXT"
        ? document.createTextNode(props.nodeValue)
        : document.createElement(type);

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
    const childElements = props.children || [];
    childElements.forEach((childElement) => render(childElement, element));

    // Append element to parent
    parentNode.appendChild(element);
  }

  function isListener(prop) {
    return prop.startsWith("on");
  }

  function isAttribute(prop) {
    return !isListener(prop) && prop !== "children";
  }

  function createElement(type, settings, ...childNodes) {
    const props = Object.assign({}, settings);
    const children = childNodes.length > 0 ? [...childNodes] : [];

    props.children = children
      .filter(isChildNullorFalse)
      .map((child) =>
        child instanceof Object
          ? child
          : createElement("TEXT", { nodeValue: child })
      );
    return {
      type,
      props,
    };
  }

  function isChildNullorFalse(child) {
    return child != null && child !== false;
  }

  return {
    render,
    createElement,
  };
}

export const DombulDOM = DOM();
