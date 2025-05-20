import QnABox from "@/app/Components/AiClass";

export default function HomePage() {
  return (
    <main className="space-y-10">
      <h1 className="text-3xl font-bold text-center">
        Welcome to the Learning Platform
      </h1>
      <QnABox />
    </main>
  );
}
