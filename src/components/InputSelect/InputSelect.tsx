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

function InputSelect(props: InputSelectType) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeFunction) {
      props.onChangeFunction(event.target.value);
    }
  };

  return (
    <>
    <div className='input-select-title'>Selecione uma das opções</div>
      <nav>
        <input type="radio" className='radio-input' id="x1" name="x" value="day" onChange={handleChange}/>
        <label htmlFor="x1">Dias</label>

        <input type="radio" className='radio-input' id="x2" name="x" value="month" onChange={handleChange}/>
        <label htmlFor="x2">Meses</label>

        <input type="radio" className='radio-input' id="x3" name="x" value="year" onChange={handleChange}/>
        <label htmlFor="x3">Anos</label>
      </nav>
      <p className="error-p-select">{props.error}</p>
    </>
  );
}

export default InputSelect;