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

  updateAppState: function(updatedState) {
    var newState = React.addons.update(this.state, updatedState);
    this.setState(newState);
  }, //updateAppState

  render: function() {
    return(
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {className: "col sm"}, 
          React.createElement(Controls, {updateAppState: this.updateAppState})
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
          React.createElement("h1", {className: "title"}, "FlexAndReact"), 
          React.createElement("p", {className: "byline"}, "FlexBox Builder Using React.js [", React.createElement("a", {target: "_blank", href: "https://github.com/jlblatt/FlexAndReact"}, "View On Github"), "]")
        ), 
        React.createElement("div", {className: "panel container-settings"}, 
          React.createElement("h4", {className: "title"}, "Container Settings"), 
          React.createElement(ContainerControls, {updateAppState: this.props.updateAppState})
        )
      )
    )
  }

}); //class controls



var ContainerControls = React.createClass({displayName: "ContainerControls",

  updateContainer: function(e) {
    var obj = {};
    obj[$(e.target).data('css')] = {$set: $(e.target).val()};
    this.props.updateAppState({ container_css : obj });
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
              React.createElement("option", {value: "stretch", selected: true}, "stretch")
            )
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