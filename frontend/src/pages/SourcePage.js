import React from 'react';
import SourceTable from '../components/SourceTable';

class SourcePage extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{margin: '20px'}}>Source List</h1>
        <SourceTable />
      </div>
    );
  }
}

export default SourcePage;