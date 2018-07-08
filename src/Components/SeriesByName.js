import React, {Component} from 'react'




class SeriesByName extends Component {
  constructor(props) {
    super(props);
    this.state ={ 
            "seriesName": "",
            "author": "",
            "genre": [],
            "releaseYear": "",
            "books": []
    }
    this.eachGenre = this.eachGenre.bind(this);
    this.eachBook = this.eachBook.bind(this);
  }

//fetch the serieses with the seriesName specified by post
 componentWillMount() {
    const url = "https://books-series.herokuapp.com/seriesByName/db_usr";
    fetch(url,{
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: 'seriesName=Harry Potter'           //example
        }).then((res) => { return res.json() }).then((data) => {
            console.log(data);
            this.setState({
                seriesName: data.seriesName,
                author: data.author,
                genre: data.genre,
                releaseYear: data.releaseYear,
                books: data.books}
            ); 
    }).catch(error => console.error(`Fetch Error =\n`, error));
  }

  
  eachBook(book,i){
    return(
    <li className="list-group-item" key={'book'+ i} index={i}>{book.bookName} , releaseYear: {book.releaseYear}</li>
    )
  }

  eachGenre(genre, i){
    return (` ${genre},`)
  }


  render() {
      return (
        <main role="main">
      
            <div className= "headLine"><h3> {this.state.seriesName}</h3></div>
            <div className="card-body">
                <p className="card-text"><b>Author:</b> {this.state.author}</p>
                <p className="card-text"><b>Genre:</b>{this.state.genre.map(this.eachGenre)}</p>
                <p className="card-text"><b>Published:</b>{this.state.releaseYear}</p>  
                <h4>Books</h4>          
                <ul className="list-group list-group-flush">
                    {this.state.books.map(this.eachBook)}
                </ul>   
            </div>
        </main>
      )
  }
}
export default SeriesByName
