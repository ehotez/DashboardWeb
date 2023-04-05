import '../css/SourceTable.css'
import React, { } from 'react';


class SourceTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sources: [],
      menuVisible: false,
      menuX: 0,
      menuY: 0,
      isPopupVisible: false,
      isUpdateVisible: false,
      deleteId: 0,
      deleteName: '',
      updateId: 0,
      updateName: '',
      updateType: '',
      updateLink: '',
      updateLogin: '',
      updatePassword: '',
      updatePeriod: 0
    };
    this.menuRef = React.createRef();
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
        menuVisible: false,
      });
    }
  };

  fetchSources() {
    fetch('http://localhost/DashboardWeb/yii2-basic/web/source/')
      .then(response => response.json())
      .then(data => this.setState({ sources: data }))
      .catch(error => console.log(error));
  }

  handleDeleteButtonClick() { this.setState({ isPopupVisible: true }); }
  handleUpdateButtonClick() { this.setState({ isUpdateVisible: true }); }

  //При нажатии правой кнопкой мыши по строке заполняются все данные об этой строке в state переменные
  handleRightClick(e) {
    e.preventDefault();
    const row = e.target.parentNode;
    const id = row.querySelector('td:first-child').innerText;
    const name = row.querySelector('td:nth-child(2)').innerText;
    const type = row.querySelector('td:nth-child(3)').innerText;
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

    this.setState({ menuVisible: true });
    this.setState({ menuX: e.clientX });
    this.setState({ menuY: e.clientY });
  }
  handleMenuClick() {
    this.setState({ menuVisible: false });
  }
  handleButtonDeleteClose() {
    this.setState({ isPopupVisible: false });
  }
  handleButtonUpdateClose() {
    this.setState({ isUpdateVisible: false });
  }

  nameChange = (event) => { this.setState({ updateName: event.target.value }); }
  typeChange = (event) => { this.setState({ updateType: event.target.value }); }
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

  handleRightClick = this.handleRightClick.bind(this);
  handleMenuClick = this.handleMenuClick.bind(this);

  render() {
    return (
      <div>
        {this.state.isPopupVisible &&
          <div className="popup-delete">
            <label className='text'>Ты уверен, другалёк?<br/>
              Удалить {this.state.deleteName}? </label>
            <button className='but-delete' onClick={this.handleButtonDelete.bind(this, this.state.deleteId)}>Да</button>
            <button className='but-delete-close' onClick={this.handleButtonDeleteClose.bind(this)}>Нет</button>
          </div>
        }
        {this.state.isUpdateVisible &&
          <div className="popup-edit">
            Введите имя
            <input type="text" value={this.state.updateName} onChange={this.nameChange} />
            Введите тип
            <input type="text" value={this.state.updateType} onChange={this.typeChange} />
            Введите ссылку
            <input type="text" value={this.state.updateLink} onChange={this.linkChange} />
            Введите логин
            <input type="text" value={this.state.updateLogin} onChange={this.loginChange} />
            Введите пароль
            <input type="text" value={this.state.updatePassword} onChange={this.passChange} />
            Введите период обновления
            <input type="text" value={this.state.updatePeriod} onChange={this.timeChange} />

            <button className='but-update' onClick={this.handleButtonUpdate.bind(this, this.state.updateId, this.state.updateName, this.state.updateType,
              this.state.updateLink, this.state.updateLogin, this.state.updatePassword, this.state.updatePeriod)}>Сохранить</button>
            <button className='but-update-close' onClick={this.handleButtonUpdateClose.bind(this)}>Отмена</button>
          </div>
        }
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sources.map(source => (
              <tr onContextMenu={this.handleRightClick} key={source.intSourceId}>
                <td className='view-off'>{source.intSourceId}</td>
                <td>{source.txtSourceName}</td>
                <td>{source.txtSourceType}</td>
                <td>{source.txtSourceLink}</td>
                <td className='view-off'>{source.txtSourceLogin}</td>
                <td className='view-off'>{source.txtSourcePassword}</td>
                <td className='view-off'>{source.intTimePeriod}</td>
                {this.state.menuVisible && (
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
                    onClick={this.handleMenuClick}
                  >
                    <button onClick={this.handleUpdateButtonClick.bind(this, source.intSourceId, source.txtSourceName, source.txtSourceType, source.txtSourceLink,
                      source.txtSourceLogin, source.txtSourcePassword, source.intTimePeriod)}>Edit</button>
                    <button onClick={this.handleDeleteButtonClick.bind(this)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SourceTable;