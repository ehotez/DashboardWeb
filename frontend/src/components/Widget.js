import React from 'react';
import '../css/Grid.css'
import '../css/Sidebar.css'
import Graphic from './Graphic';
import Video from './Video';
class Widget extends React.Component {
  static idCounter = 0;
  constructor(props) {
    super(props);
    this.id = `widget-${this.props.widgetId}`;
    this.state = {
      value: '',
      sources: [],
      isPopupVisible: false,
      isShowVisible: false,
      isCloseVisible: false,
      isClosePopupVisible: false,
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
    this.setState({ isShowVisible: true });
    this.setState({ isCloseVisible: true });
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.setState({ isShowVisible: false });
  }

  handleButtonClick = () => {
    this.setState({ isPopupVisible: true });
    this.setState({ isClosePopupVisible: true });
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
    this.setState({ sourceType: '' });
  }

  componentDidMount() {
    var savedSize = localStorage.getItem('size');
    if (savedSize) {
      this.gridSize = savedSize;
    }
    var key = (localStorage.getItem("auth_user") + "-" + this.gridSize + "-" + this.id).toString();
    var savedValue = localStorage.getItem(key);
    if (savedValue != '--' && savedValue) {
      var mass = savedValue.split('-');
      this.setState({ sourceName: mass[0] });
      this.setState({ sourceLink: mass[1] });
      this.setState({ sourceType: mass[2] });
      this.setState({ isCloseVisible: true });
      this.setState({ isShowVisible: true });
    }
  }

  handlePopupSave = () => {
    this.setState({ isPopupVisible: false });
    this.handleShowClose();
    this.handleCloseShow();
  }

  componentDidUpdate() {
    var key = (localStorage.getItem("auth_user") + "-" + this.gridSize + "-" + this.id).toString();
    var value = (this.state.sourceName + '-' + this.state.sourceLink + '-' + this.state.sourceType).toString();
    localStorage.setItem(key, value);
  }

  render() {
    return (
      <>
        {!this.state.isShowVisible &&
          <button className='add-widget-button' onClick={this.handleButtonClick}>+</button>
        }
        {this.state.isPopupVisible &&
          <>
            {this.state.isClosePopupVisible &&
              <button className='close' style={{ left: '-20px' }} onClick={this.handlePopupClose}>X</button>
            }
            <table className="gridtable">
              <thead>
                <tr>
                  <th width='45%'>Имя источника</th>
                  <th width='10%'>Тип</th>
                  <th width='45%'>Ссылка</th>
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
          </>
        }
        {!this.state.isPopupVisible && this.state.sourceLink && this.state.sourceName &&
          <>
            {this.state.sourceType == "text" &&
              <div className='graphic'>
                {this.state.isCloseVisible &&
                  <button className='close' onClick={this.handleCloseWidget}>X</button>
                }
                <div className='viewname'>
                  {this.state.sourceName}
                </div>
                <div className='view'>
                  {this.state.sourceLink}
                </div>
              </div>
            }
            {this.state.sourceType == "video" &&
              <>
                {this.state.isCloseVisible &&
                  <button className='close' onClick={this.handleCloseWidget}>X</button>
                }
                <Video link={this.state.sourceLink} name={this.state.sourceName} id= {this.id}/>
              </>
            }
            {this.state.sourceType == "graphic" &&
              <div className='graphic'>
                {this.state.isCloseVisible &&
                  <button className='close' style={{ left: '-95px' }} onClick={this.handleCloseWidget}>X</button>
                }
                <Graphic widget={this.gridSize + '-' + this.id} mass={this.state.sourceName} />
              </div>
            }
          </>
        }
      </>
    );
  }
}

export default Widget;