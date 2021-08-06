import React from "react";
import Select from "react-select";
import { multiselectOptions } from "../data";

const ColumnSelect = () => {
  return (
    <div style={{ minWidth: "200px" }}>
      <Select
        options={multiselectOptions}
        closeMenuOnSelect={false}
        defaultValue={[
          multiselectOptions[0],
          multiselectOptions[1],
          multiselectOptions[2],
          multiselectOptions[3],
          multiselectOptions[4],
          multiselectOptions[5],
          multiselectOptions[6],
        ]}
        isMulti
      />
    </div>
  );
};

export default ColumnSelect;
