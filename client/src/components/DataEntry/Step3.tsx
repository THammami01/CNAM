import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Popover } from "@douyinfe/semi-ui";
import MedsAndAnaylizesTable from "./MedsAndAnaylizesTable";
import AddRowPopoverContent from "./AddRowPopoverContent";

interface Step3Props {
  onConfirm: any;
  onGoBack: any;
  showError: (title: string, content: string) => void;
  entryData: any;
  setEntryData: any;
}

const Step3: FunctionComponent<Step3Props> = ({ onConfirm, onGoBack, showError, entryData, setEntryData }) => {
  const { t } = useTranslation();
  const [tableRows, setTableRows] = useState<any>([]);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isCheckingTableRows, setIsCheckingTableRows] = useState(false);

  const localOnConfirm = () => {
    setIsCheckingTableRows(true);

    setTimeout(() => {
      if (!tableRows.length) {
        showError(t("Table is empty"), t("Fill the table first."));
        setIsCheckingTableRows(false);
        return;
      }

      const finalEntryData = { ...entryData, medsAndAnaylizesData: tableRows };
      setEntryData(finalEntryData);
      setIsCheckingTableRows(false);
      onConfirm(finalEntryData);
    }, 500);
  };

  const handleDeleteAll = () => {
    setIsDeletingAll(true);

    setTimeout(() => {
      if (tableRows.length === 0)
        showError(t("Table contains no rows"), t("Nothing to be deleted."));

      setTableRows([]);
      setIsDeletingAll(false);
    }, 500);
  };

  const handleShowPopover = () => setIsPopoverVisible(currIsPopoverVisible => !currIsPopoverVisible);

  // tslint:disable-next-line: no-empty
  const handleAddNewRow = (values: any) => {
    setTableRows([...tableRows, values]);
  };

  return <div style={{ marginTop: "1.5rem" }}>
    <MedsAndAnaylizesTable tableRows={tableRows} setTableRows={setTableRows} />

    <div className="step-btns" style={{ marginTop: ".25rem" }}>
      <Button
        htmlType="submit"
        size="large"
        style={{ marginTop: ".5rem", display: "block" }}
        onClick={localOnConfirm}
        loading={isCheckingTableRows}
        theme="solid"
        type="tertiary"
      >
        {t("Validate")}
      </Button>

      <Button
        theme="borderless"
        size="large"
        style={{ marginTop: ".5rem", padding: "0", background: "none" }}
        onClick={onGoBack}
      >
        {t("Go Back")}
      </Button>

      <Popover
        visible={isPopoverVisible}
        content={<AddRowPopoverContent
          handleAddNewRow={handleAddNewRow}
          onClose={() => setIsPopoverVisible(false)}
        />}
        trigger="custom"
        showArrow
        arrowPointAtCenter={false}
        position="bottomLeft"
      >
        <Button
          theme="borderless"
          size="large"
          style={{ marginTop: ".5rem", padding: "0", background: "none" }}
          onClick={handleShowPopover}
        >
          {t("Add New Row")}
        </Button>
      </Popover>

      <Button
        theme="borderless"
        size="large"
        style={{ marginTop: ".5rem", padding: "0", background: "none" }}
        onClick={handleDeleteAll}
        loading={isDeletingAll}
      >
        {t("Delete All")}
      </Button>
    </div>
  </div>;
};

// tslint:disable-next-line: max-file-line-count
export default Step3;
