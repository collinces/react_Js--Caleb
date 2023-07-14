import EditEmployee from "./EditEmployee";

// the employee function template was taken from https://tailwindcss.com/docs/utility-first and has been modify to suit our need

function Employee(props) {
  return (
    <div className="py-8 px-8 max-w-sm mx-auto my-4 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
      <img
        className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={props.img}
        alt=" Face"
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{props.name}</p>
          <p className="text-slate-500 font-medium">{props.role}</p>
        </div>

        {props.editEmployee}
      </div>
    </div>
  );
}

export default Employee;
