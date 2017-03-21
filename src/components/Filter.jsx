import React from 'react';
import {Motion,spring,presets} from 'react-motion';
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
  render(){
    return(
      <div>
        <div className="filterbar">
          <div className="filterbutton">
            <input type="radio" id = 'filter' checked = {this.state.modelShow}
              onChange = {this.toggleModel}
            />
            <label htmlFor="filter">
              Filters
              <i className="fa fa-filter fa-2x" aria-hidden="true"></i>
            </label>

          </div>
          <div className="filterresults">
            <ul>
              {
                this.props.allFilters.map(
                  (filter,key) =>
                      <li key = {'Filter'+key}>
                        {filter}
                      </li>
                )
              }
            </ul>
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
