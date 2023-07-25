import { useState } from "react";
import { Search, UserInfos, UserProjects } from "../../components";
import { UserProps, UserReposProps } from "../../types/user.ts";
import logo from "../../assets/logodark.png";
import "./Home.css";

const Home = () => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [currentUserRepos, setCurrentUserRepos] = useState<
    UserReposProps[] | null
  >(null);

  const loadUser = async function (userName: string) {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    const data = await response.json();
    setCurrentUser(data);
  };

  const loadUserRepos = async function (userName: string) {
    const responseRepos = await fetch(
      `https://api.github.com/users/${userName}/repos`
    );
    const dataRepos = await responseRepos.json();
    setCurrentUserRepos(dataRepos);
  };

  return (
    <>
      <div className="find-bar">
        <img src={logo} alt="logo" className="logo" />
        <Search loadUser={loadUser} loadUserRepos={loadUserRepos} />
      </div>
      {currentUser && currentUserRepos && (
        <div className="user">
          <UserInfos {...currentUser} />

          <UserProjects currentUserRepos={currentUserRepos} />
        </div>
      )}
    </>
  );
};

export default Home;
