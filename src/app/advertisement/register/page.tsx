import './styles.css';
import LoginContainer from '@/app/components/LoginContainer/page';

function Register() {
  return (
    <LoginContainer>
      <h1 className="register-h1">Add your book</h1>
      <div className="register-input-div">
        <input type="text" className="register-input register-name" placeholder=" " />
        <p className="register-p register-p-name">Name</p>
      </div>
      <div className="register-input-div">
        <input type="text" className="register-input register-price" placeholder=" " />
        <p className="register-p register-p-price">Price</p>
      </div>
      <div className="register-input-div">
        <input type="text" className="register-input register-img-src" placeholder=" " />
        <p className="register-p register-p-img-src">Image source</p>
      </div>
      <button className="register-btn">Add</button>
    </LoginContainer>
  );
}

export default Register;
