import Axios from "axios";

const toggleMyList = async (event, imdbCode) => {
  if (event === "add") {
    await Axios.post(
      `/favorite`,
      {
        imdbID: imdbCode,
      },
      { withCredentials: true }
    );
  } else {
    await Axios.post(
      `/favorite/delete`,
      {
        imdbID: imdbCode,
      },
      { withCredentials: true }
    );
  }
};
export { toggleMyList };
