export const Button = ({ label = "", ...props }) => {
  let color = props.type === "submit" ? "bg-green-400" : "bg-gray-300";
  let textColor = props.type === "submit" ? "text-white" : "text-black";
  return (
    <button
      className={`${color} ${textColor} px-3 py-2 text-xs font-medium text-center  rounded-lg  focus:ring-4 focus:outline-none`}
      {...props}
    >
      {label}
    </button>
  );
};
