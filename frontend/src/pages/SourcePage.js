import React from 'react';
import SourceTable from '../components/SourceTable';
import '../css/Sidebar.css';

class SourcePage extends React.Component {
  render() {
    return (
      <>
        <main>
          <div style={{marginLeft:'130px'}}>
            <h1 style={{ margin: '20px' }}>Source List</h1>
            <SourceTable />
          </div>
        </main>
        </>
    );
  }
}

export default SourcePage;