import React, { PropTypes as RPT } from 'react';

export default function ProcessList(props) {
  const { processes } = props;

  if (processes.length < 1)
    return null;

  return (
    <div>
      <h2>Processes</h2>
      <ul>
        {processes.map((process) =>
          <li key={process.id}>{process.name}</li>
        )}
      </ul>
    </div>
 );
}

ProcessList.propTypes = {
  processes: RPT.array
};
