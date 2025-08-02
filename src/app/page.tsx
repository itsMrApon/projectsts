import { Metadata } from "next";
import HomeOnePage from "./(homes)/digital-agency/page";

export const metadata: Metadata = {
  title: "STS - Home Page",
};

export default function Home() {
  return (
    <>
      <HomeOnePage />
    </>
  );
}
