export interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: "Credit" | "Payment";
  date: string;
  icon: string;
  iconLib: "solid" | "brands";
  isPending: boolean;
  authorizedUser: string | null;
}
