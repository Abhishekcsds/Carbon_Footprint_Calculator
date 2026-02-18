


// import express from 'express';
// import { query } from '../config/db.js';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import dotenv from 'dotenv';

// dotenv.config();
// const router = express.Router();
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Emission factors (in kg CO2e) - specific to India
// const EMISSION_FACTORS = {
//   ELECTRICITY: 0.82, // kg CO2e per kWh
//   LPG: 42.6,         // kg CO2e per 14.2kg cylinder
//   WASTE: 0.1,          // kg CO2e per kg of waste (simplified)
// };

// // Function to generate recommendations from Gemini AI
// async function getRecommendations(data) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
//     const prompt = `
//       Based on the following monthly household carbon footprint data from a user in India, provide personalized, actionable, and concise recommendations to reduce their emissions. The user's goal is to be more sustainable.

//       **User's Data:**
//       - Total Monthly Emissions: ${data.totalEmissions.toFixed(2)} kg CO₂e
//       - Electricity Usage: ${data.electricityUsage} kWh (contributing ${data.contributions[0].y.toFixed(1)}% of emissions)
//       - LPG Cylinders: ${data.gasCylinder} (contributing ${data.contributions[1].y.toFixed(1)}% of emissions)
//       - Waste Generated: ${data.wasteGeneration} kg (contributing ${data.contributions[2].y.toFixed(1)}% of emissions)

//       **Instructions for Recommendations:**
//       1.  Start with a brief, encouraging summary of their situation.
//       2.  Focus on the highest contributing factors first.
//       3.  Provide 2-3 practical tips. For example, if electricity is high, suggest switching to LED bulbs or using energy-efficient appliances.
//       4.  Keep the entire response under 150 words.
//       5.  Format the response using Markdown with headings and bullet points for readability.
//     `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return await response.text();
//   } catch (error) {
//     console.error('Error generating recommendations from Gemini:', error);
//     return "Sorry, we could not generate recommendations at this time. Please try reducing energy consumption and using public transport.";
//   }
// }

// // Route: /api/household/save
// router.post('/save', async (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.status(401).json({ message: 'User not authenticated' });
//   }

//   const { commonFormData } = req.body;
//   const userId = req.user.id;

//   if (!commonFormData) {
//     return res.status(400).json({ message: 'Missing form data.' });
//   }

//   try {
//     // 1. Calculate CO2 Emissions
//     const elecEmissions = commonFormData.electricityUsage * EMISSION_FACTORS.ELECTRICITY;
//     const gasEmissions = commonFormData.gasCylinder * EMISSION_FACTORS.LPG;
//     const wasteEmissions = commonFormData.wasteGeneration * EMISSION_FACTORS.WASTE;
//     const totalEmissions = elecEmissions + gasEmissions + wasteEmissions;

//     // 2. Calculate contributions for the chart
//     const contributions = totalEmissions > 0 ? [
//       { name: "Electricity", y: (elecEmissions / totalEmissions) * 100 },
//       { name: "LPG Gas", y: (gasEmissions / totalEmissions) * 100 },
//       { name: "Waste", y: (wasteEmissions / totalEmissions) * 100 },
//     ] : [];

//     // 3. Save data to the database
//     const commonResult = await query(
//       `INSERT INTO household_common (user_id, electricity_usage, gas_cylinder, waste_generation) 
//        VALUES ($1, $2, $3, $4) RETURNING id`,
//       [userId, commonFormData.electricityUsage, commonFormData.gasCylinder, commonFormData.wasteGeneration]
//     );
//     const householdCommonId = commonResult.rows[0].id;

//     // 4. Generate recommendations
//     const recommendationData = { ...commonFormData, totalEmissions, contributions };
//     const recommendationText = await getRecommendations(recommendationData);

//     // 5. Save recommendation to the database
//     await query(
//       `INSERT INTO recommendations (user_id, household_common_id, recommendation) VALUES ($1, $2, $3)`,
//       [userId, householdCommonId, recommendationText]
//     );

//     // 6. Send response to frontend
//     res.status(200).json({
//       recommendation: recommendationText,
//       contributions,
//       totalEmissions,
//     });
//   } catch (error) {
//     console.error('Error saving data:', error);
//     res.status(500).json({ message: 'Error saving data' });
//   }
// });

// export default router;

import express from 'express';
import { query } from '../config/db.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Emission factors
const EMISSION_FACTORS = {
  ELECTRICITY: 0.82,
  LPG: 42.6,
  WASTE: 0.1,
};

// Gemini recommendation function
async function getRecommendations(data) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro"

    });

    const electricityPercent = data.contributions?.[0]?.y?.toFixed(1) || 0;
    const gasPercent = data.contributions?.[1]?.y?.toFixed(1) || 0;
    const wastePercent = data.contributions?.[2]?.y?.toFixed(1) || 0;

    const prompt = `
User carbon footprint (India):

Total emissions: ${data.totalEmissions.toFixed(2)} kg CO₂e
Electricity usage: ${data.electricityUsage} kWh (${electricityPercent}%)
Gas cylinders: ${data.gasCylinder} (${gasPercent}%)
Waste: ${data.wasteGeneration} kg (${wastePercent}%)

Give 3 simple actionable tips to reduce emissions.
Keep response under 120 words.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();

  } catch (error) {
    console.error("Gemini Recommendation Error:", error.message);

    return "Recommendations temporarily unavailable. Try reducing electricity use, using public transport, and minimizing waste.";
  }
}

// Route: Save household data
router.post('/save', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { commonFormData } = req.body;
  const userId = req.user.id;

  if (!commonFormData) {
    return res.status(400).json({ message: 'Missing form data.' });
  }

  try {
    const electricityUsage = Number(commonFormData.electricityUsage) || 0;
    const gasCylinder = Number(commonFormData.gasCylinder) || 0;
    const wasteGeneration = Number(commonFormData.wasteGeneration) || 0;

    const elecEmissions = electricityUsage * EMISSION_FACTORS.ELECTRICITY;
    const gasEmissions = gasCylinder * EMISSION_FACTORS.LPG;
    const wasteEmissions = wasteGeneration * EMISSION_FACTORS.WASTE;

    const totalEmissions = elecEmissions + gasEmissions + wasteEmissions;

    const contributions = totalEmissions > 0 ? [
      { name: "Electricity", y: (elecEmissions / totalEmissions) * 100 },
      { name: "LPG Gas", y: (gasEmissions / totalEmissions) * 100 },
      { name: "Waste", y: (wasteEmissions / totalEmissions) * 100 }
    ] : [];

    // Save household data
    const commonResult = await query(
      `INSERT INTO household_common 
      (user_id, electricity_usage, gas_cylinder, waste_generation)
      VALUES ($1,$2,$3,$4)
      RETURNING id`,
      [userId, electricityUsage, gasCylinder, wasteGeneration]
    );

    const householdCommonId = commonResult.rows[0].id;

    // Generate recommendations
    const recommendationText = await getRecommendations({
      electricityUsage,
      gasCylinder,
      wasteGeneration,
      totalEmissions,
      contributions
    });

    // Save recommendations
    await query(
      `INSERT INTO recommendations 
      (user_id, household_common_id, recommendation)
      VALUES ($1,$2,$3)`,
      [userId, householdCommonId, recommendationText]
    );

    res.status(200).json({
      recommendation: recommendationText,
      contributions,
      totalEmissions
    });

  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

export default router;

