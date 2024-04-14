import React from 'react';



  
const SpecificationTable = ({ specifications }) => {
  return (
    <table className="table">
      {specifications && specifications.map((item) => {
        return Object.entries(item).map(([key, values]) => {
          return (
            <tbody key={key}>
              <tr>
                <th colSpan="2" className='table-secondary'>{key}</th>
              </tr>
              {values.map((value, index) => {
                return (
                  <tr key={index}>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <React.Fragment key={subKey}>
                        <td>{subKey}</td>
                        <td>{subValue}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          );
        });
      })}
    </table>
  );
}

  export default SpecificationTable;