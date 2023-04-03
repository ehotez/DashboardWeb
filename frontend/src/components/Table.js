import '../css/Table.css'
import React, { useState, useEffect } from 'react';

class SourceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sources: [] };
  }

  componentDidMount() {
    fetch('http://localhost/DashboardWeb/yii2-basic/web/source/')
      .then(response => response.json())
      .then(data => this.setState({ sources: data }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>БАЛДЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЖ</th>
          </tr>
        </thead>
        <tbody>
          {this.state.sources.map(source => (
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
}

export default SourceTable;