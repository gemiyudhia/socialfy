import MainComponent from "@/components/profileComponents/MainComponent";

interface ProfilePageProps {
  params: {
    userId: string;
  };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div>
      <MainComponent params={params} />
    </div>
  );
}
