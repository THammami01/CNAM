import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form } from "@douyinfe/semi-ui";
import EntryService from "../../services/EntryService";

interface Step1Props {
  onContinue: any;
  showError: (title: string, content: string) => void;
  entryData: any;
  setEntryData: any;
}

const Step1: FunctionComponent<Step1Props> = ({ onContinue, showError, entryData, setEntryData }) => {
  const { t } = useTranslation();
  const [isCheckingConsultationData, setIsCheckingConsultationData] = useState(false);

  const localOnContinue = (values: any) => {
    setIsCheckingConsultationData(true);

    setTimeout(() => {
      if (!values.consultationDate || !values.ref) {
        showError(t("Empty fields"), t("Please fill all fields first."));
        setIsCheckingConsultationData(false);
        return;
      }

      EntryService.checkConsultationData(values)
        .then(res => {
          const { isConsultationRegistered } = res.data;

          if (!isConsultationRegistered) {
            showError(
              t("Consultation not found"),
              t("No consultation registered with this data.")
            );
            setIsCheckingConsultationData(false);
            return;
          }

          setEntryData({ ...entryData, consultationData: values });
          onContinue();
        })
        .catch(err => {
          showError(t("Error Occured"), t("Something went wrong."));
          setIsCheckingConsultationData(false);
        });
    }, 500);
  };

  return (
    <Form onSubmit={values => localOnContinue(values)} style={{ marginTop: "1.5rem" }}>
      {({ formState, values, formApi }) => (
        <>
          <Form.DatePicker
            field="consultationDate"
            label={t("Consultation date:")}
            placeholder={t("Select consultation date")}
            format="dd-MM-yyyy"
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          />

          <Form.InputNumber
            field="ref"
            label={t("Reference") + ":"}
            placeholder={t("Enter the reference") as string}
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          // fieldStyle={{ padding: 0, margin: 0 }}
          />

          <div className="step-btns">
            <Button
              htmlType="submit"
              size="large"
              style={{ marginTop: ".5rem", display: "block" }}
              loading={isCheckingConsultationData}
            >
              {t("Continue")}
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

export default Step1;
