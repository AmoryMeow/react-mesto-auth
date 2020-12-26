function Login() {
  return (

    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input className="login__input login__input_type_email" placeholder="Email"></input>
        <input className="login__input login__input_type_password" placeholder="Пароль"></input>
        <button className="login__submit">Войти</button>
      </form>
    </section>

  )
}

export default Login;