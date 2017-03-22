import React from 'react';
import {connect} from 'react-redux';
import Game from '../components/Game.jsx'
import slice from 'lodash/slice';
import {sping,TransitionMotion,presets} from 'react-motion'
class Gallary extends React.Component {
  constructor(props) {
    super(props);
    this.state ={visibleData : [],page:1,pageData:[]};
  }
  componentWillReceiveProps(nextProps){
    if(nextProps !== undefined){
      this.setState({pageData: nextProps.data.slice(0,6)})
    }
  }
  pageButton = () =>{
    let pageCount = Math.ceil(this.props.data.length / 6);
    let pages = [];
    const Onclick = (p) => {
      var content = slice(this.props.data,(p-1)*6,((p-1)*6)+6);
      this.setState({page:p,pageData:content});
    }
    for(let i=1 ; i <= pageCount ; i++){
      if(i == this.state.page){
        pages.push(<li className="active" key = {i} onClick ={()=>{Onclick(i)}}>{i}</li>);
      }
      else{
        pages.push(<li key = {i} onClick ={()=>{Onclick(i)}}>{i}</li>);
      }
    }
    return(
      <ul className="pagination">
        {pages}
      </ul>
    )
  }

  render(){
    var {pageData} = this.state;
    return(
      <section className="games">
         {pageData.length === 0 && <h1>No Games Found</h1>}

        {
          pageData.map(
            (game,key) =>
                <Game game = {game} key ={key}/>
          )
        }
        <div className="pages">
          <this.pageButton/>
        </div>

      </section>
    );

  }
}
export default connect(
  state => ({data:state.gameData.visibleGames}),
  undefined
)(Gallary)
