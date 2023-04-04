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
      deleteId: 0,
      deleteName: 'bruh'
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
              <tr onContextMenu={this.handleRightClick} key={source.intSourceId}>
                <td>{source.intSourceId}</td>
                <td>{source.txtSourceName}</td>
                <td>{source.txtSourceType}</td>
                <td>{source.txtSourceLink}</td>
                {this.state.menuVisible && (
                  <div
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
                    <button>Edit</button>
                    <button onClick={this.handleDeleteButtonClick.bind(this, source.intSourceId)}>Delete</button>
                  </div>
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