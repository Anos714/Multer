import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts";

export default function App() {
  // --- Helper Components (defined inside App) ---
  const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );

  const PlusIcon = () => <Icon path="M12 4.5v15m7.5-7.5h-15" />;
  const ArrowUpIcon = () => (
    <Icon path="m4.5 15.75 7.5-7.5 7.5 7.5" className="w-5 h-5" />
  );
  const ArrowDownIcon = () => (
    <Icon path="m19.5 8.25-7.5 7.5-7.5-7.5" className="w-5 h-5" />
  );
  const TrashIcon = () => (
    <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  );
  const ListIcon = () => (
    <Icon path="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  );
  const CalculatorIcon = () => (
    <Icon path="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm3-6h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008ZM6 18V7.5a2.25 2.25 0 0 1 2.25-2.25h3.75a2.25 2.25 0 0 1 2.25 2.25V18M6 18h12a2.25 2.25 0 0 0 2.25-2.25V7.5A2.25 2.25 0 0 0 18 5.25h-3.75m-7.5 0h-3.75A2.25 2.25 0 0 0 3 7.5V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V7.5a2.25 2.25 0 0 0-2.25-2.25H15M12 18h3" />
  );
  const TrophyIcon = () => (
    <Icon path="M16.5 18.75h-9a9.75 9.75 0 0 1-9-9.75V7.5a2.25 2.25 0 0 1 2.25-2.25h3.75a2.25 2.25 0 0 1 2.25 2.25v1.5m0-1.5V6.375c0-1.036.84-1.875 1.875-1.875h1.5c1.036 0 1.875.84 1.875 1.875v1.125m-1.5 0v1.5m0-1.5a2.25 2.25 0 0 1 2.25 2.25h3.75a2.25 2.25 0 0 1 2.25-2.25V7.5a9.75 9.75 0 0 1-9 9.75h-9Z" />
  );
  const StarIcon = () => (
    <Icon path="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  );
  const ChartPieIcon = () => (
    <Icon path="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
  );
  const ClipboardDocumentListIcon = () => (
    <Icon path="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25v8.25A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25h6a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25Z" />
  );
  const SunIcon = () => (
    <Icon path="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  );
  const MoonIcon = () => (
    <Icon path="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  );

  // --- Main UI Components (defined inside App) ---
  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-6 ${className}`}
    >
      {children}
    </div>
  );

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

  const StatCard = ({ title, value, icon }) => (
    <Card className="flex items-center p-4">
      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-300 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-lg font-bold text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
    </Card>
  );

  const TransactionForm = ({ onAddTransaction }) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("Food");
    const [error, setError] = useState("");

    const expenseCategories = [
      "Food",
      "Transport",
      "Shopping",
      "Bills",
      "Entertainment",
      "Health",
      "Other",
    ];
    const incomeCategories = ["Salary", "Bonus", "Investment", "Gift", "Other"];

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!text || !amount) {
        setError("Please enter a description and amount.");
        return;
      }
      if (parseFloat(amount) <= 0) {
        setError("Amount must be positive.");
        return;
      }

      const newTransaction = {
        id: crypto.randomUUID(),
        text,
        amount: parseFloat(amount),
        type,
        category,
        date: new Date().toISOString(),
      };
      onAddTransaction(newTransaction);
      setText("");
      setAmount("");
      setError("");
    };

    const categories =
      type === "expense" ? expenseCategories : incomeCategories;

    return (
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Add Transaction
        </h2>
        {error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-2 rounded-lg mb-4 text-sm">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form inputs */}
          <div>
            <label
              htmlFor="text"
              className="text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Description
            </label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., Coffee"
              className="w-full mt-1 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Amount (₹)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 150"
              className="w-full mt-1 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="type"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setCategory(e.target.value === "expense" ? "Food" : "Salary");
                }}
                className="w-full mt-1 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-transform transform hover:scale-105"
          >
            <PlusIcon />
            <span className="ml-2">Add Transaction</span>
          </button>
        </form>
      </Card>
    );
  };

  const TransactionList = ({ transactions, onDeleteTransaction }) => (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Recent History
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No transactions yet.
          </p>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-shadow hover:shadow-md"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-full ${
                    t.type === "income"
                      ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300"
                  }`}
                >
                  {t.type === "income" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                </div>
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-200">
                    {t.text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.category} &bull; {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p
                  className={`font-bold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹
                  {t.amount.toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => onDeleteTransaction(t.id)}
                  className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
                  aria-label="Delete transaction"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );

  // --- Charting Components (defined inside App) ---
  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
  ];

  const ExpensePieChart = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_, index) => setActiveIndex(index);

    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? "start" : "end";

      return (
        <g>
          <text
            x={cx}
            y={cy}
            dy={8}
            textAnchor="middle"
            fill={fill}
            className="font-bold text-lg dark:fill-white"
          >
            {payload.name}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
            className="dark:fill-gray-300"
          >{`₹${value.toLocaleString("en-IN")}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
            className="dark:fill-gray-500"
          >{`( ${(percent * 100).toFixed(2)}% )`}</text>
        </g>
      );
    };

    const chartData = useMemo(() => {
      const categoryTotals = data
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        }, {});
      return Object.entries(categoryTotals)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    }, [data]);

    if (chartData.length === 0)
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">
            Add some expenses to see the chart.
          </p>
        </div>
      );

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const IncomeExpenseBarChart = ({ data }) => {
    const chartData = useMemo(() => {
      const monthlyData = data.reduce((acc, t) => {
        const month = new Date(t.date).toLocaleString("default", {
          month: "short",
          year: "2-digit",
        });
        if (!acc[month]) acc[month] = { name: month, income: 0, expense: 0 };
        if (t.type === "income") acc[month].income += t.amount;
        else acc[month].expense += t.amount;
        return acc;
      }, {});
      return Object.values(monthlyData).reverse();
    }, [data]);

    if (chartData.length === 0)
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">
            No data for the bar chart yet.
          </p>
        </div>
      );

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis
            stroke="#9ca3af"
            tickFormatter={(value) => `₹${value / 1000}k`}
          />
          <Tooltip
            cursor={{ fill: "rgba(100,100,100,0.1)" }}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
            }}
            formatter={(value, name) => [
              `₹${value.toLocaleString("en-IN")}`,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />
          <Legend />
          <Bar
            dataKey="income"
            fill="#82ca9d"
            name="Income"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="#ff8042"
            name="Expense"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // --- To-Do List Components (defined inside App) ---
  const TodoList = ({ todos, onAddTodo, onDeleteTodo, onToggleTodo }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!text.trim()) return;
      onAddTodo({ id: crypto.randomUUID(), text, completed: false });
      setText("");
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Add a Task
            </h2>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="e.g., Pay electricity bill"
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <button
                type="submit"
                className="p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-transform transform hover:scale-105"
                aria-label="Add Task"
              >
                <PlusIcon />
              </button>
            </form>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Your Tasks
            </h2>
            <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-2">
              {todos.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  You have no tasks. Add one!
                </p>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-shadow hover:shadow-md"
                  >
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggleTodo(todo.id)}
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span
                        className={`font-medium text-gray-700 dark:text-gray-200 transition-all ${
                          todo.completed
                            ? "line-through text-gray-400 dark:text-gray-500"
                            : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                    </label>
                    <button
                      onClick={() => onDeleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
                      aria-label="Delete task"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  // --- Theme Toggle Component ---
  const ThemeToggle = ({ theme, onToggle }) => (
    <button
      onClick={onToggle}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );

  // --- Dashboard View Components (defined inside App) ---
  const ExpenseTrackerDashboard = ({
    income,
    expense,
    balance,
    transactionCount,
    averageExpense,
    highestExpense,
    topCategory,
    transactions,
    onAddTransaction,
    onDeleteTransaction,
  }) => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard
          title="Total Income"
          amount={income}
          icon={<ArrowUpIcon />}
          colorClass="bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300"
        />
        <SummaryCard
          title="Total Expense"
          amount={expense}
          icon={<ArrowDownIcon />}
          colorClass="bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300"
        />
        <Card className="flex flex-col justify-center items-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Current Balance
          </p>
          <p
            className={`text-3xl font-bold ${
              balance >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(balance)}
          </p>
        </Card>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Transactions"
          value={transactionCount}
          icon={<ListIcon />}
        />
        <StatCard
          title="Average Expense"
          value={new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(averageExpense)}
          icon={<CalculatorIcon />}
        />
        <StatCard
          title="Highest Expense"
          value={new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(highestExpense)}
          icon={<TrophyIcon />}
        />
        <StatCard
          title="Top Category"
          value={topCategory}
          icon={<StarIcon />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <TransactionForm onAddTransaction={onAddTransaction} />
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={onDeleteTransaction}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Expense Breakdown
          </h2>
          <ExpensePieChart data={transactions} />
        </Card>
        <Card>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Monthly Overview
          </h2>
          <IncomeExpenseBarChart data={transactions} />
        </Card>
      </div>
    </>
  );

  // --- App State and Logic ---
  const [activeView, setActiveView] = useState("tracker");

  // Theme state
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const [transactions, setTransactions] = useState(() =>
    JSON.parse(localStorage.getItem("transactions") || "[]")
  );
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTransaction = (transaction) =>
    setTransactions([transaction, ...transactions]);
  const deleteTransaction = (id) =>
    setTransactions(transactions.filter((t) => t.id !== id));
  const addTodo = (todo) => setTodos([todo, ...todos]);
  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const {
    income,
    expense,
    balance,
    transactionCount,
    averageExpense,
    highestExpense,
    topCategory,
  } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense"
    );
    const expense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    const categoryTotals = expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return {
      income,
      expense,
      balance: income - expense,
      transactionCount: transactions.length,
      averageExpense:
        expenseTransactions.length > 0
          ? expense / expenseTransactions.length
          : 0,
      highestExpense:
        expenseTransactions.length > 0
          ? Math.max(...expenseTransactions.map((t) => t.amount))
          : 0,
      topCategory:
        Object.keys(categoryTotals).length > 0
          ? Object.entries(categoryTotals).reduce((a, b) =>
              a[1] > b[1] ? a : b
            )[0]
          : "N/A",
    };
  }, [transactions]);

  const NavButton = ({ view, label, icon }) => (
    <button
      onClick={() => setActiveView(view)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition ${
        activeView === view
          ? "bg-indigo-600 text-white shadow-md"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  // --- App Render ---
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans">
      <header className="bg-white dark:bg-gray-800/50 shadow-md sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            Multer - A Multitasking App
          </h1>
          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-2 sm:space-x-4 p-1 bg-gray-100 dark:bg-gray-900/50 rounded-xl">
              <NavButton
                view="tracker"
                label="Tracker"
                icon={<ChartPieIcon />}
              />
              <NavButton
                view="todo"
                label="To-Do"
                icon={<ClipboardDocumentListIcon />}
              />
            </nav>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:px-8">
        {activeView === "tracker" ? (
          <ExpenseTrackerDashboard
            income={income}
            expense={expense}
            balance={balance}
            transactionCount={transactionCount}
            averageExpense={averageExpense}
            highestExpense={highestExpense}
            topCategory={topCategory}
            transactions={transactions}
            onAddTransaction={addTransaction}
            onDeleteTransaction={deleteTransaction}
          />
        ) : (
          <TodoList
            todos={todos}
            onAddTodo={addTodo}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
          />
        )}
      </main>
    </div>
  );
}
