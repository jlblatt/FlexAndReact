var App = React.createClass({displayName: "App",

  getDefaultProps: function() {
    return {

    };
  }, //default props

  getInitialState: function() {
    return {
      container_css : {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "stretch"
      }
    };
  }, //initial state

  setAppState: function(newState) {
    this.setState(newState);
  }, //setAppState

  render: function() {
    return(
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {className: "col sm"}, 
          React.createElement(Controls, {setAppState: this.setAppState})
        ), 
        React.createElement("div", {className: "col lg"}, 
          React.createElement(Container, {container_css: this.state.container_css})
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
          React.createElement("h1", null, "FlexAndReact"), 
          React.createElement("h6", null, "FlexBox Builder Using React.js"), 
          React.createElement("p", null, React.createElement("a", {target: "_blank", href: "https://github.com/jlblatt/FlexAndReact"}, "View On Github"))
        ), 
        React.createElement("div", {className: "panel container-settings"}, 
          React.createElement(ContainerControls, {setAppState: this.props.setAppState})
        )
      )
    )
  }

}); //class controls



var ContainerControls = React.createClass({displayName: "ContainerControls",

  updateContainer: function(e) {
    var obj = {};
    obj[$(e.target).data('css')] = $(e.target).val();
    this.props.setAppState({ container_css : obj });
  },

  render: function() {
    return(
      React.createElement("div", {className: "control select"}, 
        this.context.text, 
        React.createElement("label", null, "flex-direction:", 
          React.createElement("select", {"data-css": "flexDirection", onChange: this.updateContainer}, 
            React.createElement("option", {value: "row"}, "row"), 
            React.createElement("option", {value: "row-reverse"}, "row-reverse"), 
            React.createElement("option", {value: "column"}, "column"), 
            React.createElement("option", {value: "column-reverse"}, "column-reverse")
          )
        )
      )
    )
  }

}); //class ContainerControls



var Container = React.createClass({displayName: "Container",

  render: function() {
    var containerStyle = {
      display: "flex",
      flexDirection: this.props.container_css.flexDirection,
      flexWrap: this.props.container_css.flexWrap,
      justifyContent: this.props.container_css.justifyContent,
      alignItems: this.props.container_css.alignItems,
      alignContent: this.props.container_css.alignContent
    };

    return(
      React.createElement("div", {id: "container", style: containerStyle}

      )
    )
  }

}); //class Container



ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('app')
);