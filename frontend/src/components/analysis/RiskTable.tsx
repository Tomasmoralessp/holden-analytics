import React from "react";
import { RiskCustomer } from "@/types/analysis";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface RiskTableProps {
  customers: RiskCustomer[];
}

const RiskTable: React.FC<RiskTableProps> = ({ customers }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-holden-dark">Top clientes en riesgo</h3>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Cliente</TableHead>
              <TableHead>Probabilidad de Churn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((c, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{c.id}</TableCell>
                <TableCell className="text-holden-cyan font-semibold">
                  {(c.risk_score * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RiskTable;
