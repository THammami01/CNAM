import { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { Button, Form, Space, Typography, Radio } from "@douyinfe/semi-ui";
import RefResModal from "../components/DataRef/RefResModal";
import RefService from "../services/RefService";
import { RootState } from "../store/reducers";

interface DataEntryProps {
  showError: (title: string, content: string) => void;
}

const DataRef: FunctionComponent<DataEntryProps> = ({ showError }) => {
  const { Title } = Typography;
  const { t } = useTranslation();
  const [isRefResModalVisible, setIsRefResModalVisible] = useState(false);
  const [refRes, setRefRes] = useState<any>(null);
  const history = useHistory();
  const accessToken = useSelector((store: RootState) => store.global.accessToken);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!accessToken)
      history.push("/login");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (values: any) => {
    setIsSaving(true);
    const { belongsTo, belongsToNb, lastname, firstname, consultationDate } = values;

    setTimeout(() => {
      if (!belongsTo || !belongsToNb || !lastname || !firstname || !consultationDate) {
        showError(t("Empty fields"), t("Please fill all fields first."));
        setIsSaving(false);
        return;
      }

      RefService.addRef(values)
        .then((res) => {
          setIsRefResModalVisible(true);
          setRefRes(res.data);
        })
        .catch((_err) => {
          showError(t("Error Occured"), t("Something went wrong."));
        })
        .finally(() => {
          setIsSaving(false);
        });
    }, 500);
  };

  return (
    <Form onSubmit={values => handleSubmit(values)} style={{ marginTop: "2rem" }} >
      {({ formState, values, formApi }) => (
        <>
          <Title heading={3} style={{ margin: "8px 0" }}>{t("Referencing")}</Title>

          <Space spacing="loose" style={{ marginTop: "1rem" }} >
            <Form.RadioGroup
              field="belongsTo"
              label={t("Belongs to:")}
              style={{ padding: ".25rem 0" }}
              fieldStyle={{ padding: 0, margin: 0 }}
            >
              <Radio value="cnss">CNSS</Radio>
              <Radio value="cnrps" style={{ marginRight: ".5rem" }}>CNRPS</Radio>
            </Form.RadioGroup>

            <Form.InputNumber
              field="belongsToNb"
              label={t("CNSS/CNRPS Number:")}
              placeholder={t("Enter number..") as string}
              fieldStyle={{ padding: 0, margin: 0 }}
            />
          </Space>

          <Form.Input
            field="firstname"
            label={t("Firstname")}
            placeholder={t("Enter patient's firstname") as string}
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          />

          <Form.Input
            field="lastname"
            label={t("Lastname")}
            placeholder={t("Enter patient's lastname") as string}
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          />

          <Form.DatePicker
            field="consultationDate"
            label={t("Consultation date:")}
            placeholder={t("Select consultation date")}
            format="dd-MM-yyyy"
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
          />

          <div className="step-btns">
            <Button htmlType="submit" loading={isSaving} theme="solid" type="tertiary" size="large" style={{ marginTop: ".5rem" }}>
              {t("Save")}
            </Button>

            <Button
              theme="borderless"
              htmlType="reset" size="large"
              style={{ marginTop: ".5rem", padding: "0", background: "none" }}
            >
              {t("Reset")}
            </Button>
          </div>

          {isRefResModalVisible &&
            <RefResModal
              refRes={refRes}
              isVisible={isRefResModalVisible}
              onClose={() => { setIsRefResModalVisible(false); }}
            />
          }
        </>
      )}
    </Form>
  );
};

export default DataRef;
