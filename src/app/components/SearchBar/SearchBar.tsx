import { MouseEventHandler } from 'react';
import './styles.css';

type SearchBarType = {
  disabled: boolean;
  onChangeFunction: Function;
  onClickFunction: MouseEventHandler<HTMLButtonElement>;
}

function SearchBar(props: SearchBarType) {
  return (
    <div className="search-div">
      <input className="search-input" placeholder='Search' onChange={(event) => props.onChangeFunction(event.target.value)}></input>
      <button className="search-btn" onClick={props.onClickFunction} disabled={props.disabled}>Search</button>
    </div>
  );
}

export default SearchBar;