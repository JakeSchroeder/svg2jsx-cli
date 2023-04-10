const prettier = require('prettier');
const template = require('lodash.template');

/**
 * React component templates.
 * @readonly
 * @type {Map<string, string>}
 */
const TEMPLATES = {
  class: `
    import React from "react";

    class Icon extends <%= parentComponent %> {
      render() {
        return <%= svg %>;
      }
    }

    export default Icon;
  `,
  functional: `
    export const <%=componentName%>: FC<{className: string}> = ({className}) => {
      return <%= svg %>;
    }
  `,
};

/**
 * Creates React component.
 * @param {string} svg Transformed SVG string.
 * @param {string="functional","class"} config.type Desired component type.
 * @return {string}
 */
function reactify(svg, { type = 'functional', memo }, file) {
  const fileToCamel = file
    .split('.svg')[0]
    .replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    })
    .replaceAll('-', '');
  const componentName = fileToCamel.charAt(0).toUpperCase() + fileToCamel.slice(1);

  const data = {
    parentComponent: memo ? `React.PureComponent` : `React.Component`,
    exportComponent: memo ? `React.memo(${componentName})` : `${componentName}`,
    componentName,
  };

  const compile = template(TEMPLATES[type]);
  const component = compile({
    ...data,
    svg,
  });

  return component;
}

/**
 * Creates React component and formats with Prettier.
 * @param {string} svg Transformed SVG string.
 * @param {Object=} config Component type, SVGO and Prettier config.
 * @return {string}
 */
function format(svg, config, file) {
  const component = reactify(svg, config, file);
  const formatted = prettier.format(component, {
    ...config,
    parser: 'babel',
  });

  return formatted;
}

module.exports = format;
