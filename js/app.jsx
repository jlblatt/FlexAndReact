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
    e.stopPropagation();
  }, //selectElement

  render: function() {
    return(
      <div id="main">
        <div className="col sm">
          <Controls changeContainerCSS={this.changeContainerCSS} addElement={this.addElement} element={this.state.elements[this.state.selected]} />
        </div>
        <div className="col lg">
          <Container containerCSS={this.state.containerCSS} selectElement={this.selectElement} elements={this.state.elements} selected={this.state.selected} />
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

        <ContainerControls changeContainerCSS={this.props.changeContainerCSS} />

        <ElementControls element={this.props.element} />

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
      <div className="panel container-settings">
        <h4 className="title">Container Settings</h4>
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
      </div>
    )
  }

}); //class ContainerControls



var ElementControls = React.createClass({

  render: function() {
    if(!this.props.element)
      return(
        <div className="panel container-settings">
          <h4 className="title">Element Settings</h4>
          <div className="no-selection">No element selected!</div>
        </div>
      )

    else
      return(
        <div className="panel container-settings">
          <h4 className="title">Element Settings <span>({this.props.element.order + 1})</span></h4>
          <div className="control-set">
            <div className="control text">
              <label>flex-grow:
                <input type="number" min="0" data-css="flexGrow" />
              </label>
            </div>
            <div className="control text">
              <label>flex-shrink:
                <input type="number" min="0" data-css="flexShrink" />
              </label>
            </div>
            <div className="control text">
              <label>flex-basis:
                <input type="text" data-css="flexBasis" />
              </label>
            </div>
            <div className="control select">
              <label>align-self:
                <select data-css="alignSelf">
                  <option value="auto">auto</option>
                  <option value="flex-start">flex-start</option>
                  <option value="flex-end">flex-end</option>
                  <option value="center">center</option>
                  <option value="baseline">baseline</option>
                  <option value="stretch">stretch</option>
                </select>
              </label>
            </div>
            <div></div>
            <div className="control text">
              <label>content:
                <textarea></textarea>
              </label>
            </div>
          </div>
        </div>
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

    var props = this.props;

    return(

      <div id="container" style={containerStyle} onClick={props.selectElement.bind(null, null)} >

        {this.props.elements.map(function(element, i){

          var elementStyle = {
            order: element.order,
            flexGrow: element.flexGrow,
            flexShrink: element.flexShrink,
            flexBasis: element.flexBasis,
            alignSelf: element.alignSelf
          }

          var className = props.selected == element.order ? 'element selected' : 'element';

          return (
            <div className={className} style={elementStyle} key={i}>
              <div className="wrap" onClick={props.selectElement.bind(null, element.order)}>
                <div className="props">
                  <span className="order">#{element.order + 1}</span>
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
