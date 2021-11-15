import { FunctionComponent, useState, useEffect } from "react";
import { Button, Form, Typography } from "@douyinfe/semi-ui";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import ILoginReqData from "../interfaces/ILoginReqData";
import { setAccessToken, setConnectedUser } from "../store/actions/action-creators";

interface DataEntryProps {
  showError: (title: string, content: string) => void;
}

const Login: FunctionComponent<DataEntryProps> = ({ showError }) => {
  const { Text } = Typography;
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      AuthService.verifyAccessToken(accessToken)
        .then((res) => {
          dispatch(setConnectedUser(res.data.user));
          history.push(`/data-${res.data.user.service}`);
        });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (values: ILoginReqData) => {
    setIsLoggingIn(true);

    setTimeout(() => {
      AuthService.login(values)
        .then((res) => {
          if (res.data.statusCode === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            dispatch(setAccessToken(res.data.accessToken));
            dispatch(setConnectedUser(res.data.user));
            history.push(`data-${res.data.user.service}`);
          } else {
            showError(t("Invalid Logins"), t("Please check your entries."));
          }
        })
        .catch((_err) => {
          showError(t("Error Occured"), t("Couldn't log in."));
        }).finally(() => {
          setIsLoggingIn(false);
        });
    }, 1500);
  };

  return (
    <Form onSubmit={values => handleSubmit(values as ILoginReqData)} style={{ maxWidth: 400, marginTop: "2rem" }}>
      {({ formState, values, formApi }) => (
        <>
          <Form.Input
            field="registrationNb"
            label={t("Registration Number")}
            style={{ width: "100%" }}
            size="large"
            placeholder={t<string>("Enter your registration number")}>
          </Form.Input>

          <Form.Input
            field="password"
            mode="password"
            label={t("Password")}
            style={{ width: "100%" }}
            size="large"
            placeholder={t<string>("Enter your password")}>
          </Form.Input>

          <div style={{ paddingBottom: "1rem" }}>
            <Text type="tertiary" >{t("Please fill all fields before you press on the log in button.")}</Text>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>
            </p>
            <Button htmlType="submit" theme="solid" type="tertiary" size="large" loading={isLoggingIn}>
              {t("Log in")}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default Login;
