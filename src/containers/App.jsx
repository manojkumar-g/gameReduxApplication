import React from 'react';
import Search from './../components/Search.jsx';
import Filter from './../components/Filter.jsx';
import {connect} from 'react-redux';
import {getGames,filterByName,clearAllFilters} from './../actions';
import Gallary from './Gallary.jsx';
class App extends React.Component {
  constructor(props) {
      super(props);
  }
  componentDidMount(){
    this.props.getGames();
  }
  render(){
    return(
      <div className="app">
        <header>
          <h1 className="title" onClick ={this.props.clearAllFilters}>
            <i className="fa fa-gamepad fa-2x icon " aria-hidden="true"></i>
            Games Arena
          </h1>
        </header>
        <main>
          <section>
            <Search filter = {this.props.filterByName}/>
            <Filter allFilters = {this.props.allFilters}/>
          </section>
            <Gallary/>
        </main>
      </div>
    );
  }
}

export default connect(
  state => ({allFilters :state.gameData.allFilters}),
  {getGames,filterByName,clearAllFilters}
)(App)
