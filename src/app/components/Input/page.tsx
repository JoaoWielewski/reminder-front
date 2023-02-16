import './styles.css';

type InputType = {
  type: string;
  title: string;
  error: any;
  register: any;
  optionalError?: string;
}

function Input(props: InputType) {
  return (
      <div className="input-div">
        <input type={props.type} className="input input-title" placeholder=" " {...props.register}/>
        <p className="input-p p-title">{props.title}</p>
        <p className="error-p">{props.error}</p>
        <p className="error-p email-error">{props.optionalError}</p>
      </div>
  );
}

export default Input;