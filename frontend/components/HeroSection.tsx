"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { setTimeout } from "timers";
import { BookSkeleton } from "./BookSkeleton";

interface Props {
  content: JSX.Element;
}

const HeroSection = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      // setTimeout(() => {
        setData(jsonData);
        setIsLoading(false);
      // }, 2000);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (error) return <Section content={<p>Error: {error}</p>} />;

  return (
    <Section
      content={
        <>
          <div className="flex justify-between flex-wrap w-full">
            {isLoading ? (
              <div className="flex justify-between flex-wrap w-full">
                <BookSkeleton />
                <BookSkeleton />
                <BookSkeleton />
                <BookSkeleton />
              </div>
            ) : (
              data && data.data.map((value: any, index: number) => (
                <Card
                  key={index}
                  className="w-64 mt-4 hover:scale-105 cursor-pointer transition ease-in-out"
                >
                  <CardContent className="flex items-center justify-center p-6 h-full">
                    <span className="text-4xl font-semibold">{value}</span>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <p className="text-center mt-5">
            <Button onClick={fetchData}>Refresh</Button>
          </p>
        </>
      }
    />
  );
};

export default HeroSection;

const Section = ({ content }: Props) => {
  return (
    <section className="w-full mt-16">
      <div className="w-[80%] mx-auto">{content}</div>
    </section>
  );
};
