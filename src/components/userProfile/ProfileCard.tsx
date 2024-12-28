interface ProfileCardProps {
  profileData: {
    username: string;
    profilePicture: string;
    profilePictureType: string;
    role?: string;
    email?: string;
  };
}

const ProfileCard = ({ profileData }: ProfileCardProps) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center space-y-4 md:space-x-6 gap-x-4">
      <img
        src={`data:${profileData.profilePictureType};base64,${profileData.profilePicture}`}
        alt="Profile Picture"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h1 className="text-2xl font-semibold">{profileData.username}</h1>
        
      </div>
    </div>
  );
};

export default ProfileCard;
