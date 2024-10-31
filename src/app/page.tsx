import { UserActions } from "./overview/components/UserActions";

export default async function Home() {
  return (
    <main
      data-testid="home-page"
      className="overflow-hidden flex justify-center items-center bg-gradient-to-tl from-lime-400 to-blue-600 min-h-[calc(100vh-49px)]"
    >
      <UserActions />
    </main>
  );
}
