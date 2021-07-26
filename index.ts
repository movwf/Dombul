/* 
  2021 - Dombul DOM Operator
  :gear: Still in development !!

  Github: github.com/movwf
*/
function DOM() {
  let rootInstance = null;

  function render(childNode, parentNode) {
    // Reconcile root instance via recursive calls
    rootInstance = reconcile(parentNode, rootInstance, childNode);
  }

  function reconcile(parentDom, instance, element) {
    // Initiate run
    if (instance == null) {
      // Create instance by element
      const newInstance = eventualise(element);
      parentDom.appendChild(newInstance.dom);

      return newInstance;
    }
    // If unmount
    else if (element == null) {
      // Remove rendered dom
      parentDom.removeChild(instance.dom);

      return null;
    } else if (instance.element.type === element.type) {
      /*
    Fiber way
    - All nodes stays still only props and children updated.  
    */
      // Update previous node's props
      updateDomProperties(instance.dom, instance.element.props, element.props);
      // Update child tree of node
      instance.childInstances = reconcileChildren(instance, element);
      instance.element = element;

      return instance;
    }
    // If new dom is totally different
    else {
      // Replace with new instance
      const newInstance = eventualise(element);
      parentDom.replaceChild(newInstance.dom, instance.dom);

      return newInstance;
    }
  }

  function reconcileChildren(instance, element) {
    const { dom, childInstances } = instance;
    const {
      props: { children: nextChildElements = [] },
    } = element;
    const newChildInstances = [];

    // Iteration count for previous children count vs next children count
    const iterCount = Math.max(childInstances.length, nextChildElements.length);

    for (let i = 0; i < iterCount; i++) {
      // Create a new child instance with new children
      const newChildInstance = reconcile(
        dom,
        childInstances[i],
        nextChildElements[i]
      );

      if (newChildInstance !== null) newChildInstances.push(newChildInstance);
    }
    return newChildInstances;
  }

  function eventualise(element) {
    const { type, props } = element;

    // Create DOM element
    const isTextElement = type === "TEXT";
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);

    updateDomProperties(dom, [], props);

    // Eventualise children
    const { children = [] } = props;
    const childInstances = children.map(eventualise);

    // Append to parent node
    childInstances.forEach(({ dom: childDom }) => dom.appendChild(childDom));

    return { dom, element, childInstances };
  }

  function isListener(prop) {
    return prop.startsWith("on");
  }

  function isAttribute(prop) {
    return !isListener(prop) && prop !== "children";
  }

  function updateDomProperties(dom, prevProps, nextProps) {
    const trimListener = (listener) => listener.toLowerCase().substr(2);

    // Remove previous event listeners
    Object.keys(prevProps)
      .filter(isListener)
      .forEach((listener) => {
        dom.removeEventListener(trimListener(listener), prevProps[listener]);
      });

    // Add new event listeners
    Object.keys(nextProps)
      .filter(isListener)
      .forEach((listener) => {
        dom.addEventListener(trimListener(listener), nextProps[listener]);
      });

    // Remove previous attributes
    Object.keys(prevProps)
      .filter(isAttribute)
      .forEach((attr) => {
        dom[attr] = null;
      });

    // Set updated attributes
    Object.keys(nextProps)
      .filter(isAttribute)
      .forEach((attr) => {
        dom[attr] = nextProps[attr];
      });
  }

  function isChildNullorFalse(child) {
    return child != null && child !== false;
  }

  function createElement(type, settings, ...childNodes) {
    const props = Object.assign({}, settings);
    const children = childNodes.length > 0 ? [].concat(...childNodes) : [];

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

  return {
    render,
    createElement,
  };
}

export const DombulDOM = DOM();
