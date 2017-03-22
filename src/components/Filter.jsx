import React from 'react';
import {Motion,spring,presets,TransitionMotion} from 'react-motion';
import FilterContent from './FilterContent.jsx'
export default class Filter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modelShow : false
    }
  }
  toggleModel = () => this.setState({
    modelShow : !this.state.modelShow
  })
  willEnter(){
      return{
          width : 0,
          opacity : 1
      }
  }
  willLeave(){
      return{
          width : spring(0),
          opacity : spring(0)
      }
  }
  getDefaultStyles = () => {
      var x = this.props.allFilters.map(
          (filter,key) => ({data:filter,key:'allFilters'+key,style:{width:0,opacity:1}})
      );
      console.log(x);
  }
  getStyles = ()=>{
      var x = this.props.allFilters.map(
          (filter,key) => ({data :filter,key:'allFilters'+key,style:{width:spring(90,presets.gentle),opacity:spring(1,presets.gentle)}})
      )
      return x;

  }
  render(){
    return(
      <div>
        <div className="filterbar">
          <div className="filterbutton">
            <input type="radio" id = 'filter' checked = {this.state.modelShow}
              onChange = {this.toggleModel}
            />
            <label htmlFor="filter">
              <span className = 'filterspan'>Filters</span>
              <i className="fa fa-filter fa-2x" aria-hidden="true"></i>
            </label>

          </div>
          <div className="filterresults">

            <TransitionMotion
                willLeave = {this.willLeave}
                willEnter = {this.willEnter}
                defaultStyles = {this.getDefaultStyles()}
                styles={this.getStyles()}
            >
            {
                styles =>
                    <ul>
                    {

                        styles.map(
                            filter => <li key = {filter.key} style ={{width : filter.style.width + 'px', opacity : filter.style.opacity}}>
                                            {filter.data}
                                     </li>
                        )
                    }

                    </ul>
            }
            </TransitionMotion>
          </div>
        </div>

        <Motion style={{
          x: spring(this.state.modelShow ? 60 : 0,presets.wobbly),
          opacity : spring(this.state.modelShow ? 1:0)
        }}>
        {({x,opacity}) =>

          <div>
            <div id="filtermodel" style={{
              height :`${x}vh`
            }} >
            <div className="content" style = {{opacity}}>
                <FilterContent toggleModel = {this.toggleModel}/>
            </div>

          </div>
          </div>
        }
      </Motion>





      </div>

    )
  }
}
