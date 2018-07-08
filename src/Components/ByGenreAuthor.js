import React, {Component} from 'react'




class ByGenreAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        serieses: []
      }
      this.eachSeries   = this.eachSeries.bind(this);
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
  nextID() {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  }

//fetch the serieses with the author and genre specified by post
 componentWillMount() {
    const url = "https://books-series.herokuapp.com/seriesesByParamsGA/db_usr";
    fetch(url,{
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: 'author=J. R. R. Tolkien&genre=fantasy'           //example 
        }).then((res) => { return res.json() }).then((data) => {
            var self=this;
            console.log(data);
            data.map((data) => {
                self.add(data);
               }); 
    }).catch(error => console.error(`Fetch Error =\n`, error));
  }

  
 // return a <li> of books for each series
  eachBook(book,i){
    return(
    <li className="list-group-item" key={'book'+ i} index={i}>{book.bookName} , releaseYear: {book.releaseYear}</li>
    )
  }

  eachGenre(genre, i){
    return (` ${genre},`)
  }
// create card for each series
  eachSeries (series,i) {
    return (          
      <div className="col-md-4" key={'item'+ i} index={i}>
        <div className="card mb-4 box-shadow">
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
export default ByGenreAuthor