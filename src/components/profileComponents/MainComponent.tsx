import MainProfile from "./MainProfile";

interface MainComponentProps {
  params: {
    userId: string;
  };
}

export default function MainComponent({ params }: MainComponentProps) {
  const { userId } = params;

  return (
    <div className=" bg-gray-100 min-h-screen">
      <MainProfile userId={userId} />
    </div>
  );
}
