import React from 'react';
import '../css/Grid.css'
import '../css/Sidebar.css'
import Graphic from './Graphic';
import Video from './Video';
import Query from './Query';
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
      sourcePeriod: '',
      globalkey: ''
    };
    this.gridSize = ''
    this.options = [
      { value: 'video', label: 'Видео' },
      { value: 'graphic', label: 'График' },
      { value: 'text', label: 'Отдельный запрос' }
    ];
  }

  //Функция чтобы отобразить label зная value
  getLabel(value) {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].value === value) {
        return this.options[i].label;
      }
    }
    return null;
  }

  //Функция чтобы отобразить value зная label
  getValue(label) {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].label === label) {
        return this.options[i].value;
      }
    }
    return null;
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
    const type = this.getValue(type_label);
    const link = row.querySelector('td:nth-child(4)').innerText;
    const time = row.querySelector('td:nth-child(7)').innerText;
    this.setState({ sourceName: name });
    this.setState({ sourceType: type });
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
    this.setState({ sourcePeriod: '' })
  }

  componentDidMount() {
    var savedSize = localStorage.getItem('size');
    if (savedSize) {
      this.gridSize = savedSize;
    }
    var key = (localStorage.getItem("auth_user") + "-" + this.gridSize + "-" + this.id);
    var savedValue = localStorage.getItem(key);
    if (savedValue != '---' && savedValue) {
      var mass = savedValue.split('-');
      this.setState({ sourceName: mass[0] });
      this.setState({ sourceLink: mass[1] });
      this.setState({ sourceType: mass[2] });
      this.setState({ sourcePeriod: mass[3] });
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
    var key = (localStorage.getItem("auth_user") + "-" + this.gridSize + "-" + this.id);
    var value = (this.state.sourceName + '-' + this.state.sourceLink + '-' + this.state.sourceType + '-' + this.state.sourcePeriod);
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
                    <td>{this.getLabel(source.txtSourceType)}</td>
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
                <Query widget={this.gridSize + '-' + this.id}
                  name={this.state.sourceName}
                  link={this.state.sourceLink}
                  time={this.state.sourcePeriod} />
              </div>
            }
            {this.state.sourceType == "video" &&
              <>
                {this.state.isCloseVisible &&
                  <button className='close' onClick={this.handleCloseWidget}>X</button>
                }
                <Video link={this.state.sourceLink} name={this.state.sourceName} id={this.id} />
              </>
            }
            {this.state.sourceType == "graphic" &&
              <div className='graphic'>
                {this.state.isCloseVisible &&
                  <button className='close' style={{ left: '-95px' }} onClick={this.handleCloseWidget}>X</button>
                }
                <Graphic widget={this.gridSize + '-' + this.id}
                  name={this.state.sourceName}
                  link={this.state.sourceLink}
                  time={this.state.sourcePeriod} />
              </div>
            }
          </>
        }
      </>
    );
  }
}

export default Widget;