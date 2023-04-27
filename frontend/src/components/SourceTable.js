import '../css/SourceTable.css'
import Select from 'react-select';
import React, { } from 'react';
import { FiHelpCircle } from 'react-icons/fi'
import $ from 'jquery';

class SourceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      isMenuVisible: false,
      menuX: 0,
      menuY: 0,
      isPopupVisible: false,
      isUpdateVisible: false,
      isAddVisible: false,
      deleteId: 0,
      deleteName: '',
      updateId: 0,
      updateName: '',
      updateType: '',
      updateLink: '',
      updateLogin: '',
      updatePassword: '',
      updatePeriod: 0,
      isSelectVisible: false
    };
    this.options = [
      { value: 'video', label: 'Видео' },
      { value: 'graphic', label: 'График' },
      { value: 'text', label: 'Отдельный запрос' }
    ];
    this.menuRef = React.createRef();
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

  componentDidMount() {
    this.fetchSources();
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
      this.setState({
        isMenuVisible: false,
      });
    }
  };

  fetchSources() {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/get-sources/?userId=${localStorage.getItem('auth_user')}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ sources: result });
      });
  }

  handleDeleteButtonClick() { this.setState({ isPopupVisible: true }); }
  handleUpdateButtonClick() { this.setState({ isUpdateVisible: true }); }
  handleAddButtonClick() { this.setState({ isAddVisible: true }); }

  handleDeleteButtonClose() { this.setState({ isPopupVisible: false }); }
  handleUpdateButtonClose() { this.setState({ isUpdateVisible: false }); }
  handleAddButtonClose() { this.setState({ isAddVisible: false }); }

  //При нажатии правой кнопкой мыши по строке заполняются все данные об этой строке в state переменные
  handleRightClick(e) {
    e.preventDefault();
    const row = e.target.parentNode;
    const id = row.querySelector('td:first-child').innerText;
    const name = row.querySelector('td:nth-child(2)').innerText;
    const type_label = row.querySelector('td:nth-child(3)').innerText;
    const type = this.getValue(type_label);
    const link = row.querySelector('td:nth-child(4)').innerText;
    const login = row.querySelector('td:nth-child(5)').innerText;
    const pass = row.querySelector('td:nth-child(6)').innerText;
    const time = row.querySelector('td:nth-child(7)').innerText;
    this.setState({ deleteId: id });
    this.setState({ deleteName: name });
    this.setState({ updateId: id });
    this.setState({ updateName: name });
    this.setState({ updateType: type });
    this.setState({ updateLink: link });
    this.setState({ updateLogin: login });
    this.setState({ updatePassword: pass });
    this.setState({ updatePeriod: time });

    this.setState({ isMenuVisible: true });
    this.setState({ menuX: e.clientX });
    this.setState({ menuY: e.clientY });
  }
  handleMenuClick() {
    this.setState({ isMenuVisible: false });
  }

  typeChange = (event) => {
    this.setState({ isSelectVisible: true });
    this.setState({ updateType: event.value });
    if (event.value === 'video') {
      $('.s-login').css('display', 'inline-block');
      $('.s-pass').css('display', 'inline-block');
      $('.s-period').css('display', 'none');
    } else {
      $('.s-login').css('display', 'none');
      $('.s-pass').css('display', 'none');
      $('.s-period').css('display', 'block');
    }
  }
  nameChange = (event) => { this.setState({ updateName: event.target.value }); }
  linkChange = (event) => { this.setState({ updateLink: event.target.value }); }
  loginChange = (event) => { this.setState({ updateLogin: event.target.value }); }
  passChange = (event) => { this.setState({ updatePassword: event.target.value }); }
  timeChange = (event) => { this.setState({ updatePeriod: event.target.value }); }

  handleButtonDelete(id) {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/delete/?id=${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.fetchSources();
      })
      .catch(error => console.log(error));
    this.setState({ isPopupVisible: false });
  }

  handleButtonUpdate(id, name, type, link, login, pass, time) {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/update-source/?id=${id}&name=${name}&type=${type}&link=${link}&login=${login}&pass=${pass}&time=${time}`, {
      method: 'POST',
    })
      .then(() => {
        this.fetchSources();
      });
    this.setState({ isUpdateVisible: false });
  }

  handleButtonAdd(userId, name, type, link, login, pass, time) {
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/add-source/?userId=${userId}&name=${name}&type=${type}&link=${link}&login=${login}&pass=${pass}&time=${time}`, {
      method: 'POST',
    })
      .then(() => {
        this.fetchSources();
      });
    // .then((response) => response.json())
    // .then((result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // });
    this.setState({ isAddVisible: false });
  }

  render() {
    return (
      <div>
        <h1>Источники</h1>
        <button className='add-button' onClick={this.handleAddButtonClick.bind(this)}>Добавить</button>
        <span className='help'>
          <button className='help-button'><FiHelpCircle /></button>
          <span className='help-popup'>Для того чтобы удалить или изменить источник, нажмите ПКМ по соответствующей строке таблицы </span>
        </span>
        {this.state.isPopupVisible &&
          <div className="popup-delete">
            <label className='text'>Подтвердите удаление.<br />
              Удалить {this.state.deleteName}? </label>
            <button className='but-delete' onClick={this.handleButtonDelete.bind(this, this.state.deleteId)}>Да</button>
            <button className='but-delete-close' onClick={this.handleDeleteButtonClose.bind(this)}>Нет</button>
          </div>
        }
        {this.state.isUpdateVisible &&
          <div className="popup-edit">
            Имя источника:
            <div className='input-setting' style={{ width: '60%' }}>
              <input type="text" value={this.state.updateName} onChange={this.nameChange} />
            </div>
            Тип источника:
            <Select
              className='input-select'
              placeholder={this.getLabel(this.state.updateType)}
              value={this.state.updateType}
              options={this.options}
              onChange={this.typeChange}
            />
            Ссылка на источник:
            <div className='input-setting' style={{ width: '90%' }}>
              <input type="text" value={this.state.updateLink} onChange={this.linkChange} />
            </div>
            <div className='s-login'>
              Логин:
              <div className='input-setting' style={{ width: '70%' }}>
                <input type="text" value={this.state.updateLogin} onChange={this.loginChange} />
              </div>
            </div>
            <div className='s-pass'>
              Пароль:
              <div className='input-setting' style={{ width: '70%' }}>
                <input type="password" value={this.state.updatePassword} onChange={this.passChange} />
              </div>
            </div>
            <div className='s-period'>
              Период обновления источника (сек):
              <div className='input-setting' style={{ width: '15%' }}>
                <input type="number" value={this.state.updatePeriod} onChange={this.timeChange} />
              </div>
            </div>

            <button className='but-update' onClick={this.handleButtonUpdate.bind(this, this.state.updateId, this.state.updateName, this.state.updateType,
              this.state.updateLink, this.state.updateLogin, this.state.updatePassword, this.state.updatePeriod)}>Сохранить</button>
            <button className='but-update-close' onClick={this.handleUpdateButtonClose.bind(this)}>Отмена</button>
          </div>
        }
        {this.state.isAddVisible &&
          <div className="popup-edit">
            Имя источника:
            <div className='input-setting' style={{ width: '60%' }}>
              <input type="text" onChange={this.nameChange} />
            </div>
            Тип источника:
            <Select
              className='input-select'
              placeholder={this.getLabel(this.state.updateType)}
              value={this.state.updateType}
              options={this.options}
              onChange={this.typeChange}
            />
            Ссылка на источник:
            <div className='input-setting' style={{ width: '90%' }}>
              <input type="text" onChange={this.linkChange} />
            </div>
            <div className='s-login'>
              Логин:
              <div className='input-setting' style={{ width: '70%' }}>
                <input type="text" onChange={this.loginChange} />
              </div>
            </div>
            <div className='s-pass'>
              Пароль:
              <div className='input-setting' style={{ width: '70%' }}>
                <input type="password" onChange={this.passChange} />
              </div>
            </div>
            <div className='s-period'>
              Период обновления источника (сек):
              <div className='input-setting' style={{ width: '15%' }}>
                <input type="number" onChange={this.timeChange} />
              </div>
            </div>

            <button className='but-update' onClick={this.handleButtonAdd.bind(this, localStorage.getItem('auth_user'), this.state.updateName, this.state.updateType,
              this.state.updateLink, this.state.updateLogin, this.state.updatePassword, this.state.updatePeriod)}>Добавить</button>
            <button className='but-update-close' onClick={this.handleAddButtonClose.bind(this)}>Отмена</button>
          </div>
        }
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
              <tr onContextMenu={this.handleRightClick.bind(this)} key={source.intSourceId}>
                <td className='view-off'>{source.intSourceId}</td>
                <td>{source.txtSourceName}</td>
                <td>{this.getLabel(source.txtSourceType)}</td>
                <td>{source.txtSourceLink}</td>
                <td className='view-off'>{source.txtSourceLogin}</td>
                <td className='view-off'>{source.txtSourcePassword}</td>
                <td className='view-off'>{source.intTimePeriod}</td>
                {this.state.isMenuVisible && (
                  <td
                    ref={this.menuRef}
                    style={{
                      position: 'fixed',
                      left: this.state.menuX,
                      top: this.state.menuY,
                      backgroundColor: 'white',
                      //border: '1px solid black',
                      //padding: '5px',
                    }}
                    onClick={this.handleMenuClick.bind(this)}
                  >
                    <button className='edit-button' onClick={this.handleUpdateButtonClick.bind(this)}>Изменить</button>
                    <button className='delete-button' onClick={this.handleDeleteButtonClick.bind(this)}>Удалить</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div >
    );
  }
}

export default SourceTable;