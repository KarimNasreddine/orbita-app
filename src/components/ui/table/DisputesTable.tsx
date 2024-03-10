import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";

import { Montserrat } from "next/font/google";

import { Button } from "@/components/ui/button/CustomButton";

interface DisputesTableProps {}

const montserrat = Montserrat({ subsets: ["latin"] });

const DisputesTable: FC<DisputesTableProps> = ({}) => {
  return (
    <>
      <div
        className={`${montserrat.className} border rounded-lg overflow-auto`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contract Name</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Resolved Date</TableHead>
              <TableHead>Verdict</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-gray-100 !overflow-y-auto">
            <TableRow>
              <TableCell>ALIEXPRESS.COM</TableCell>
              <TableCell>988</TableCell>
              <TableCell>$30 USDC</TableCell>
              <TableCell>JANUARY 3RD 2025</TableCell>
              <TableCell>
                <Button className="btn-not-in-your-favour">
                  Not in your favour
                </Button>
              </TableCell>
              <TableCell>
                <Button variant={"link"}>View details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ALIEXPRESS.COM</TableCell>
              <TableCell>987</TableCell>
              <TableCell>$80 USDC</TableCell>
              <TableCell>JANUARY 3RD 2025</TableCell>
              <TableCell>
                <Button className="btn-in-your-favour">In your favour</Button>
              </TableCell>
              <TableCell>
                <Button variant={"link"}>View details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ALIEXPRESS.COM</TableCell>
              <TableCell>987</TableCell>
              <TableCell>$80 USDC</TableCell>
              <TableCell>JANUARY 3RD 2025</TableCell>
              <TableCell>
                <Button className="btn-in-your-favour">In your favour</Button>
              </TableCell>
              <TableCell>
                <Button variant={"link"}>View details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ALIEXPRESS.COM</TableCell>
              <TableCell>987</TableCell>
              <TableCell>$80 USDC</TableCell>
              <TableCell>JANUARY 3RD 2025</TableCell>
              <TableCell>
                <Button className="btn-in-your-favour">In your favour</Button>
              </TableCell>
              <TableCell>
                <Button variant={"link"}>View details</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ALIEXPRESS.COM</TableCell>
              <TableCell>987</TableCell>
              <TableCell>$80 USDC</TableCell>
              <TableCell>JANUARY 3RD 2025</TableCell>
              <TableCell>
                <Button className="btn-in-your-favour">In your favour</Button>
              </TableCell>
              <TableCell>
                <Button variant={"link"}>View details</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DisputesTable;
