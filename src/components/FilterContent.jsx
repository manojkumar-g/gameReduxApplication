import React from 'react'
import data from './../data.js';
import {connect} from 'react-redux';
import {addAllFilters,clearAllFilters,addSingleFilter,removeSingleFilter} from './../actions'
class Content extends React.Component{
  constructor(props) {
    super(props);
    this.state ={
      nav : 'flatform',
      flatforms :data.flatforms.map(
        (flatform,key) => ({key : 'flatform-'+key, name : flatform , isSelected: false})
      ),
      genres :data.genres.map(
        (genre,key) => ({key : 'genre-'+key,name : genre , isSelected: false})
      ),
      score :0,
      noScore : true,
      ec :true,
      noEc : true
    }
  }
  toggleFilter = (selectedKey) =>{
    var {flatforms} = this.state;
    this.setState({
      flatforms : flatforms.map(
        ({key,isSelected,name}) => selectedKey === key ? ({key,name,isSelected :!isSelected}) : ({key,name,isSelected})
    )})

  }
  toggleGenre = (selectedKey) =>{
    var {genres} = this.state;
    this.setState({
      genres : genres.map(
        ({key,isSelected,name}) => selectedKey === key ? ({key,name,isSelected :!isSelected}) : ({key,name,isSelected})
    )})

  }
  changeScore = (e) => {
    this.setState({score : e.target.value,noScore:false})};
  toggleNoScore = () =>{
    this.setState({noScore : !this.state.noScore,score:0})
  }
  toggleNoEC = () =>{
    this.setState({noEc : !this.state.noEc});
  }
  toggleEc = () => {
    this.setState({ec : !this.state.ec});
  }

  clearAll = ()=>{
    var{flatforms,genres,noEc,noScore} = this.state;
    this.setState({
      flatforms : flatforms.map(
        ({key,name}) => ({key,name,isSelected:false})
      ),
      genres : genres.map(
        ({key,name}) => ({key,name,isSelected:false})
      ),
      noEc : true,
      noScore :true,
      score : 0
    });
    this.props.clearAllFilters();
  }
  getData = () => {
    var {nav,flatforms,genres,score} = this.state;
    if(nav === 'flatform'){
      return(
        <ul className="crums">
          {
            flatforms.map(
              ({name,isSelected,key}) =>{
                return(
                  <li
                    key = {key}
                    className = {isSelected ? 'crumActive' : ''}
                    onClick ={
                      () => {
                          this.toggleFilter(key);
                          isSelected ? this.props.removeSingleFilter(name):this.props.addSingleFilter(name)

                      }
                    }
                    >
                    {name}
                  </li>
                );

              }

            )
          }
        </ul>
      )
    }
    else if(nav === 'genre'){
      return(
        <ul className="crums">
          {
            genres.map(
              ({name,isSelected,key}) =>{
                return(
                  <li
                    key = {key}
                    className = {isSelected ? 'crumActive' : ''}
                    onClick ={
                      () => {
                          this.toggleGenre(key)
                          isSelected ? this.props.removeSingleFilter(name):this.props.addSingleFilter(name)
                      }
                    }
                    >
                    {name}
                  </li>
                );

              }

            )
          }
        </ul>
      )
    }
    else if (nav === 'score'){
      return(
        <div className = 'scorediv'>
          <input type="radio" checked = {this.state.noScore} onChange = {this.toggleNoScore}/>No Filter For Score<hr/>
          <input type="range" value = {score} onChange = {this.changeScore} className = 'score'/>
          <h1 id = {this.state.noScore ? 'noScore' : ''}>{score/10}</h1>
        </div>
      )
    }
    else{
      return (
        <div className="scorediv">
          <input type="radio" checked = {this.state.noEc} onChange = {this.toggleNoEC}/>No Filter For Editor-Choise<hr/>
          <input type="radio" checked = {this.state.ec} onChange = {this.toggleEc}
            disabled = {this.state.noEc ? 'disabled' : ''}
            id = 'ec'
          />
          <label htmlFor="ec">Editor-Choise</label>
        </div>
      )
    }
  }
  changeNav = nav => this.setState({nav})
  onApplay = () =>{
    var {flatforms,genres,score,noScore,noEc,ec} = this.state;
    var obj = {
      flatforms: flatforms.filter(({isSelected}) => isSelected).map(({name}) =>name ),
      genres: genres.filter(({isSelected}) => isSelected).map(({name}) =>name ),
      score : noScore ? 'NA' : ''+score,
      Ec : noEc ? 'NA' : ''+ec
    }
    this.props.toggleModel();
    this.props.addAllFilters(obj);
  }
  render(){
    var {nav} = this.state
    return(
      <div className = 'modelview'>
        <section className="modelheader">
          <span className="clear" onClick = {this.clearAll}>Clear All</span>
          <span className="apply" onClick = {this.onApplay}><span>Apply</span></span>
        </section>
        <section className="results">
          {this.getData()}
        </section>

        <footer className="nav">
          <ul>
            <li className = {nav === 'flatform' ? 'filteractive' : ''}
              onClick = {
                () => this.changeNav('flatform')
              }
              >
                Flatform
            </li>
            <li
              className = {nav === 'score' ? 'filteractive' : ''}
              onClick = {
                () => this.changeNav('score')
              }>
              Score
            </li>
            <li
              className = {nav === 'genre' ? 'filteractive' : ''}
              onClick = {
                () => this.changeNav('genre')
              }>
              genre
            </li>
            <li
              className = {nav === 'ec' ? 'filteractive' : ''}
              onClick = {
                () => this.changeNav('ec')
              }>
              Editor-Choise
            </li>
          </ul>
        </footer>
      </div>
    );
  }
}

export default connect(
  undefined,
  ({addAllFilters,clearAllFilters,addSingleFilter,removeSingleFilter})
)(Content)
