import React, {Component} from 'react'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import MdSave from 'react-icons/lib/md/save'



class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing:false
    }
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.renderUI   = this.renderUI.bind(this);
    this.renderForm   = this.renderForm.bind(this);
  }
  edit () {
    this.setState({
      editing:true
    });
  }
  delete() {
    this.props.onDelete(this.props.index) ;
  }
  save(e) {
    e.preventDefault();
    this.props.onChange(this.newSeries.value,this.props.index);
    this.setState({
      editing:false
    })
  }


    renderForm() {
    return (
       <div>
        <form onSubmit={this.save}>
          <textarea ref={
            (input) => {
              this.newSeries=input;
            }
          }/>
          <button><MdSave onClick={this.save}/></button>
        </form>
      </div>
    )
  }

  renderUI() {
    return (
    <div className='series'>
      <div>{this.props.children}</div>
      <div className="btn-group">
          <button className="btn btn-sm btn-outline-secondary" onClick={this.edit}><MdEdit/></button>
          <button className="btn btn-sm btn-outline-secondary" onClick={this.delete}><MdDelete/></button>
        </div>
    </div>
    );
  }


  render() {
      return (
        this.state.editing ? this.renderForm() : this.renderUI()
      )
  }
}
export default Series