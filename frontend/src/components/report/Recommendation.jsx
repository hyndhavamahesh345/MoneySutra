
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertCircle, FileDown } from "lucide-react";

const Recommendation = ({ transactions }) => {
  const [outperformanceText, setOutperformanceText] = useState("");
  const [riskAnalysisText, setRiskAnalysisText] = useState("");
  const [recommendationsText, setRecommendationsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Consider moving this to an environment variable or secure storage
  const apiKey = "AIzaSyCRjmh5VKcCnANplEe3Vloz7SmR3mEwtnA";

  useEffect(() => {
    const generateInsights = async () => {
      try {
        // Prepare the prompt for Gemini API
        const prompt = `Analyze the following transaction data and provide insights in three sections:
        1. Outperformance: Compare the portfolio performance to the S&P 500 (if benchmark data is available). If no benchmark data is available, provide a general assessment of the portfolio's potential performance based on the transactions.
        2. Risk Analysis: Assess the volatility and risk of the portfolio (if sufficient data is available). If data is insufficient, provide a general risk assessment based on the types of assets in the portfolio.
        3. Recommendations: Suggest portfolio adjustments based on the data. If data is insufficient, provide general recommendations for diversification and risk management.
        
        **Important Notes:**
        - If the data is insufficient (e.g., only one day of transactions or no benchmark data), provide approximate insights based on general market knowledge and the available data.
        - Highlight any limitations in the analysis due to insufficient data.
        - Format your response with three separate sections each starting with "SECTION1:", "SECTION2:", and "SECTION3:" respectively.
        - Keep each section concise and use simple bullet points.
        - Do not use markdown formatting like asterisks, stars, or bold text.
        - Each bullet point should start with a single bullet character "•" followed by a space.
        
        Transaction Data: ${JSON.stringify(transactions)}`;
  
        // Call Gemini API
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to generate insights");
        }
  
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
  
        // Clean all markdown formatting and normalize text
        const cleanedText = generatedText
          .replace(/\*\*/g, "") // Remove bold markdown
          .replace(/\*/g, "")   // Remove any remaining asterisks
          .replace(/_{2,}/g, "") // Remove underscores for emphasis
          .replace(/#{1,6}\s/g, ""); // Remove heading markers
        
        // Extract sections from the cleaned text
        const outperformanceMatch = cleanedText.match(/(?:SECTION1:|Outperformance:|1\.\s*Outperformance:)([\s\S]*?)(?=SECTION2:|Risk Analysis:|2\.\s*Risk|$)/i);
        const riskMatch = cleanedText.match(/(?:SECTION2:|Risk Analysis:|2\.\s*Risk[^:]*:)([\s\S]*?)(?=SECTION3:|Recommendations:|3\.\s*Rec|$)/i);
        const recommendationsMatch = cleanedText.match(/(?:SECTION3:|Recommendations:|3\.\s*Recommendations:)([\s\S]*?)(?=Limitations|$)/i);
        
        // Improved function to format text into clean bullet points
        const formatToBulletPoints = (text) => {
          if (!text) return "";
          
          // Remove any section headers that might have been included
          text = text.replace(/^(SECTION\d+:|[^:]+:)/gm, "").trim();
          
          // Split text into individual lines and clean them
          const lines = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
          
          // Process each line to ensure proper bullet point formatting
          return lines.map(line => {
            // Strip any existing bullet point format (•, -, *, numbers followed by dot)
            line = line.replace(/^[•\-\*]\s*/, "").replace(/^\d+\.\s*/, "").trim();
            
            // Skip empty lines
            if (!line) return null;
            
            // Add a single bullet point format
            return `• ${line}`;
          })
          .filter(Boolean) // Remove any null entries
          .join('\n');
        };
        
        // Process each section
        if (outperformanceMatch && outperformanceMatch[1]) {
          setOutperformanceText(formatToBulletPoints(outperformanceMatch[1]));
        } else {
          const paragraphs = cleanedText.split('\n\n').filter(p => p.trim().length > 0);
          if (paragraphs.length > 0) {
            setOutperformanceText(formatToBulletPoints(paragraphs[0]));
          }
        }
        
        if (riskMatch && riskMatch[1]) {
          setRiskAnalysisText(formatToBulletPoints(riskMatch[1]));
        } else {
          const paragraphs = cleanedText.split('\n\n').filter(p => p.trim().length > 0);
          if (paragraphs.length > 1) {
            setRiskAnalysisText(formatToBulletPoints(paragraphs[1]));
          }
        }
        
        if (recommendationsMatch && recommendationsMatch[1]) {
          setRecommendationsText(formatToBulletPoints(recommendationsMatch[1]));
        } else {
          const paragraphs = cleanedText.split('\n\n').filter(p => p.trim().length > 0);
          if (paragraphs.length > 2) {
            setRecommendationsText(formatToBulletPoints(paragraphs[2]));
          }
        }
      } catch (err) {
        console.error("Error generating insights:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (transactions && transactions.length > 0) {
      generateInsights();
    } else {
      setLoading(false);
    }
  }, [transactions]);

  const renderLoading = () => (
    <div className="flex items-center justify-center p-4">
      <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin mr-2"></div>
      <span>Loading insights...</span>
    </div>
  );

  // Improved bullet point rendering function
  const renderBulletPoints = (text) => {
    if (!text) return <p>No data available</p>;
    
    return (
      <div className="space-y-2">
        {text.split('\n').map((point, index) => {
          // Extract the bullet and content
          const bulletMatch = point.match(/^([•\-])\s*(.*)/);
          
          if (bulletMatch) {
            // If it has a bullet already, render it properly
            return (
              <div key={index} className="flex">
                <div className="flex-shrink-0 w-4">•</div>
                <div>{bulletMatch[2]}</div>
              </div>
            );
          } else {
            // If no bullet, add one
            return (
              <div key={index} className="flex">
                <div className="flex-shrink-0 w-4">•</div>
                <div>{point}</div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <Card className="md:col-span-7">
      <CardHeader>
        <CardTitle>Performance Insights</CardTitle>
        <CardDescription>
          AI-powered analysis of your investment performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Outperformance Box */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-emerald-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                Outperformance
              </Badge>
            </div>
            <h3 className="text-base font-medium mb-2">Market Benchmark</h3>
            <div className="text-sm text-muted-foreground">
              {loading ? renderLoading() : renderBulletPoints(outperformanceText)}
            </div>
          </div>

          {/* Risk Analysis Box */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary">
                <AlertCircle className="mr-1 h-3 w-3" />
                Risk Analysis
              </Badge>
            </div>
            <h3 className="text-base font-medium mb-2">Volatility Assessment</h3>
            <div className="text-sm text-muted-foreground">
              {loading ? renderLoading() : renderBulletPoints(riskAnalysisText)}
            </div>
          </div>

          {/* Recommendations Box */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-amber-500">
                <FileDown className="mr-1 h-3 w-3" />
                Recommendations
              </Badge>
            </div>
            <h3 className="text-base font-medium mb-2">Portfolio Adjustments</h3>
            <div className="text-sm text-muted-foreground">
              {loading ? renderLoading() : renderBulletPoints(recommendationsText)}
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-2 bg-red-50 text-red-600 rounded border border-red-200">
            Error generating insights: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Recommendation;