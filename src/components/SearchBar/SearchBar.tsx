import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEventHandler, MouseEventHandler } from 'react';
import './styles.css';

type SearchBarType = {
  disabled: boolean;
  onChangeFunction: Function;
  onKeyDownFunction: KeyboardEventHandler<HTMLInputElement>;
  searched: boolean
  clearSearchFunction: MouseEventHandler<SVGSVGElement>
}

function SearchBar(props: SearchBarType) {
  return (
    <div className='search-div'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="glass-icon" />
      <input className="search-input" id='input' placeholder='Buscar por nome ou celular' onChange={(event) => props.onChangeFunction(event.target.value)} onKeyDown={props.onKeyDownFunction}></input>
      {props.searched ? <FontAwesomeIcon icon={faXmark} className="xmark-icon" onClick={props.clearSearchFunction}/> : <></>}
    </div>
  );
}

export default SearchBar;