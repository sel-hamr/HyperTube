import Axios from "axios";
import { DataContext } from "../Context/AppContext";
export const GetUserInfo = async () => {
  const userInfo = await Axios.get(`/profile`, { withCredentials: true });
  const countMoviesWatch = await Axios.get(`/movie/count/${userInfo.data.body.userName}`, { withCredentials: true });
  const countFavorite = await Axios.get(`/favorite/count/${userInfo.data.body.userName}`, { withCredentials: true });
  return { ...userInfo.data.body, countMoviesWatch: countMoviesWatch.data.body, countFavorite: countFavorite.data.body };
};
export const UpdateUser = async (setUpdate, dataUser, setError, lang) => {
  const updateData = await Axios.put(
    `/profile`,
    {
      userName: dataUser.userName,
      email: dataUser.email,
      firstName: dataUser.firstName,
      lastName: dataUser.lastName,
    },
    { withCredentials: true }
  );
  if (updateData.data.type === "success") {
    setUpdate({ ...dataUser, middleware: true, fixFirstName: dataUser.firstName, fixLastName: dataUser.lastName, fixEmailName: dataUser.email, fixUserName: dataUser.userName });
  }
  setError({
    type: updateData.data.type,
    content: updateData.data.body[lang],
    state: true,
  });
};
