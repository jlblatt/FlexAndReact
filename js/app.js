var App = React.createClass({displayName: "App",

  getDefaultProps: function() {
    return {

    };
  }, //default props

  getInitialState: function() {
    return {
      containerCSS : {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "flex-start"
      },
      elements: [],
      selected: null,
      counter: 1,
      lastElementProps: null
    };
  }, //initial state

  changeContainerCSS: function(prop, val) {
    var stateObj = { containerCSS : {} }; stateObj.containerCSS[prop] = { $set : val };
    var newState = React.addons.update(this.state, stateObj);
    this.setState(newState);
  }, //changeContainerCSS

  addElement: function() {

    var newElement;

    if(!this.state.lastElementProps) {
      newElement = {
        order: this.state.counter++,
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "auto",
        alignSelf: "auto",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      };
    }

    else newElement = this.state.lastElementProps;

    var newState = React.addons.update(this.state, { elements : { $push : [newElement] } });
    newState.selected = newElement.order;
    this.setState(newState);

  }, //addElement

  selectElement: function(which, e) {
    this.setState({selected: which});
  }, //selectElement

  render: function() {
    return(
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {className: "col sm"}, 
          React.createElement(Controls, {changeContainerCSS: this.changeContainerCSS, addElement: this.addElement, selected: this.state.selected})
        ), 
        React.createElement("div", {className: "col lg"}, 
          React.createElement(Container, {containerCSS: this.state.containerCSS, selectElement: this.selectElement, elements: this.state.elements, selected: this.state.selected})
        )
      )
    );
  }

}); //class App



var Controls = React.createClass({displayName: "Controls",

  render: function() {
    return(
      React.createElement("div", {id: "controls"}, 
        React.createElement("div", {className: "header"}, 
          React.createElement("h1", {className: "title"}, "FlexAndReact"), 
          React.createElement("p", {className: "byline"}, "FlexBox Builder Using React.js [", React.createElement("a", {target: "_blank", href: "https://github.com/jlblatt/FlexAndReact"}, "View On Github"), "]")
        ), 
        React.createElement("div", {className: "panel container-settings"}, 
          React.createElement("h4", {className: "title"}, "Container Settings"), 
          React.createElement(ContainerControls, {changeContainerCSS: this.props.changeContainerCSS})
        ), 
        React.createElement("div", {className: "panel container-settings"}, 
          React.createElement("h4", {className: "title"}, "Box Settings"), 
          React.createElement(ElementControls, {selected: this.props.selected})
        ), 
        React.createElement("div", {className: "add"}, 
          React.createElement("a", {title: "Add Element", onClick: this.props.addElement}, "+")
        )
      )
    )
  }

}); //class controls



var ContainerControls = React.createClass({displayName: "ContainerControls",

  updateContainer: function(e) {
    this.props.changeContainerCSS($(e.target).data('css'), $(e.target).val());
  },

  render: function() {
    return(
      React.createElement("div", {className: "control-set"}, 
        React.createElement("div", {className: "control select"}, 
          React.createElement("label", null, "flex-direction:", 
            React.createElement("select", {"data-css": "flexDirection", onChange: this.updateContainer}, 
              React.createElement("option", {value: "row"}, "row"), 
              React.createElement("option", {value: "row-reverse"}, "row-reverse"), 
              React.createElement("option", {value: "column"}, "column"), 
              React.createElement("option", {value: "column-reverse"}, "column-reverse")
            )
          )
        ), 
        React.createElement("div", {className: "control select"}, 
          React.createElement("label", null, "flex-wrap:", 
            React.createElement("select", {"data-css": "flexWrap", onChange: this.updateContainer}, 
              React.createElement("option", {value: "nowrap"}, "nowrap"), 
              React.createElement("option", {value: "wrap"}, "wrap"), 
              React.createElement("option", {value: "wrap-reverse"}, "wrap-reverse")
            )
          )
        ), 
        React.createElement("div", {className: "control select"}, 
          React.createElement("label", null, "justify-content:", 
            React.createElement("select", {"data-css": "justifyContent", onChange: this.updateContainer}, 
              React.createElement("option", {value: "flex-start"}, "flex-start"), 
              React.createElement("option", {value: "flex-end"}, "flex-end"), 
              React.createElement("option", {value: "center"}, "center"), 
              React.createElement("option", {value: "space-between"}, "space-between"), 
              React.createElement("option", {value: "space-around"}, "space-around")
            )
          )
        ), 
        React.createElement("div", {className: "control select"}, 
          React.createElement("label", null, "align-items:", 
            React.createElement("select", {"data-css": "alignItems", onChange: this.updateContainer}, 
              React.createElement("option", {value: "flex-start"}, "flex-start"), 
              React.createElement("option", {value: "flex-end"}, "flex-end"), 
              React.createElement("option", {value: "center"}, "center"), 
              React.createElement("option", {value: "baseline"}, "baseline"), 
              React.createElement("option", {value: "stretch"}, "stretch")
            )
          )
        ), 
        React.createElement("div", {className: "control select"}, 
          React.createElement("label", null, "align-content:", 
            React.createElement("select", {"data-css": "alignContent", onChange: this.updateContainer}, 
              React.createElement("option", {value: "flex-start"}, "flex-start"), 
              React.createElement("option", {value: "flex-end"}, "flex-end"), 
              React.createElement("option", {value: "center"}, "center"), 
              React.createElement("option", {value: "space-between"}, "space-between"), 
              React.createElement("option", {value: "space-around"}, "space-around"), 
              React.createElement("option", {value: "stretch"}, "stretch")
            )
          )
        )
      )
    )
  }

}); //class ContainerControls



