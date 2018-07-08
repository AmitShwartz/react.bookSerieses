import React from "react";
import { Route } from "react-router-dom";
import SeriesesList from "../Components/SeriesesList";
import SeriesByName from "../Components/SeriesByName";
import ByGenreAuthor from "../Components/ByGenreAuthor";
import Header from "../Header";

const ReactRouter =()=>{
    return (
        <React.Fragment>
        <Header/>
            <Route exact path="/" component={SeriesesList} />
            <Route exact path="/seriesByName/db_usr/" component={SeriesByName} />
            <Route exact path="/seriesesByParamsGA/db_usr/" component={ByGenreAuthor} />
        </React.Fragment>
    );}

export default ReactRouter;