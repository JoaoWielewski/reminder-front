import './styles.css';

function FormButton({title}: {title: string}) {
  return (
    <button type="submit" className="form-btn">{title}</button>
  );
}

export default FormButton;