var ElementControls = React.createClass({displayName: "ElementControls",

  render: function() {
    if(this.props.selected === null)
      return(
        React.createElement("div", {className: "no-selection"}, "No element selected!")
      )

    else
      return(
        React.createElement("div", {className: "control-set"}, 
          React.createElement("div", {className: "control text"}, 
            React.createElement("label", null, "flex-grow:", 
              React.createElement("input", {type: "number", min: "0", "data-css": "flexGrow"})
            )
          ), 
          React.createElement("div", {className: "control text"}, 
            React.createElement("label", null, "flex-shrink:", 
              React.createElement("input", {type: "number", min: "0", "data-css": "flexShrink"})
            )
          ), 
          React.createElement("div", {className: "control text"}, 
            React.createElement("label", null, "flex-basis:", 
              React.createElement("input", {type: "text", "data-css": "flexBasis"})
            )
          ), 
          React.createElement("div", {className: "control select"}, 
            React.createElement("label", null, "align-self:", 
              React.createElement("select", {"data-css": "alignSelf"}, 
              "align-self: auto | flex-start | flex-end | center | baseline | stretch", 
                React.createElement("option", {value: "auto"}, "auto"), 
                React.createElement("option", {value: "flex-start"}, "flex-start"), 
                React.createElement("option", {value: "flex-end"}, "flex-end"), 
                React.createElement("option", {value: "center"}, "center"), 
                React.createElement("option", {value: "baseline"}, "baseline"), 
                React.createElement("option", {value: "stretch"}, "stretch")
              )
            )
          )
        )
      )
  }

}); //class ElementControls



var Container = React.createClass({displayName: "Container",

  render: function() {

    var containerStyle = {
      display: "flex",
      flexDirection: this.props.containerCSS.flexDirection,
      flexWrap: this.props.containerCSS.flexWrap,
      justifyContent: this.props.containerCSS.justifyContent,
      alignItems: this.props.containerCSS.alignItems,
      alignContent: this.props.containerCSS.alignContent
    };

    var props = this.props;

    return(

      React.createElement("div", {id: "container", style: containerStyle}, 

        this.props.elements.map(function(element, i){

          var elementStyle = {
            order: element.order,
            flexGrow: element.flexGrow,
            flexShrink: element.flexShrink,
            flexBasis: element.flexBasis,
            alignSelf: element.alignSelf
          }

          var className = props.selected == element.order ? 'element selected' : 'element';

          return (
            React.createElement("div", {className: className, style: elementStyle, key: i}, 
              React.createElement("div", {className: "wrap", onClick: props.selectElement.bind(null, element.order)}, 
                React.createElement("div", {className: "props"}, 
                  React.createElement("span", {className: "order"}, element.order), 
                  React.createElement("span", {className: "flex"}, element.flexGrow, " ", element.flexShrink, " ", element.flexBasis, " | ", element.alignSelf)
                ), 
                React.createElement("div", {className: "content"}, element.content)
              )
            )
          )

        })

      )

    )
  } //render

}); //class Container



ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('app')
);