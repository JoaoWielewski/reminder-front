import InputMask from 'react-input-mask';
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
  mask?: string;
}

function Input(props: InputType) {
  return (
    <div className="input-div">
      <p className='input-title-p'>{props.title}</p>
      {props.mask ? (
        <InputMask
          mask={props.mask}
          defaultValue={props.defaultValue as string}
          disabled={props.disabled}
          className="input input-title"
          placeholder={props.description || props.title}
          {...props.register}
        >
          {(inputProps: any) => <input {...inputProps} type={props.type} />}
        </InputMask>
      ) : (
        <input
          type={props.type}
          className="input input-title"
          placeholder={props.description || props.title}
          disabled={props.disabled}
          autoComplete="off"
          {...props.register}
          defaultValue={props.defaultValue}
        />
      )}
      {props.error && <p className="error-p">{props.error}</p>}
      {props.optionalErrorReference && <p className={`error-p ${props.optionalErrorReference}-error`}></p>}
    </div>
  );
}

export default Input;