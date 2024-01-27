import './styles.css';

type InputType = {
  type: string;
  title: string;
  error: string | undefined;
  register: any;
  disabled: boolean;
  description?: string;
  defaultValue?: string | number;
  optionalErrorReference?: string;
  onChangeFunction?: Function;
}

function Input(props: InputType) {

  return (
      <div className="input-div">
        <p className='input-title-p'>{props.title}</p>
        <input type={props.type} className="input input-title" placeholder={props.description || props.title} disabled={props.disabled} autoComplete="off" {...props.register} defaultValue={props.defaultValue}/>
        <p className="error-p">{props.error}</p>
        <p className={`error-p ${props.optionalErrorReference}-error`}></p>
      </div>
  );
}

export default Input;