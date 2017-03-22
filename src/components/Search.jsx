import React from 'react';

const Search = ({filter})=>{

  var input;
  return(
    <div className="search">
        <div className="input">
          <input type="text" placeholder = 'Search By Game Name'
            ref = {
                node => {
                  input = node
                }
              }
              onChange = {
                () => {
                  filter(input.value);
                }
              }
            />
          <label></label>
        </div>
    </div>
  );


}


export default Search;
