import MainPage from "@/components/MainPage";

export default function Home({ searchParams }: { searchParams: any }) {
  return (
    <MainPage searchParams={searchParams}/>
  );
}
