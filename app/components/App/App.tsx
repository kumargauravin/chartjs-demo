'use client'
import React from "react";
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineControllerChartOptions,
  InteractionAxis,
  InteractionMode,
} from "chart.js";

import { Line } from "react-chartjs-2";
import faker from "faker";
import zoomPlugin from "chartjs-plugin-zoom";
import { ZoomOptions, ZoomPluginOptions } from "chartjs-plugin-zoom/types/options";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

const zoomOptions: ZoomPluginOptions = {
  limits: {
    y: { min: 0, max: 100, minRange: 10 },
  },
  pan: {
    enabled: true,
    mode: "xy",
  },
  zoom: {
    wheel: {
      enabled: true,
    },
    pinch: {
      enabled: true,
    },
    mode: "xy",
    onZoomComplete(props:any) {
      const { chart } = props;
      // This update is needed to display up to date zoom level in the title.
      // Without this, previous zoom level is displayed.
      // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
      chart.update("none");
    },
  },
};

export const options = {
  // responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: "x" as InteractionMode,
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
    },
    zoom: zoomOptions,
  },
};

const getDaysArray = (start: string, end: string) => {
  let arr: string[] = [];
  for (
    let dt = new Date(start);
    dt <= new Date(end);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt).toDateString());
  }
  return arr;
};

const labels = getDaysArray("2020-01-10", "2023-01-20");
console.log(labels);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function App() {
  return <>{
    (typeof window !== 'undefined') && <Box sx={{height:500, "& canvas":{height:"100% !important", width:"100% !important"}}}>
    <Line options={options} data={data} /></Box>
  }</>;
}
