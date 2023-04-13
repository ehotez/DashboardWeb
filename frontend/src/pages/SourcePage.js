import React from 'react';
import SourceTable from '../components/SourceTable';
import '../css/Sidebar.css';
import $ from 'jquery';

class SourcePage extends React.Component {
  componentDidMount() {
    $(".main-h").css('background', 'none');
    $(".source-h").css('background', 'white');
    $(".grid-size").css('display', 'none');
    $(".grid-size").css('background', 'none');
    $(".grid-popup").css('display', 'none');
  }
  render() {
    return (
      <>
        <main>
          <div style={{ marginLeft: '130px' }}>
            <SourceTable />
          </div>
        </main>
      </>
    );
  }
}

export default SourcePage;