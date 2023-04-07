import React from 'react';
import SourceTable from '../components/SourceTable';
import Sidebar from '../components/Sidebar';
import '../css/Sidebar.css';

class SourcePage extends React.Component {
  render() {
    return (
      
      <div className='flexrow'>
        <nav>
        <Sidebar/>
        </nav>
        <main>
        <div className='translate'>
          <h1 style={{margin: '20px'}}>Source List</h1>
          <SourceTable />
        </div>
        </main>
      </div>
    );
  }
}

export default SourcePage;