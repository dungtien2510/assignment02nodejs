import {
  Form,
  NavLink,
  redirect,
  useActionData,
  useSearchParams,
} from "react-router-dom";
import style from "./Auth.module.css";
import { useEffect, useState } from "react";
function Auth() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const [valueUser, setValueUser] = useState("");
  const [valuePass, setValuePass] = useState("");

  const isLogin = searchParams.get("mode");
  const response = useActionData();
  const errorStatus = response ? response.status : undefined;

  useEffect(() => {
    if (errorStatus) {
      setError(errorStatus);
    } else {
      setError(false);
    }
  }, [response]);
  console.log(isLogin);
  const onChangeUser = (e) => {
    setError(false);
    setValueUser(e.target.value);
  };
  const onChangePassword = (e) => {
    setError(false);
    setValuePass(e.target.value);
  };

  //submit form
  const submitHandler = () => {
    if (!error) {
      setValueUser("");
      setValuePass("");
    }
  };

  // const token = response? response.token: undefined;
  // console.log(token)
  console.log(error);
  return (
    <div className={style.form}>
      <h1 className={style.header}>{isLogin}</h1>
      <Form
        className={style["form-input"]}
        method="POST"
        onSubmit={submitHandler}
      >
        <div>
          <input
            onChange={onChangeUser}
            value={valueUser}
            name="userName"
            type="text"
            placeholder="User"
            className={
              error === 403 || error === 402 ? style.isValid : undefined
            }
            required
          />
          {error === 403 && (
            <p className={style.messageError}>{response.message}</p>
          )}
        </div>

        <input
          name="password"
          onChange={onChangePassword}
          value={valuePass}
          type="password"
          placeholder="Password"
          className={error === 402 ? style.isValid : undefined}
          required
        />
        {error === 402 && (
          <p className={style.messageError}>{response.message}</p>
        )}
        <button className={style.button}>{isLogin}</button>
      </Form>
    </div>
  );
}

export default Auth;
