import React from 'react';
import '../css/Grid.css'
import '../css/Sidebar.css'
import {CgAddR} from 'react-icons/cg'
import $ from 'jquery'

class Widget extends React.Component {
  static idCounter = 0;
  constructor(props) {
    super(props);
    this.id = `widget-${Widget.idCounter++}`;
    this.state = {
      value: '',
      sources: [],
      flag1: window.flag,
      isPopupVisible: false,
      isShowVisible: false,
      isCloseVisible: false,
      sourceName: '',
      sourceType:'',
      sourceLink:'',
      sourcePeriod: 0
    };
    this.id1 = this.id+ " "+ this.state.flag1
  }

  fetchSources() {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/get-sources/?userId=${localStorage.getItem('auth_user')}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ sources: result });
      });
  }
  handleClick(e) {
    e.preventDefault();
    const row = e.target.parentNode;
    
    const name = row.querySelector('td:nth-child(2)').innerText;
    const type_label = row.querySelector('td:nth-child(3)').innerText;
    const link = row.querySelector('td:nth-child(4)').innerText;
    const time = row.querySelector('td:nth-child(7)').innerText;
    this.setState({ sourceName: name });
    this.setState({ sourceType: type_label });
    this.setState({ sourceLink: link });
    this.setState({ sourcePeriod: time });
    this.setState({ isPopupVisible: false }); 
    this.handleShowClose();
    this.handleCloseShow();
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ isShowVisible: false });
    
  }
  
  deleteChange = () => {
    this.setState({ sourceName: '' });
    this.setState({ sourceLink: '' });
  }

  handleButtonClick = () => {
    this.setState({ isPopupVisible: true });
    this.fetchSources();
  }

  handlePopupClose = () => {
    this.setState({ isPopupVisible: false });
  }
  handleCloseShow = () => {
    this.setState({ isCloseVisible: true });
  }

  handleShowClose = () => {
    this.setState({ isShowVisible: true });
  }

  handleShowShow = () => {
    this.setState({ isShowVisible: false });
    this.setState({ isCloseVisible: false });
    this.deleteChange();
  }

  componentDidMount() {
    $(".main-h").css('background', 'white');
    const savedValue = localStorage.getItem(this.id1);
    if (savedValue) {
      this.setState({ sourceLink: savedValue });
      this.setState({ isShowVisible: savedValue });
      this.setState({ isCloseVisible: savedValue });
      //this.setState({ isPopupVisible: savedValue });
    }
    const savedValue1 = localStorage.getItem(this.id1+1);
    if (savedValue1) {
      this.setState({ sourceName: savedValue1 });
      //this.setState({ isPopupVisible: savedValue });
    }
  }

  handlePopupSave = () => { 
    this.setState({ isPopupVisible: false }); 
    this.handleShowClose();
    this.handleCloseShow();
  } 

  componentDidUpdate() {
    localStorage.setItem(this.id1, this.state.sourceLink);
    localStorage.setItem(this.id1+1, this.state.sourceName);
  }
  render() {
    window.addEventListener('myGlobalVarChanged', (event) => {
      this.setState({ flag1: event.detail });
    });
    return (
      <>
        {!this.state.isShowVisible &&
          <button className='add-widget-button' onClick={this.handleButtonClick}>+</button> 
        }
        {this.state.isPopupVisible && 
          <div className="popup"> 
            {/* <input type="text" value={this.state.value} onChange={this.handleChange} />
            <button onClick={this.handlePopupSave}>Save</button>  */}
            
            <table className="table">
              <thead>
                <tr>
                  <th width='25%'>Имя источника</th>
                  <th width='10%'>Тип</th>
                  <th>Ссылка</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sources.map(source => (
                  <tr onClick={this.handleClick.bind(this)} key={source.intSourceId}>
                    <td className='view-off'>{source.intSourceId}</td>
                    <td>{source.txtSourceName}</td>
                    <td>{source.txtSourceType}</td>
                    <td>{source.txtSourceLink}</td>
                    <td className='view-off'>{source.txtSourceLogin}</td>
                    <td className='view-off'>{source.txtSourcePassword}</td>
                    <td className='view-off'>{source.intTimePeriod}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        } 
        {this.state.isCloseVisible &&
            <button className='close' onClick={this.handleShowShow}>X</button> 
        }
        {!this.state.isPopupVisible && this.state.sourceLink && this.state.sourceName && 
          <>
            <div className='viewname'>
              {this.state.sourceName}
            </div>
            <div className='view'>
              {this.state.sourceLink}
            </div>
          </>
          } 
      </>
    );
  }
}

export default Widget;