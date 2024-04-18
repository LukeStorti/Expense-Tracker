import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Header = ({
  name,
  profilePhoto,
  signUserOut,
}: {
  name: string;
  profilePhoto: string;
  signUserOut: () => void;
}) => {
  return (
    <div className="flex justify-between items-center w-full my-4 space-x-6">
      <div className="flex flex-col items-start space-y-2">
        <h1 className="text-3xl font-medium">{name}'s Expense Tracker</h1>
        <Button onClick={signUserOut}>Sign out</Button>
      </div>
      {profilePhoto ? (
        <Avatar className="w-32 h-32 mt-5">
          <AvatarImage src={profilePhoto} alt={name} />
        </Avatar>
      ) : (
        <h1>couldnt find image</h1>
      )}
    </div>
  );
};

export default Header;
