import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Typography } from "@douyinfe/semi-ui";
import { IconTickCircle } from "@douyinfe/semi-icons";

interface EntryResProps {
  isVisible: any;
  onClose: () => void;
  entryData: any;
}

const EntryResModal: FunctionComponent<EntryResProps> = ({ entryData, isVisible, onClose }) => {
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
      {entryData.res &&
        <>
          <Text type="danger">{t("Result")}: <span>{t(entryData.res.status)}</span></Text><br />
          {entryData.res.reason &&
            <Text type="danger">{t("Reason")}: <span>{t(entryData.res.reason)}</span></Text>}
        </>
      }
    </Modal>
  );
};

export default EntryResModal;
