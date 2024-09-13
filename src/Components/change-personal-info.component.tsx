import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {RoutesManager} from "../routes/routes";
import {inputTypes, outputTypes} from "../routes/routesTypes"
type Props = {};

type State = {
  firstName: string, 
  lastName: string, 
  email: string,
  password: string,
  confirmPassword: string,
  successful: boolean,
  message: string,
  group: string
};
function Change(el:any){
  el.style.color = 'grey';

}
export default class Changes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      firstName: "", 
      lastName: "", 
      email: "",
      password: "",
      confirmPassword: '',
      successful: false,
      message: "",
      group: ""
    };
  }

  validationSchema() {
    var numbers=[0,1,2,3,4,5,6,7,8,9]
    return Yup.object().shape({
      firstName: Yup.string()
        .required("Это обязательное поле!"),
      lastName: Yup.string()
        .required("Это обязательное поле!"),
      email: Yup.string()
        .email("Это не адрес электронной почты.")
        .required("Это обязательное поле!"),
      group: Yup.string()
        .test(
          "len",
          "Это не номер группы.",
          (val: any) =>
            val &&
            val.toString().length == 7 &&
            val.toString()[0] in ['Б','С']&&
            val.toString()[1] in numbers &&
            val.toString()[2] in numbers &&
            val.toString()[3] == '-'&&
            val.toString()[4] in numbers &&
            val.toString()[5] in numbers &&
            val.toString()[6] in numbers
        )
        .required("Это обязательное поле!"),
      password: Yup.string()
      .min(6, 'Минимальная длина пароля 6 символов')
      .max(40, 'Максимальная длина пароля 40 символов')
        .required("Это обязательное поле!"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .min(6, 'Минимальная длина пароля 6 символов')
        .max(40, 'Максимальная длина пароля 40 символов')
        .required("Это обязательное поле!"),
    });
  }


  handleChanges(formValue: { firstName: string,lastName: string; email: string; password: string;group: string }) {
    const { firstName, lastName, email, password,group } = formValue;

    this.setState({
      message: "",
      successful: false
      
    });

    function setter(a: outputTypes.UserToken){}

	  let changeUserBody: inputTypes.UserReg = {
		  email: email, 
      firstName: firstName, 
      lastName: lastName, 
      password: password,
      
	}

    RoutesManager.createUser/*changeUser*/(changeUserBody, setter)//Подставить функцию редактирования бд

  }

  render() {
    const { successful, message } = this.state;

    const initialValues = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      group: ""
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleChanges}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="firstname"> Имя </label>
                    <Field name="firstname" type="text" className="form-control" />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname"> Фамилия </label>
                    <Field name="lastname" type="text" className="form-control" />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email"> Электронная почта </label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="group"> Группа (Б00-000) </label>
                    <Field name="group" type="group" className="form-control" />
                    <ErrorMessage
                      name="group"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Пароль </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmassword"> Повторите пароль </label>
                    <Field
                      name="confirmPassword"
                      type="Password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"  >Подтвердить</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}