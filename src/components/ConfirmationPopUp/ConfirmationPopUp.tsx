import './styles.css';

type PopUpType = {
  title: string,
  content: string,
  trigger: boolean,
  setTrigger: Function,
  onDialog: Function
}

function ConfirmationPopUp(props: PopUpType) {

  const handleYes = () => {
    props.onDialog(true);
    props.setTrigger(false);
  };

  const handleNo = () => {
    props.onDialog(false);
    props.setTrigger(false);
  };

  return (props.trigger) ? (
      <section className="popup">
        <div className="popup-inner">
          <h1 className="popup-title">{props.title}</h1>
          <h2 className="popup-content">{props.content}</h2>
          <button className="confirmation-popup-btn" onClick={handleYes}>Sim</button>
          <button className="confirmation-popup-btn" onClick={handleNo}>Não</button>
        </div>
      </section>
  ) : <section></section>;
}

export default ConfirmationPopUp;