import { UserFollowingsProps, UserProps } from "../../types/user.ts";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import "./UserFollowing.css";

interface UserFollowingPropsInterface {
  currentUserFollowing: UserFollowingsProps[];
  loadUser: (username: string) => Promise<void>;
  loadUserRepos: (username: string) => Promise<void>;
  loadUserFollowers: (username: string) => Promise<void>;
  setCurrentUser: (user: UserProps | null) => void;
  setIsActive: (active: number) => void; // Fixing the type here
}

const convertToUserProps = (
  userFollowersProps: UserFollowingsProps
): UserProps => {
  return {
    avatar_url: userFollowersProps.avatar_url,
    login: userFollowersProps.login,
    location: "", // Preencha com um valor adequado
    followers: 0, // Preencha com um valor adequado
    following: 0, // Preencha com um valor adequado
    html_url: userFollowersProps.html_url,
    bio: "", // Preencha com um valor adequado
    name: "", // Preencha com um valor adequado
    blog: "", // Preencha com um valor adequado
  };
};

const UserFollowing = ({
  currentUserFollowing,
  loadUser,
  loadUserRepos,
  loadUserFollowers,
  setCurrentUser,
  setIsActive,
}: UserFollowingPropsInterface) => {
  return (
    <div className="user-followers-div">
      {currentUserFollowing &&
        currentUserFollowing.map((user) => (
          <div className="user-follow-profile" key={user.id}>
            <div className="user-follow-profile-login">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={user.avatar_url}
                  alt=""
                  className="user-follow-profile-img"
                />
              </a>
              <h2>{user.login}</h2>
            </div>
            <div>
              <InsertLinkIcon
                sx={{
                  background: "rgb(131, 48, 156)",
                  padding: "0.5rem",
                  borderRadius: "100%",
                  fontSize: "2.7rem",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => {
                  const userProps = convertToUserProps(user);
                  setCurrentUser(userProps);
                  setIsActive(0);
                  loadUser(user.login);
                  loadUserRepos(user.login);
                  loadUserFollowers(user.login);
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserFollowing;
