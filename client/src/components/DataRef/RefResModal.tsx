import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Button, Collapse, Modal, Typography } from "@douyinfe/semi-ui";
import { IconTickCircle } from "@douyinfe/semi-icons";
import { getRegularDateStr } from "../../utils/funcs";

interface RefResProps {
  refRes: any;
  isVisible: any;
  onClose: () => void;
}

const RefResModal: FunctionComponent<RefResProps> = ({ refRes, isVisible, onClose }) => {
  const { Text } = Typography;
  const { t } = useTranslation();

  const footer = (
    <Button type="primary" theme="solid" onClick={onClose}>{t("OK")}</Button>
  );

  return (
    <Modal
      title={t("Saved successfully")}
      visible={isVisible}
      maskClosable={false}
      closeIcon={<></>}
      footer={footer}
      icon={<IconTickCircle size="extra-large" style={{ color: "var(--semi-color-success)" }} />}
      className="info-modal"
    >
      <Text type="danger">{t("Reference")}: <span style={{ userSelect: "all" }}>{refRes?.ref}</span></Text><br />
      <Text type="danger">
        {t("Referencing date")}: <span style={{ userSelect: "all" }}>
          {isVisible && getRegularDateStr(refRes?.refDate)}
        </span>
      </Text>

      <Collapse style={{ marginTop: ".75rem", transform: "translateX(-1rem)" }}>
        <Collapse.Panel header={t("Patient details")} itemKey="1">
          <p>{t("Belongs to:")} {refRes?.belongsTo.toUpperCase()}</p>
          <p>{t("CNSS/CNRPS Number:")} {refRes?.belongsToNb}</p>
          <p>{t("Firstname")} {refRes?.firstname}</p>
          <p>{t("Lastname")} {refRes?.lastname}</p>
          <p>{t("Consultation date:")} {isVisible && getRegularDateStr(refRes?.consultationDate)}</p>
        </Collapse.Panel>
      </Collapse>
    </Modal>
  );
};

export default RefResModal;
