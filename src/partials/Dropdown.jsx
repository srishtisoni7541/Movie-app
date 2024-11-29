import React from "react";

const Dropdown = ({ title, options ,func}) => {
  return (
    <div>
      <select
      onChange={func}
        className="bg-[#6556CD] py-1 px-5 rounded-md"
        defaultValue="0"
        name="format"
        id="format"
      >
        <option className="bg-[#6556CD]" value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} className="bg-[#6556CD]" value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
