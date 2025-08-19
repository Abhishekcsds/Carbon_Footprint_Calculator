import React from "react";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = ({ contributions }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Contribution of Each Factor",
      fontSize: 22,
      fontFamily: "Rubik, sans-serif",
    },
    subtitles: [
      {
        text: "🍃",
        verticalAlign: "center",
        fontSize: 50,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}%",
        yValueFormatString: "##0.0'%'",
        dataPoints: contributions.map(({ name, y }) => ({ 
          name, 
          y: parseFloat(y.toFixed(1)) 
        })),
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default DoughnutChart;