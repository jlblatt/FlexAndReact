var App = React.createClass({

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
      counter: 0,
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

    if(!this.state.lastElementProps)
    {
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
    this.setState(newState);

  }, //addElement

  render: function() {
    return(
      <div id="main">
        <div className="col sm">
          <Controls changeContainerCSS={this.changeContainerCSS} addElement={this.addElement} selected={this.state.selected}/>
        </div>
        <div className="col lg">
          <Container containerCSS={this.state.containerCSS} elements={this.state.elements} />
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
          <a title="Add Element" onClick={this.props.addElement}>+</a>
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
              <option value="stretch">stretch</option>
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
      flexDirection: this.props.containerCSS.flexDirection,
      flexWrap: this.props.containerCSS.flexWrap,
      justifyContent: this.props.containerCSS.justifyContent,
      alignItems: this.props.containerCSS.alignItems,
      alignContent: this.props.containerCSS.alignContent
    };

    return(

      <div id="container" style={containerStyle}>

        {this.props.elements.map(function(element, i){

          var elementStyle = {
            order: element.order,
            flexGrow: element.flexGrow,
            flexShrink: element.flexShrink,
            flexBasis: element.flexBasis,
            alignSelf: element.alignSelf
          }

          return (
            <div className="element" style={elementStyle} key={i}>
              <div className="wrap">
                <div className="props">
                  <span className="order">{element.order}</span>
                  <span className="flex">{element.flexGrow} {element.flexShrink} {element.flexBasis} | {element.alignSelf}</span>
                </div>
                <div className="content">{element.content}</div>
              </div>
            </div>
          )

        })}

      </div>

    )
  } //render

}); //class Container



ReactDOM.render(
  <App />,
  document.getElementById('app')
);
