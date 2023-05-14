import React from 'react';
import SourceTable from '../components/SourceTable';
import '../css/Sidebar.css';
import $ from 'jquery';


class SourcePage extends React.Component {
  constructor(props) {
    super(props)
      this.widgets = [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' }]
        this.sizes = ['3x3','2x3','2x2']
      }
  componentDidMount() {
    for(var i in this.sizes){
      for(var j in this.widgets){
        localStorage.setItem(localStorage.getItem('auth_user') + '-' + this.sizes[i] + '-widget-' + j+'v', '1')
        console.log(localStorage.getItem(localStorage.getItem('auth_user') + '-' + this.sizes[i] + '-widget-' + j+'v'))
      }
    }
    localStorage.setItem("reload", '1')
    $(".main-h").css('background', 'none');
    $(".source-h").css('background', 'white');
    $(".grid-size").css('display', 'none');
    $(".grid-size").css('background', 'none');
    $(".grid-popup").css('display', 'none');
    localStorage.setItem("video", '1')
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