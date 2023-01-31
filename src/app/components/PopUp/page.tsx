import './styles.css';

type PopUpType = {
  title: string,
  content: string,
  trigger: boolean,
  setTrigger: Function,
}

function PopUp(props: PopUpType) {
  return (props.trigger) ? (
      <section className="popup">
        <div className="popup-inner">
          <h1 className="popup-title">{props.title}</h1>
          <h2 className="popup-content">{props.content}</h2>
          <button className="popup-btn" onClick={() => props.setTrigger(false)}>Close</button>
        </div>
      </section>
  ) : <section></section>;
}

export default PopUp;
