import React from "react";

import axios from '../axios';

const FIELDS = {
	EMAIL: "email",
	PASSWORD: "password"
};

function Login() {

	const { EMAIL, PASSWORD } = FIELDS;

	const [values, setValues] = React.useState({
		[EMAIL]: "",
		[PASSWORD]: ""
	});

	const handleChange = ({ target: { value, name } }) => {
		setValues({
			...values,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.post('/login', {
			email: values[EMAIL],
			password: values[PASSWORD]
		});
		console.log(res)
	};

	return (
		<div
			style={{ height: window.innerHeight }}
			className="wrapper"
		>
			<div className="login">
				<div className="login__text">
					<h1>Войдите, чтобы продолжить!</h1>
					<p>Данные для входа вам отправлены</p>
				</div>
				<form
					autoComplete="off"
					className="login__form login-form"
					onSubmit={handleSubmit}
				>
					<div className="login-form__input-border">
						<input
							placeholder="Адрес электронной почты"
							type="email"
							name="email"
							onChange={handleChange}
							value={values[EMAIL]}
						/>
					</div>
					<div className="login-form__input-border">
						<input
							placeholder="Пароль"
							type="password"
							name="password"
							onChange={handleChange}
							value={values[PASSWORD]}
						/>
					</div>
					<button
						className="login__button"
						type="submit"
					>
						Войти
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;