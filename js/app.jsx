var App = React.createClass({

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
      <div id="main">
        <div className="col sm">
          <Controls setAppState={this.setAppState} />
        </div>
        <div className="col lg">
          <Container container_css={this.state.container_css} />
        </div>
      </div>
    );
  }

}); //class App



var Controls = React.createClass({

  render: function() {
    return(
      <div id="controls">
        <div className="header">
          <h1>FlexAndReact</h1>
          <h6>FlexBox Builder Using React.js</h6>
          <p><a target="_blank" href="https://github.com/jlblatt/FlexAndReact">View On Github</a></p>
        </div>
        <div className="panel container-settings">
          <ContainerControls setAppState={this.props.setAppState} />
        </div>
      </div>
    )
  }

}); //class controls



var ContainerControls = React.createClass({

  updateContainer: function(e) {
    var obj = {};
    obj[$(e.target).data('css')] = $(e.target).val();
    this.props.setAppState({ container_css : obj });
  },

  render: function() {
    return(
      <div className="control select">
        {this.context.text}
        <label>flex-direction:
          <select data-css="flexDirection" onChange={this.updateContainer}>
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </label>
      </div>
    )
  }

}); //class ContainerControls



var Container = React.createClass({

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
      <div id="container" style={containerStyle}>

      </div>
    )
  }

}); //class Container



ReactDOM.render(
  <App />,
  document.getElementById('app')
);
