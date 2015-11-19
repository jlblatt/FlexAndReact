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
      },
      elements: [],
      selected: null
    };
  }, //initial state

  changeContainerCSS: function(prop, val) {
    var newState = React.addons.update(this.state, { container_css : { prop : { $set : val } } });
    this.setState(newState);
  }, //changeContainerCSS

  render: function() {
    return(
      <div id="main">
        <div className="col sm">
          <Controls changeContainerCSS={this.changeContainerCSS} selected={this.state.selected}/>
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
          <h1 className="title">FlexAndReact</h1>
          <p className="byline">FlexBox Builder Using React.js [<a target="_blank" href="https://github.com/jlblatt/FlexAndReact">View On Github</a>]</p>
        </div>
        <div className="panel container-settings">
          <h4 className="title">Container Settings</h4>
          <ContainerControls changeContainerCSS={this.props.changeContainerCSS} />
        </div>
        <div className="panel container-settings">
          <h4 className="title">Box Settings</h4>
          <ElementControls selected={this.props.selected}/>
        </div>
        <div className="add">
          <a title="Add Element" onclick={this.addElement}>+</a>
        </div>
      </div>
    )
  }

}); //class controls



var ContainerControls = React.createClass({

  updateContainer: function(e) {
    this.props.changeContainerCSS($(e.target).data('css'), $(e.target).val());
  },

  render: function() {
    return(
      <div className="control-set">
        <div className="control select">
          <label>flex-direction:
            <select data-css="flexDirection" onChange={this.updateContainer}>
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </label>
        </div>
        <div className="control select">
          <label>flex-wrap:
            <select data-css="flexWrap" onChange={this.updateContainer}>
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </label>
        </div>
        <div className="control select">
          <label>justify-content:
            <select data-css="justifyContent" onChange={this.updateContainer}>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
          </label>
        </div>
        <div className="control select">
          <label>align-items:
            <select data-css="alignItems" onChange={this.updateContainer}>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
              <option value="stretch">stretch</option>
            </select>
          </label>
        </div>
        <div className="control select">
          <label>align-content:
            <select data-css="alignContent" onChange={this.updateContainer}>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="stretch" selected>stretch</option>
            </select>
          </label>
        </div>
      </div>
    )
  }

}); //class ContainerControls



var ElementControls = React.createClass({

  render: function() {
    if(this.props.selected === null)
      return(
        <div className="no-selection">No element selected!</div>
      )

    else
      return(
        foo
      )
  }

}); //class ElementControls



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
