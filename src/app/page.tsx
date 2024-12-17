import FeedSection from "@/components/homeComponent/FeedSection";
import Header from "@/components/homeComponent/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex-1 p-4 md:ml-16">
        <div className="max-w-md mx-auto space-y-6">
          <div className="md:hidden">
            <Header />
          </div>
          <FeedSection />
        </div>
      </div>
    </div>
  );
}
