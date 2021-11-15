import { FunctionComponent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setAccessToken, setConnectedUser, setIsDarkTheme, setSelectedLang } from "../store/actions/action-creators";
import { RootState } from "../store/reducers";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Switch, Typography, Tooltip, Button, Avatar, Tag } from "@douyinfe/semi-ui";
import { IconExit } from "@douyinfe/semi-icons";
import Flag from "react-world-flags";
import i18n from "../translations/i18n";
import cnam from "../assets/imgs/cnam.jpg";
import { useHistory } from "react-router";

const AppHeader: FunctionComponent = () => {
  const { Text } = Typography;
  const isDarkTheme = useSelector((store: RootState) => store.global.isDarkTheme);
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store: RootState) => store.global.accessToken);
  const connectedUser = useSelector((store: RootState) => store.global.connectedUser);
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleChangeTheme = () => dispatch(setIsDarkTheme(!isDarkTheme));

  const handleLogOut = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      dispatch(setAccessToken(null));
      dispatch(setConnectedUser(null));
      setIsLoggingOut(false);
      history.push("/");
    }, 1000);
  };

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setSelectedLang(lang));
  };

  return (
    <div className="app-header">
      <img src={cnam} alt="CNAM" />
      <div className="header-right-side">
        <div className="first-row">
          <div className="theme-switcher">
            <Text>{isDarkTheme ? t("Dark Theme") : t("Light Theme")}</Text>
            <Switch defaultChecked={isDarkTheme} size="default" onChange={handleChangeTheme} />
          </div>
          <div className="lang-switcher">
            {/* <Tooltip content={"عربي"}>
            <div> */}
            <Flag code="tn" onClick={() => handleLangChange("ar")} />
            {/* </div>
          </Tooltip> */}

            {/* <Tooltip content={"English"}>
            <div style={{transform: "translateY(2px)"}}> */}
            <Flag code="gb" onClick={() => handleLangChange("en")} />
            {/* </div>
          </Tooltip> */}

            {/* <Tooltip content={"Français"}>
            <div style={{transform: "translateY(2px)"}}> */}
            <Flag code="fr" onClick={() => handleLangChange("fr")} />
            {/* </div>
          </Tooltip> */}
          </div>

          {accessToken &&
            <Button
              theme="borderless"
              icon={<IconExit rotate={180} />}
              style={{ marginRight: 10 }}
              size="small"
              onClick={handleLogOut}
              loading={isLoggingOut}
              className="btn-log-out"
            >
              {t("Log out")}
            </Button>
          }
        </div>
        {connectedUser &&
          <div className="second-row">
            <Avatar size="small" color="light-blue" style={{ margin: 4, cursor: "default" }}>{`${connectedUser.firstname[0]}${connectedUser.lastname[0]}`}</Avatar>
            <Text type="tertiary">{`${connectedUser.firstname} ${connectedUser.lastname}`}</Text>
            <Tag color="blue">
              {connectedUser.service === "ref" ? t("Referencing") : t("Entry")}
            </Tag>
          </div>}
      </div>
    </div>
  );
};

export default AppHeader;
