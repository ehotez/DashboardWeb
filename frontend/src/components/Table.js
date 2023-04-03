import '../css/Table.css'
import React, { useState, useEffect } from 'react';

class SourceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sources: [],
      isPopupVisible: false,
      deleteId:0 };
  }

  componentDidMount() { 
    this.fetchSources(); 
  } 

  fetchSources() {
    fetch('http://localhost/new/DashboardWeb/yii2-basic/web/source/') 
      .then(response => response.json()) 
      .then(data => this.setState({ sources: data })) 
      .catch(error => console.log(error)); 
  }

  handleButtonClick = (id) => {
    this.setState({ deleteId: id});
    this.setState({ isPopupVisible: true });
  }

  handleButtonClickClose = () => {
    this.setState({ isPopupVisible: false });
  }

  handleButtonDelete = (id) => {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/delete/?id=${id}`, {
    method: 'DELETE'
  })
  .then(() => {
    this.fetchSources();
  })
  .catch(error => console.log(error));
  this.setState({ isPopupVisible: false });
  }

  render() {
    return (
      <div>
        {this.state.isPopupVisible && 
          <div className="popup"> 
           <label className='text'>Ты уверен, другалёк?</label>
           
            <button className='but1' onClick={this.handleButtonDelete.bind(this, this.state.deleteId)}>Да</button>
            <button className='but2' onClick={this.handleButtonClickClose}>Нет</button>
          </div> 
        } 
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Link</th>
              <th>БАЛДЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЖ</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sources.map(source => (
              <tr key={source.intSourceId}>
                <td>{source.intSourceId}</td>
                <td>{source.txtSourceName}</td>
                <td>{source.txtSourceType}</td>
                <td>{source.txtSourceLink}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={this.handleButtonClick.bind(this,source.intSourceId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SourceTable;