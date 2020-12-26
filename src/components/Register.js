import { NavLink } from "react-router-dom";

function Register() {
  return (

    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form">
        <input className="login__input login__input_type_email" placeholder="Email"></input>
        <input className="login__input login__input_type_password" placeholder="Пароль"></input>
        <button className="login__submit">Зарегистрироваться</button>
        <p className="login__text">Уже зарегистрированы? <NavLink className="login__link" to="/sign-in">Войти</NavLink></p>
      </form>
    </section>

  )
}

export default Register;