import type { Metadata } from "next";
import NewsList from "./components/newslist/NewsList";

export default function IndexPage() {
  return <NewsList />;
}

export const metadata: Metadata = {
  title: "Besider",
};
