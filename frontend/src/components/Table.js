import '../css/Table.css'
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
      deleteName: 'bruh',
      updateId:0,
      updatename:'',
      updatetype:'',
      updatelink:'',
      updatelogin:'',
      updatepassword:'',
      updateperiod:0
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

  handleDeleteButtonClick(id) {
    this.setState({ deleteId: id });
    this.setState({ isPopupVisible: true });
    // const source = this.state.sources.find((source) => source.intSourceId == this.state.deleteId);
    // console.log(source); //Попытки вывести название удаляемого сурса - deleteId и intSourceId почему то разные
  }

  handleUpdateButtonClick(id, name, type, link, log, pass, time) {
    this.setState({ updateId: id });
    this.setState({ updatename: name });
    this.setState({ updatetype: type});
    this.setState({ updatelink: link});
    this.setState({ updatelogin: log});
    this.setState({ updatepassword: pass });
    this.setState({ updateperiod:  time});
    this.setState({ isUpdateVisible: true });
    
  }

  handleRightClick(e) {
    e.preventDefault();
    this.setState({ menuVisible: true });
    this.setState({ menuX: e.clientX });
    this.setState({ menuY: e.clientY });
  }

  handleMenuClick() {
    this.setState({ menuVisible: false });
  }

  handleButtonClickClose() {
    this.setState({ isPopupVisible: false });
  }
  handleButtonClickUpdateClose() {
    this.setState({ isUpdateVisible: false });
  }

  nameChange = (event) => {
    this.setState({ updatename: event.target.value });
    //console.log(this.state.updatename)
  }
  typeChange = (event) => {
    this.setState({ updatetype: event.target.value });

  }
  linkChange = (event) => {
    this.setState({ updatelink: event.target.value });
  
  }
  loginChange = (event) => {
    this.setState({ updatelogin: event.target.value });

  }
  passChange = (event) => {
    this.setState({ updatepassword: event.target.value });

  }
  timeChange = (event) => {
    this.setState({ updateperiod: event.target.value });

  }


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

  handleButtonUpdate(id, name, type, link, login, pass, time) { // ТУТ ТИПА ПРОИСХОДИТ ИЗМЕНЕНИЕ, КАКОЙ БЫ МЕТОД Я НЕ ВЫБРАЛ(КРОМЕ PUT), ВЫВОДИТ ОШИБКУ
    fetch(`http://localhost/DashboardWeb/yii2-basic/web/source/update/?id=${id}&name=${name}&type=${type}&link=${link}&login=${login}&pass=${pass}&time=${time}`, {
      method: "DELETE",
    })
      .then(() => {
        this.fetchSources();
      })
      .catch(error => console.log(error));
    this.setState({ isUpdateVisible: false });
  }

  handleRightClick = this.handleRightClick.bind(this);
  handleMenuClick = this.handleMenuClick.bind(this);

  render() {
    return (
      <div>
        
        {this.state.isPopupVisible &&
          <div className="popup">
            <label className='text'>Ты уверен, другалёк?<br/>
             Удалить {}? </label>

            <button className='but1' onClick={this.handleButtonDelete.bind(this, this.state.deleteId)}>Да</button>
            <button className='but2' onClick={this.handleButtonClickClose.bind(this)}>Нет</button>
          </div>
        }
        {this.state.isUpdateVisible &&
          <div className="popup1">
            Введите имя
            <input type="text" value={this.state.updatename} onChange={this.nameChange} /> 
            Введите тип
            <input type="text" value={this.state.updatetype} onChange={this.typeChange} /> 
            Введите ссылку
            <input type="text" value={this.state.updatelink} onChange={this.linkChange} /> 
            Введите логин
            <input type="text" value={this.state.updatelogin} onChange={this.loginChange} /> 
            Введите пароль
            <input type="text" value={this.state.updatepassword} onChange={this.passChange} /> 
            Введите период обновления
            <input type="text" value={this.state.updateperiod} onChange={this.timeChange} /> 

            <button className='but11' onClick={this.handleButtonUpdate.bind(this, this.state.updateId , this.state.updatename,this.state.updatetype,
              this.state.updatelink, this.state.updatelogin, this.state.updatepassword, this.state.updateperiod)}>Сохранить</button>
            <button className='but22' onClick={this.handleButtonClickUpdateClose.bind(this)}>Отмена</button>
          </div>
        }
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.state.sources.map(source => (
              <tr onContextMenu={this.handleRightClick}  key={source.intSourceId}>
                <td>{source.intSourceId}</td>
                <td>{source.txtSourceName}</td>
                <td>{source.txtSourceType}</td>
                <td>{source.txtSourceLink}</td>
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
                      source.txtSourceLogin, source.txtSourcePassword,source.intTimePeriod )}>Edit</button>
                    <button onClick={this.handleDeleteButtonClick.bind(this, source.intSourceId )}>Delete</button>
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