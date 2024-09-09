"use client";

import { useState, useEffect } from "react";
import { Locale } from "@/i18n-config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDictionary } from "@/get-dictionary";
import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 border border-gray-300 rounded shadow">
        <p className="label font-bold">{`day ${label}`}</p>
        {payload.map((pld: any, index: number) => (
          <p key={index} style={{ color: pld.color }}>
            {`${pld.name} : ${pld.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};
// Define an interface for the dictionary structure
interface Dictionary {
  title: string;
  description: string;
  header: { features: string; comingSoon: string };
  hero: {
    title: string;
    description1: string;
    description2: string;
    startLearning: string;
    watchDemo: string;
  };
  features: {
    spacedRepetition: any; // Replace 'any' with a more specific type if possible
  };
  footer: any; // Replace 'any' with a more specific type if possible
}

export default function SpacedRepetitionPage() {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const params = useParams();
  const lang = params.lang as Locale;

  useEffect(() => {
    getDictionary(lang).then((dict: Dictionary) => setDictionary(dict));
  }, [lang]);

  if (!dictionary)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  const {
    features: { spacedRepetition: d },
  } = dictionary;

  const data = [
    { name: "day 0", day: 0, learn0: 100 },
    { name: "day 1", day: 1, learn0: 80, learn1: 100 },
    { name: "day 2", day: 2, learn0: 68.2, learn1: 87 },
    { name: "day 3", day: 3, learn0: 60, learn1: 79.5, learn2: 100 },
    { name: "day 4", day: 4, learn1: 72.5, learn2: 91 },
    { name: "day 5", day: 5, learn1: 68, learn2: 85 },
    { name: "day 6", day: 6, learn1: 63, learn2: 80, learn3: 100 },
    { name: "day 7", day: 7, learn1: 60, learn2: 76, learn3: 94 },
  ];

  const percentage0 = 100 - ((4 - 1 - 1) / (4 - 1)) * 100;
  const percentage1 = 100 - ((7 - 2 - 1) / (7 - 1)) * 100;
  const percentage2 = 100 - ((5 - 3 - 1) / (5 - 1)) * 100;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{d.title}</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{d.whatIs.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{d.whatIs.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{d.algorithm.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{d.algorithm.description}</p>
            <ul className="list-disc list-inside mt-2">
              {d.algorithm.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{d.howItWorks.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside">
              {d.howItWorks.steps.map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          {d.retentionCurve.title}
        </h2>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25, // Increased bottom margin to accommodate the label
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="day"
                label={{
                  value: "Elapsed time (days)",
                  position: "insideBottomRight",
                  offset: -10,
                }}
              />
              <YAxis
                label={{
                  value: "Memory retention (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[60, 100]}
                ticks={[60, 70, 80, 90, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="learn0" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#00A3E0" />
                  <stop offset={`${percentage0}%`} stopColor="#00A3E0" />
                  <stop offset={`${percentage0}%`} stopColor="#8B8B8B" />
                  <stop offset="100%" stopColor="#8B8B8B" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="learn0"
                name="First learned"
                stroke="url(#learn0)"
                strokeWidth={2}
                dot={false}
              />
              <defs>
                <linearGradient id="learn1" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#00A3E0" />
                  <stop offset={`${percentage1}%`} stopColor="#00A3E0" />
                  <stop offset={`${percentage1}%`} stopColor="#8B8B8B" />
                  <stop offset="100%" stopColor="#8B8B8B" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="learn1"
                name="First reviewed"
                stroke="url(#learn1)"
                strokeWidth={2}
                dot={false}
              />
              <defs>
                <linearGradient id="learn2" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#00A3E0" />
                  <stop offset={`${percentage2}%`} stopColor="#00A3E0" />
                  <stop offset={`${percentage2}%`} stopColor="#8B8B8B" />
                  <stop offset="100%" stopColor="#8B8B8B" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="learn2"
                name="Second reviewed"
                stroke="url(#learn2)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="learn3"
                name="Third reviewed"
                stroke="#00A3E0"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          {d.retentionCurve.description}
        </p>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{d.chartExplanation.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{d.chartExplanation.description}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{d.chartExplanation.optimizedReviews}</li>
            <li>{d.chartExplanation.avoidEarlyReviews}</li>
            <li>{d.chartExplanation.maximizePerformance}</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{d.benefits.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            {d.benefits.list.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}