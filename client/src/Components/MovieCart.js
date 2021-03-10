import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StarIcon from "@material-ui/icons/Star";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";
import { DataContext } from "../Context/AppContext";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import { toggleMyList } from "../Assets/toggleMyList";
import { GetListMovieFavorite } from "../Assets/GetListMovieFavorite";
export const MovieCart = (props) => {
  let history = useHistory();
  const location = useLocation();
  const ctx = React.useContext(DataContext);
  const [movie, setMovie] = React.useState(props.movie);
  return (
    <div className='PostMovie' style={props.style ? { ...props.style } : {}}>
      <div className='movieImage'>
        <img src={movie.image} alt='movie' />
        <div className='moreInfoMovie'>
          <p style={{ color: "white", padding: "6px", border: "1px solid white", position: "absolute", top: "10px", right: "10px", borderRadius: "8px", fontSize: "15px" }}>
            {movie.language.toUpperCase()}
          </p>
          <p
            style={{
              color: "white",
              fontSize: "15px",
              marginLeft: "15px",
              marginRight: "15px",
              marginBottom: "5px",
              marginTop: "35px",
              lineHeight: "20px",
              wordBreak: "break-all",
            }}>{`gender : ${movie.genres.toString()}`}</p>
          <Divider style={{ backgroundColor: "#e8eae6", width: "90%", marginTop: "15px", display: "flex", marginLeft: "auto", marginRight: "auto", height: "0.3px" }} />
          <p style={{ color: "white", fontSize: "16px", overflow: "auto", maxHeight: "200px", marginLeft: "15px", marginRight: "15px", maxHeight: "180px" }}>{movie.description}</p>
          <div style={{ width: "100%", height: "55px", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
            <Button
              variant='contained'
              startIcon={<PlayArrowIcon style={{ fontSize: "25px" }} />}
              onClick={(e) => {
                if (ctx.ref.setMovieInfo && props.callBack) ctx.ref.setMovieInfo("");
                history.push(`/movie/${movie.imdbCode}`);
              }}
              style={{
                backgroundColor: "#ec4646",
                color: "white",
                textTransform: "none",
                fontSize: "12px",
              }}>
              Watch
            </Button>
            <Button
              variant='contained'
              startIcon={movie.isFavorite ? <DeleteOutlineIcon style={{ fontSize: "25px" }} /> : <AddIcon style={{ fontSize: "20px" }} />}
              onClick={async (e) => {
                if (movie.isFavorite) toggleMyList("remove", movie.imdbCode);
                else toggleMyList("add", movie.imdbCode);
                setMovie((oldValue) => ({ ...oldValue, isFavorite: movie.isFavorite ? false : true }));
              }}
              style={{
                backgroundColor: "rgba(34, 40, 49, 0.86)",
                color: "white",
                textTransform: "none",
                fontSize: "12px",
              }}>
              {movie.isFavorite ? ctx.Languages[ctx.Lang].RemoveFromMyList : ctx.Languages[ctx.Lang].AddToList}
            </Button>
          </div>
        </div>
      </div>
      <p>{movie.titre}</p>
      <div>
        <p>{movie.year}</p>
        <p>{movie.runtime} Min</p>
        <Divider orientation='vertical' style={{ height: "14px", backgroundColor: "#6b6b6b" }} />
        <div className='PostRating'>
          <StarIcon style={{ color: "#ffb400", fontSize: "20px", marginRight: "5px" }} /> <p style={{ color: "#ffb400", fontSize: "14px", margin: "0px" }}>{movie.rating}</p>
        </div>
        {/* {movie.isWatched ? <VisibilityIcon style={{ color: `${movie.isWatched ? "#ec4646" : "#636161"}`, fontSize: "17px", marginRight: "5px" }} /> : ""} */}
        <VisibilityIcon style={{ color: `${movie.isWatched ? "#ec4646" : "#636161"}`, fontSize: "17px", marginRight: "5px" }} />
      </div>
    </div>
  );
};
