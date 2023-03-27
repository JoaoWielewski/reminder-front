import './styles.css';

function FormButton({title, disabled}: {title: string, disabled: boolean}) {
  return (
    <button type="submit" className="form-btn" disabled={disabled}>{title}</button>
  );
}

export default FormButton;