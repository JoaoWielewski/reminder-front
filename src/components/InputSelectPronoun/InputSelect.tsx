import './styles.css';

type InputSelectType = {
  title: string;
  error: string | undefined;
  register: any;
  disabled: boolean;
  defaultValue?: string | number;
  optionalErrorReference?: string;
  onChangeFunction?: Function;
}

function InputSelectPronoun(props: InputSelectType) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeFunction) {
      props.onChangeFunction(event.target.value);
    }
  };

  return (
    <>
    <div className='input-select-title-pronoun'>Sexo</div>
      <nav>
        <input type="radio" className='radio-input' id="x1" name="x" value="M" onChange={handleChange}/>
        <label htmlFor="x1">Masculino</label>

        <input type="radio" className='radio-input' id="x2" name="x" value="F" onChange={handleChange}/>
        <label htmlFor="x2">Feminino</label>
      </nav>
      <p className="error-p-select">{props.error}</p>
    </>
  );
}

export default InputSelectPronoun;