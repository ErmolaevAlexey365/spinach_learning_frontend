export const dataOptions = {
  experienceLevel: [
    { name: "contractor_tier.0", value: "1", label: "Entry level" },
    { name: "contractor_tier.1", value: "2", label: "Intermediate" },
    { name: "contractor_tier.2", value: "3", label: "Expert" },
  ],
  clientInfo: [
    { name: "previous_clients.0", value: "all", label: "My previous clients" },
    { name: "payment_verified.0", value: "1", label: "Payment verified" },
  ],
  clientHistory: [
    { name: "client_hires.0", value: "0", label: "No hires" },
    { name: "client_hires.1", value: "1-9", label: "1 to 9 hires" },
    { name: "client_hires.2", value: "10-", label: "10+ hires" },
  ],
  hoursPerWeek: [
    { name: "workload.0", value: "as_needed", label: "Less than 30 hrs/week" },
    { name: "workload.1", value: "full_time", label: "More than 30 hrs/week" },
  ],
  freelancerNeeded: [
    { name: "freelancers_needed.0", value: "0-1", label: "1" },
    { name: "freelancers_needed.1", value: "2-5", label: "2 to 5" },
    { name: "freelancers_needed.2", value: "6-", label: "More than 5" },
    { name: "freelancers_needed.3", value: "0-", label: "All" },
    { name: "freelancers_needed.4", value: "0-1", label: "Single freelancer" },
    { name: "freelancers_needed.5", value: "2-", label: "Multiple freelancer" },
  ],
  numberOfProposals: [
    { name: "proposals.0", value: "0-4", label: "Less than 5" },
    { name: "proposals.1", value: "5-9", label: "5 to 10" },
    { name: "proposals.2", value: "10-14", label: "10 to 15" },
    { name: "proposals.3", value: "15-19", label: "15 to 20" },
    { name: "proposals.4", value: "20-49", label: "20 to 50" },
  ],
  connectNeeded: [
    { name: "connect_price.0", value: "0-2", label: "2 or less Connects" },
    { name: "connect_price.1", value: "4", label: "4 Connects" },
    { name: "connect_price.2", value: "6", label: "6 Connects" },
  ],
  projectLength: [
    { name: "duration_v3.0", value: "weeks", label: "Less than 1 month" },
    { name: "duration_v3.1", value: "months", label: "1 to 3 month" },
    { name: "duration_v3.2", value: "semester", label: "3 to 6 month" },
    { name: "duration_v3.3", value: "ongoing", label: "More than 6 month" },
  ],
  category: [
    {
      name: "category2_uid.0",
      value: "531770282584862721",
      label: "Accounting & Consulting",
    },
    {
      name: "category2_uid.1",
      value: "531770282580668416",
      label: "Admin Support",
    },
    {
      name: "category2_uid.2",
      value: "531770282580668417",
      label: "Customer Service",
    },
    {
      name: "category2_uid.3",
      value: "531770282580668420",
      label: "Data Science & Analytics",
    },
    {
      name: "category2_uid.4",
      value: "531770282580668421",
      label: "Design & Creative",
    },
    {
      name: "category2_uid.5",
      value: "531770282584862722",
      label: "Engineering & Architecture",
    },
    {
      name: "category2_uid.6",
      value: "531770282580668419",
      label: "IT & Networking",
    },
    { name: "category2_uid.7", value: "531770282584862723", label: "Legal" },
    {
      name: "category2_uid.8",
      value: "531770282580668422",
      label: "Sales & Marketing",
    },
    {
      name: "category2_uid.9",
      value: "531770282584862720",
      label: "Translation",
    },
    {
      name: "category2_uid.10",
      value: "531770282580668418",
      label: "Web, Mobile & Software Dev",
    },
    {
      name: "category2_uid.11",
      value: "531770282580668423",
      label: "Writing",
    },
  ],
  isHourly: [
    {
      placeholder: "$ Min",
    },
    {
      placeholder: "$ Max",
    },
  ],
  isFixedPrice: [
    { name: "amount.0", value: "0-99", label: "Less than $100" },
    { name: "amount.1", value: "100-499", label: "$100 to $500" },
    { name: "amount.2", value: "500-999", label: "$500 - $1K" },
    { name: "amount.3", value: "1000-4999", label: "$1K - $5K" },
    { name: "amount.4", value: "5000-", label: "$5K+" },
  ],
};
