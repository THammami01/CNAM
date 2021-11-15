import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Button } from "@douyinfe/semi-ui";

interface Step2Props {
  onContinue: any;
  onGoBack: any;
  showError: (title: string, content: string) => void;
  entryData: any;
  setEntryData: any;
}

const Step2: FunctionComponent<Step2Props> = ({ onContinue, onGoBack, showError, entryData, setEntryData }) => {
  const { t } = useTranslation();
  const [isCheckingFormData, setIsCheckingFormData] = useState(false);

  const localOnContinue = (values: any) => {
    setIsCheckingFormData(true);

    setTimeout(() => {
      if (!values.cnamCode || !values.drName) {
        showError(t("Empty fields"), t("Please fill all fields first."));
        setIsCheckingFormData(false);
        return;
      }

      setEntryData({ ...entryData, drData: values });
      onContinue();
    }, 500);
  };

  return (
    <Form onSubmit={values => localOnContinue(values)} style={{ marginTop: "1.5rem" }}>
      {({ formState, values, formApi }) => (
        <>
          <Form.InputNumber
            field="cnamCode"
            label={t("CNAM Code:")}
            placeholder={t("Enter CNAM code")}
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          />

          <Form.Input
            field="drName"
            label={t("Doctor (firstname and lastname):")}
            placeholder={t("Enter doctor's firstname and lastname") as string}
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          />

          <div className="step-btns">
            <Button
              htmlType="submit"
              size="large"
              style={{ marginTop: ".5rem", display: "block" }}
              loading={isCheckingFormData}
            >
              {t("Continue")}
            </Button>

            <Button
              theme="borderless"
              size="large"
              style={{ marginTop: ".5rem", padding: "0", background: "none" }}
              onClick={onGoBack}
            >
              {t("Go Back")}
            </Button>

            <Button
              theme="borderless"
              htmlType="reset"
              size="large"
              style={{ marginTop: ".5rem", padding: "0", background: "none" }}
            >
              {t("Reset")}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default Step2;
