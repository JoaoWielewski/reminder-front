import './styles.css';

function FormButtonCreate({title, disabled}: {title: string, disabled: boolean}) {
  return (
    <button type="submit" className="form-btn-create" disabled={disabled}>{title}</button>
  );
}

export default FormButtonCreate;