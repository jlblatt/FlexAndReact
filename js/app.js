var App = React.createClass({displayName: "App",

  render: function() {
    return(
      React.createElement("div", {id: "main"}, 
        React.createElement("div", {className: "col sm"}, 
          React.createElement("div", {id: "controls"}

          )
        ), 
        React.createElement("div", {className: "col lg"}, 
          React.createElement("div", {id: "canvas"}

          )
        )
      )
    );
  }

}); //class app



ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('app')
);