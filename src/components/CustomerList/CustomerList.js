import React, { useMemo } from "react";
import "./style.css";

import { getCustomerDataFormatted } from "../../utils/customerUtils";

const RenderTableData = ({ data }) => {
  return data.map((row) => {
    const { id, monthStats, name, totalBonus } = row;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{monthStats?.["01/2021"] || 0}</td>
        <td>{monthStats?.["02/2021"] || 0}</td>
        <td>{monthStats?.["03/2021"] || 0}</td>
        <td>{totalBonus}</td>
      </tr>
    );
  });
};

const RenderTableHeader = () => (
  <>
    <th>Id</th>
    <th>Name</th>
    <th>Jan-2021</th>
    <th>Feb-2021</th>
    <th>Mar-2021</th>
    <th>Total</th>
  </>
);
export default function CustomerList() {
  const memoizedCustomers = useMemo(() => getCustomerDataFormatted(), []);

  return (
    <div>
      <h1>Customer Bonus Points!</h1>
      <table id="customers">
        <tbody>
          <tr>
            <RenderTableHeader />
          </tr>
          <RenderTableData data={memoizedCustomers} />
        </tbody>
      </table>
    </div>
  );
}
