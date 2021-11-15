import { FunctionComponent } from "react";
import { Table, Button } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import { useTranslation } from "react-i18next";
import { getRegularDateStr } from "../../utils/funcs";

interface MedsAndAnaylizesTableProps {
  tableRows: any;
  setTableRows: any;
}

const MedsAndAnaylizesTable: FunctionComponent<MedsAndAnaylizesTableProps> = ({ tableRows, setTableRows }) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Code"),
      dataIndex: "codeMedOrAnalysis",
      render: (codeMedOrAnalysis: string) => <span>{codeMedOrAnalysis}</span>,
    },
    {
      title: t("Med/Analysis Name"),
      dataIndex: "name",
    },
    {
      title: t("Purchase Date"),
      dataIndex: "purchaseDate",
      render: (text: Date) => <span>{getRegularDateStr(text)}</span>,
    },
    {
      title: t("Pharmacy/Labo Nb"),
      dataIndex: "pharmacyOrLaboNb",
    },
    {
      title: t("Price"),
      dataIndex: "price",
      render: (price: string) => <span>{price} {t("TND")}</span>,
    },
    {
      title: t("More"),
      render: (_text: string, record: any) => (
        <Button icon={<IconDelete />} theme="borderless" onClick={() => removeRecord(record.key)} />
      ),
    },
  ];

  const removeRecord = (key: any) => {
    const tempTableRows: any = [...tableRows];

    if (key != null) {
      const idx: any = tempTableRows.findIndex((data: any) => data.key === key);
      // console.log(key, currDataSource, idx);

      if (idx > -1) {
        tempTableRows.splice(idx, 1);
        setTableRows(tempTableRows);
      }
    }
  };

  return (
    <Table columns={columns} dataSource={tableRows} pagination={false} className="table-cmpnt" />
  );
};

export default MedsAndAnaylizesTable;
