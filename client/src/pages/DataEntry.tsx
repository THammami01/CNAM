import { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Typography, Steps } from "@douyinfe/semi-ui";
import { RootState } from "../store/reducers";
import Step1 from "../components/DataEntry/Step1";
import Step2 from "../components/DataEntry/Step2";
import Step3 from "../components/DataEntry/Step3";
import EntryService from "../services/EntryService";
import EntryResModal from "../components/DataEntry/EntryResModal";
import { getEntryRes } from "../utils/funcs";

interface DataEntryProps {
  showError: (title: string, content: string) => void;
}

const DataEntry: FunctionComponent<DataEntryProps> = ({ showError }) => {
  const { Title } = Typography;
  const { t } = useTranslation();
  const history = useHistory();
  const accessToken = useSelector((store: RootState) => store.global.accessToken);
  const [currentStep, setCurrentStep] = useState(0);
  const [entryData, setEntryData] = useState<any>({
    consultationData: null,
    drData: null,
    medsAndAnaylizesData: null,
    res: null
  });
  const [isEntryResModalVisible, setIsEntryResModalVisible] = useState(false);

  useEffect(() => {
    if (!accessToken)
      history.push("/login");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleConfirm = (finalEntryData: any) => {
    const tempEntryData = { ...finalEntryData, res: getEntryRes(finalEntryData) };
    EntryService.saveEntryData(tempEntryData)
      .then((_res) => {
        setEntryData(tempEntryData);
        setIsEntryResModalVisible(true);
      })
      .catch((_err) => {
        showError(t("Error Occured"), t("Something went wrong."));
      });
  };

  return (
    <>
      <Title heading={3} style={{ margin: "2rem 0 1rem" }}>{t("Entry")}</Title>

      <div style={{ display: "flex", flexWrap: "wrap" }} className="entry-steps">
        <Steps type="nav" current={currentStep} style={{ margin: "auto", flexWrap: "wrap" }}>
          <Steps.Step title={t("Consultation data")} />
          <Steps.Step title={t("Doctor data")} />
          <Steps.Step title={t("List of meds and analyzes")} />
        </Steps>
      </div>

      {currentStep === 0 &&
        <Step1
          onContinue={() => setCurrentStep(() => currentStep + 1)}
          showError={showError}
          entryData={entryData}
          setEntryData={setEntryData}
        />
      }

      {currentStep === 1 &&
        <Step2
          onContinue={() => setCurrentStep(() => currentStep + 1)}
          onGoBack={() => setCurrentStep(() => currentStep - 1)}
          showError={showError}
          entryData={entryData}
          setEntryData={setEntryData}
        />
      }

      {currentStep === 2 &&
        <Step3
          onConfirm={handleConfirm}
          onGoBack={() => setCurrentStep(() => currentStep - 1)}
          showError={showError}
          entryData={entryData}
          setEntryData={setEntryData}
        />
      }

      {isEntryResModalVisible &&
        <EntryResModal
          entryData={entryData}
          isVisible={isEntryResModalVisible}
          onClose={() => {
            setIsEntryResModalVisible(false);
            setCurrentStep(0);
          }}
        />
      }
    </>
  );
};

export default DataEntry;
