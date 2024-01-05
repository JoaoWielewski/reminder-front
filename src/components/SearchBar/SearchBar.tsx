import { MouseEventHandler } from 'react';
import './styles.css';

type SearchBarType = {
  disabled: boolean;
  onChangeFunction: Function;
  onClickFunction: MouseEventHandler<HTMLButtonElement>;
}

function SearchBar(props: SearchBarType) {
  return (
    <div className='search-div advertisement-search-div'>
      <input className="search-input" placeholder='Buscar por paciente' onChange={(event) => props.onChangeFunction(event.target.value)}></input>
      <button className="search-btn" onClick={props.onClickFunction} disabled={props.disabled}>Buscar</button>
    </div>
  );
}

export default SearchBar;