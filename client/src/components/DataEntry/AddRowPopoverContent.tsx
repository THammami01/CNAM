import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid";
import { Form, Button, Space, Typography } from "@douyinfe/semi-ui";

interface AddRowPopoverContentProps {
  handleAddNewRow: (values: any) => void;
  onClose: () => void;
}

const AddRowPopoverContent: FunctionComponent<AddRowPopoverContentProps> = ({
  handleAddNewRow,
  onClose
}) => {
  const { Text } = Typography;
  const { t } = useTranslation();
  const [isSaving, setIsSaving] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  const localHandleAddNewRow = (values: any) => {
    setIsSaving(true);
    setIsWarningVisible(false);
    setTimeout(() => {
      if (
        !values.codeMedOrAnalysis ||
        !values.name ||
        !values.purchaseDate ||
        !values.pharmacyOrLaboNb ||
        !values.price
      ) {
        setIsSaving(false);
        setIsWarningVisible(true);
        return;
      }

      values.key = nanoid();
      handleAddNewRow(values);
      onClose();
    }, 500);
  };

  return <div style={{ padding: ".1rem" }}>
    <Form onSubmit={values => localHandleAddNewRow(values)}>
      {({ formState, values, formApi }) => (
        <>
          <Form.Input
            field="name"
            placeholder={t("Enter med or analysis name") as string}
            fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
            noLabel
          />

          <Space spacing="tight">
            <Form.InputNumber
              field="codeMedOrAnalysis"
              placeholder={t("Enter code") as string}
              fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
              noLabel
            />
            <Form.DatePicker
              field="purchaseDate"
              className="purchase-date-from-popover"
              placeholder={t("Select purchase date")}
              format="dd-MM-yyyy"
              fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
              noLabel
            />
          </Space><br />

          <Space spacing="tight">
            <Form.InputNumber
              field="pharmacyOrLaboNb"
              placeholder={t("Enter pharmacy/labo nb..") as string}
              fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
              noLabel
            />

            <Form.InputNumber
              field="price"
              placeholder={t("Enter price") as string}
              fieldStyle={{ padding: ".25rem 0", maxWidth: "300px" }}
              noLabel
            />
          </Space>

          <div className="step-btns" style={{ alignItems: "center" }}>
            <Button
              htmlType="submit"
              loading={isSaving}
              type="primary"
              style={{ marginTop: ".5rem", padding: "1.175rem .75rem" }}>
              {t("Add")}
            </Button>

            <Button
              theme="borderless"
              htmlType="reset"
              style={{ marginTop: ".5rem", padding: "0", background: "none" }}
              onClick={onClose}
            >
              {t("Cancel")}
            </Button>

            {isWarningVisible &&
              <Text type="quaternary" style={{ transform: "translateY(4px)" }}>{t("Please fill all fields.")}</Text>}
          </div>
        </>
      )}
    </Form>
  </div>;
};

export default AddRowPopoverContent;
