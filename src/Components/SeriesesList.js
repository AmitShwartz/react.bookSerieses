import React, {Component} from 'react'
import Series from './Series'



class SeriesesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serieses: []
    }
    this.eachSeries   = this.eachSeries.bind(this);
    this.update     = this.update.bind(this);
    this.delete     = this.delete.bind(this);
    this.add        = this.add.bind(this);
    this.nextID     = this.nextID.bind(this);
    this.eachGenre = this.eachGenre.bind(this);
    this.eachBook = this.eachBook.bind(this);
  }
  
//add series to array of serieses
  add(series) {
    this.setState(prevState => ({
      serieses: [
      ...prevState.serieses,
      {
          id: this.nextID(),
          seriesName: series.seriesName,
          author: series.author,
          genre: series.genre,
          releaseYear: series.releaseYear,
          books: series.books
      }]
    }))
  }

//create id for each series
  nextID() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }

// fetch all serieses from the specified url
  componentWillMount() {
    const url = "https://books-series.herokuapp.com/allSerieses/db_usr";
    fetch(url).then((res) => { return res.json() }).then((data) => {
          var self=this;
          console.log(data);
          data.map((data) => {
            self.add(data);
          });
    });
  }
 
//update series name
  update(newSeries, i) {
    this.setState(() => ({
      serieses: this.state.serieses.map(
        (series) => (series.id !== i) ? series : {...series, seriesName: newSeries}
      )
    }))
  }    

  delete(id){
    this.setState(prevState => ({
        serieses: prevState.serieses.filter(el => el.id !== id )
      }));
  }

  eachGenre(genre, i){
    return (` ${genre},`)
  }

 // return a <li> of books for each series
  eachBook(book,i){
    return(
    <li className="list-group-item" key={'book'+ i} index={i}>{book.bookName} , releaseYear: {book.releaseYear}</li>
    )
  }

// create card for each series
  eachSeries (series,i) {
    return (          
      <div className="col-md-4" key={'item'+ i} index={i}>
        <div className="card mb-4 box-shadow">
          <Series key={'series'+ i} index={i} onChange={this.update} onDelete={this.delete}>
            <div className= "headLine"><h3> {series.seriesName}</h3></div>
            <div className="card-body">
              <p className="card-text"><b>Author:</b> {series.author}</p>
              <p className="card-text"><b>Genre:</b>{series.genre.map(this.eachGenre)}</p>
              <p className="card-text"><b>Published:</b>{series.releaseYear}</p>  
              <h4>Books</h4>          
              <ul className="list-group list-group-flush">
                {series.books.map(this.eachBook)}
              </ul>   
            </div>
          </Series>
        </div>
      </div>
      )
  }

  render() {
      return (
        <main role="main">
          <section className="jumbotron text-center">
            <div className="container">
              <h1 className="jumbotron-heading"><font color="orange">B</font>ook <font color="orange">S</font>erieses</h1>
              <p className="lead text-muted">This Amazon library will alow you to find all of the famuos Book serieses, enjoy! </p>
            </div>
          </section>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                 {this.state.serieses.map(this.eachSeries)}
              </div>
            </div>
          </div>
        </main>
      )
  }
}
export default SeriesesList
