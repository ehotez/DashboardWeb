import React from 'react';
import '../css/Grid.css'
import '../css/Sidebar.css'
import Graphic from './Graphic';

class Widget extends React.Component {
  static idCounter = 0;
  constructor(props) {
    super(props);
    this.id = `widget-${Widget.idCounter++}`;
    this.state = {
      value: '',
      sources: [],
      isPopupVisible: false,
      isShowVisible: false,
      isCloseVisible: false,
      sourceName: '',
      sourceType: '',
      sourceLink: '',
      sourcePeriod: 0,
      globalkey: ''
    };
    this.gridSize = ''
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
  handleRowClick(e) {
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
    this.setState({ isShowVisible: true });
    this.setState({ isCloseVisible: true });
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ isShowVisible: false });
  }

  handleAddClick = () => {
    this.setState({ isPopupVisible: true });
    this.fetchSources();
  }

  handlePopupClose = () => {
    this.setState({ isPopupVisible: false });
  }

  handleCloseWidget = () => {
    this.setState({ isShowVisible: false });
    this.setState({ isCloseVisible: false });
    this.setState({ sourceName: '' });
    this.setState({ sourceLink: '' });
  }

  componentDidMount() {
    var savedSize = localStorage.getItem('size');
    if (savedSize) {
      this.gridSize = savedSize;
    }
    var key = (localStorage.getItem("auth_user") + "-" + this.gridSize + "-" + this.id).toString();
    var savedValue = localStorage.getItem(key);
    //console.log(savedValue);
    if (savedValue != '-' && savedValue) {
      var mass = savedValue.split('-');
      console.log(key);
      this.setState({ sourceName: mass[0] });
      this.setState({ sourceLink: mass[1] });
      this.setState({ isCloseVisible: true });
    }
  }

  handlePopupSave = () => {
    this.setState({ isPopupVisible: false });
    this.handleShowClose();
    this.handleCloseShow();
  }

  componentDidUpdate() {
    var key = (localStorage.getItem("auth_user") + "-" + this.gridSize + "-" + this.id).toString();
    var value = (this.state.sourceName + '-' + this.state.sourceLink).toString();
    localStorage.setItem(key, value);
  }
  render() {

    return (
      <>
        {!this.state.isShowVisible &&
          <button className='add-widget-button' onClick={this.handleAddClick}>+</button>
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
                  <tr onClick={this.handleRowClick.bind(this)} key={source.intSourceId}>
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
          <button className='close' onClick={this.handleCloseWidget}>X</button>
        }
        {!this.state.isPopupVisible && this.state.sourceLink && this.state.sourceName &&
          <div className='graphic'>
            {/* <div className='viewname'>
              {this.state.sourceName}
            </div>
            <div className='view'>
              {this.state.sourceLink}
            </div> */}

            <Graphic widget={this.gridSize+'-'+this.id} mass={this.state.sourceName} />
          </div>
        }
      </>
    );
  }
}

export default Widget;