const SummaryCard = ({ title, amount, icon, colorClass }) => {
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {formattedAmount}
          </p>
        </div>
        <div className={`p-3 rounded-full ${colorClass}`}>{icon}</div>
      </div>
    </Card>
  );
};
