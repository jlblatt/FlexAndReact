
var App = React.createClass({

  render: function() {
    return(
      <div id="main">
        <div className="col sm">
          <div id="controls">

          </div>
        </div>
        <div className="col lg">
          <div id="canvas">

          </div>
        </div>
      </div>
    );
  }

}); //class app



ReactDOM.render(
  <App />,
  document.getElementById('app')
);
