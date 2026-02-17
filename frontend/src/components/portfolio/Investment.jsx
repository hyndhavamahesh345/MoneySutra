import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, Legend } from "recharts";

const Investments = ({ bonds, mutualFunds, sips, fundTypesChartData }) => {
  // Custom label for PieChart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom Tooltip for PieChart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p className="font-semibold">{payload[0].name}</p>
          <p>₹{payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  // Colors for PieChart
  const COLORS = ["#1E3A8A","#60A5FA", "#BFDBFE", "#2563EB", ];

  return (
    <TabsContent value="investments" className="space-y-6">
      {/* Bond Details */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>Bond Details</CardTitle>
          <CardDescription>Your bond investments</CardDescription>
        </CardHeader>
        <CardContent>
          {bonds.length > 0 ? (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bond Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Credit Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bonds.map((bond, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{bond.bondName}</TableCell>
                        <TableCell>₹{parseFloat(bond.amount).toFixed(2)}</TableCell>
                        <TableCell>{bond.bondType}</TableCell>
                        <TableCell>{bond.interestRate}%</TableCell>
                        <TableCell>{bond.creditRating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={bonds.map((bond) => ({
                    name: bond.bondName,
                    amount: parseFloat(bond.amount),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No bond data available</div>
          )}
        </CardContent>
      </Card>

      {/* Mutual Fund Details */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>Mutual Fund Details</CardTitle>
          <CardDescription>Your mutual fund investments</CardDescription>
        </CardHeader>
        <CardContent>
          {mutualFunds.length > 0 ? (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fund Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>NAV</TableHead>
                      <TableHead>Units</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mutualFunds.map((fund, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{fund.fundName}</TableCell>
                        <TableCell>₹{parseFloat(fund.amount).toFixed(2)}</TableCell>
                        <TableCell>{fund.fundType}</TableCell>
                        <TableCell>{fund.nav}</TableCell>
                        <TableCell>{fund.unitsPurchased}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={mutualFunds.map((fund) => ({
                      name: fund.fundName,
                      amount: parseFloat(fund.amount),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#60A5FA" />
                  </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fundTypesChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fundTypesChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No mutual fund data available</div>
          )}
        </CardContent>
      </Card>

      {/* SIP Details */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle>SIP Details</CardTitle>
          <CardDescription>Your systematic investment plans</CardDescription>
        </CardHeader>
        <CardContent>
          {sips.length > 0 ? (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fund Name</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Duration (Years)</TableHead>
                      <TableHead>Start Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sips.map((sip, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{sip.fundName || `SIP ${index + 1}`}</TableCell>
                        <TableCell>₹{parseFloat(sip.amount).toFixed(2)}</TableCell>
                        <TableCell>{sip.frequency}</TableCell>
                        <TableCell>{sip.duration}</TableCell>
                        <TableCell>{new Date(sip.startDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={sips.map((sip) => ({
                    name: sip.fundName || `SIP ${sips.indexOf(sip) + 1}`,
                    amount: parseFloat(sip.amount),
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#60A5FA" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No SIP data available</div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Investments;