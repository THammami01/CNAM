import { useState, useEffect, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { Card, Spin, Notification } from "@douyinfe/semi-ui";
import AppHeader from "./common/AppHeader";
import AuthService from "./services/AuthService";
import Login from "./pages/Login";
import DataEntry from "./pages/DataEntry";
import DataRef from "./pages/DataRef";
import { RootState } from "./store/reducers";
import { setAccessToken, setConnectedUser } from "./store/actions/action-creators";
import { getThemeFromLocalStorage } from "./utils/funcs";

// TODO: ADD SOME SPACING
// TODO: CHECK TRANSLATIONS
const App: FunctionComponent = () => {
  const [isSpinning, setIsSpinning] = useState(true);
  const selectedLang = useSelector((store: RootState) => store.global.selectedLang);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const showError = (title: string, content: string) => {
    Notification.destroyAll();
    Notification.error({
      title,
      content,
      duration: 3,
      position: "bottom"
    });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      AuthService.verifyAccessToken(accessToken)
        .then((res) => {
          dispatch(setAccessToken(accessToken));
          dispatch(setConnectedUser(res.data.user));
          history.push(`/data-${res.data.user.service}`);
        });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    initTheme();
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  }, []);

  useEffect(() => {
    document.body.setAttribute("class", selectedLang);
  }, [selectedLang]);

  const initTheme = () =>
    getThemeFromLocalStorage() &&
    document.body.setAttribute("theme-mode", "dark");

  return (
    <Spin tip={t("Loading..")} spinning={isSpinning}>
      <Card
        style={{
          borderRadius: 0,
          minHeight: "100vh"
        }}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div className={`root-container ${selectedLang}`}>
          <AppHeader />

          {!isSpinning && (
            <Switch>
              <Route exact path="/">
                <Redirect to={{ pathname: "/login" }} />
              </Route>
              <Route exact path="/login">
                <Login showError={showError} />
              </Route>
              <Route exact path="/data-entry">
                <DataEntry showError={showError} />
              </Route>
              <Route exact path="/data-ref">
                <DataRef showError={showError} />
              </Route>
              <Route>
                <Redirect to={{ pathname: "/" }} />
              </Route>
            </Switch>
          )}
        </div>
      </Card>
    </Spin>
  );
};

export default App;
