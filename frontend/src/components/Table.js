import '../css/Table.css'
import React, { useState, useEffect } from 'react';

function SourceTable() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetch('http://localhost/DashboardWeb/yii2-basic/web/source/')
      .then(response => response.json())
      .then(data => setSources(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <table class="table">
      <thead>
        <tr>
          
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>БАЛДЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЖ</th>
        </tr>
      </thead>
      <tbody>
        {sources.map(source => (
          <tr key={source.intSourceId}>
            <td>{source.intSourceId}</td>
            <td>{source.txtSourceName}</td>
            <td>{source.txtSourceType}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default SourceTable;

