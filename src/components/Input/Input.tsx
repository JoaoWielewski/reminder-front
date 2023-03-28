import './styles.css';

type InputType = {
  type: string;
  title: string;
  error: string | undefined;
  register: any;
  disabled: boolean;
  defaultValue?: string | number;
  optionalErrorReference?: string;
  onChangeFunction?: Function;
}

function Input(props: InputType) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChangeFunction) {
      props.onChangeFunction(event.target.value);
    }
  };

  return (
      <div className="input-div">
        <input type={props.type} className="input input-title" placeholder=" " disabled={props.disabled} {...props.register} onChange={handleChange} defaultValue={props.defaultValue}/>
        <p className="input-p p-title">{props.title}</p>
        <p className="error-p">{props.error}</p>
        <p className={`error-p ${props.optionalErrorReference}-error`}></p>
      </div>
  );
}

export default Input;