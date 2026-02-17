import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BrainCircuit, TrendingUp, TrendingDown, AlertCircle, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const recommendations = [
  {
    id: "1",
    title: "Increase Technology Exposure",
    description:
      "Based on your risk profile and market trends, we recommend increasing your technology sector allocation by 5%.",
    confidence: 85,
    timeframe: "Medium-term (3-6 months)",
    type: "sector",
    action: "buy",
    specific: "Consider adding positions in semiconductor and cloud computing stocks.",
  },
  {
    id: "2",
    title: "Reduce Exposure to Consumer Discretionary",
    description:
      "Economic indicators suggest potential pressure on consumer spending. Consider reducing your allocation to this sector.",
    confidence: 72,
    timeframe: "Short-term (1-3 months)",
    type: "sector",
    action: "sell",
    specific: "Focus on reducing luxury retail and travel-related holdings.",
  },
  {
    id: "3",
    title: "Consider Treasury Bonds",
    description:
      "To balance your portfolio risk, adding 10% allocation to short-term treasury bonds could provide stability.",
    confidence: 90,
    timeframe: "Long-term (6+ months)",
    type: "asset-class",
    action: "diversify",
    specific: "2-year Treasury notes offer attractive yields with lower interest rate risk.",
  },
];

export default function AIRecommendations() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
        <Info className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Recommendations are based on your portfolio composition, risk profile, and current market conditions.
        </p>
      </div>

      {recommendations.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div
            className={`h-1 ${
              item.action === "buy" ? "bg-emerald-500" : item.action === "sell" ? "bg-rose-500" : "bg-amber-500"
            }`}
          />
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge
                variant={item.action === "buy" ? "outline" : item.action === "sell" ? "destructive" : "secondary"}
                className="mb-2"
              >
                {item.action === "buy" && <TrendingUp className="mr-1 h-3 w-3" />}
                {item.action === "sell" && <TrendingDown className="mr-1 h-3 w-3" />}
                {item.action === "diversify" && <AlertCircle className="mr-1 h-3 w-3" />}
                {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
              </Badge>
              <div className="flex items-center">
                <BrainCircuit className="h-4 w-4 text-primary mr-1" />
                <span className="text-xs font-medium">AI Confidence</span>
              </div>
            </div>
            <CardTitle className="text-base">{item.title}</CardTitle>
            <CardDescription className="text-xs">{item.timeframe}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{item.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Confidence Score</span>
                <span className="font-medium">{item.confidence}%</span>
              </div>
              <Progress value={item.confidence} className="h-2" />
            </div>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-medium">Specific Recommendation:</p>
              <p className="text-xs mt-1">{item.specific}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              Dismiss
            </Button>
            <Button size="sm">Apply to Portfolio</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
