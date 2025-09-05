const ButtonGrid = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 default:grid-cols-1 gap-2">
      <button className="py-4 px-8 rounded-xl text-orange-600 border border-blue-500">
        Button 1
      </button>
      <button className="py-4 px-8 rounded-xl bg-orange-600 text-white">
        Button 2
      </button>
      <button className="py-4 px-8 rounded-xl bg-blue-500 text-white">
        Button 3
      </button>
      <button className="py-4 px-8 rounded-xl text-blue-500 border border-orange-600">
        Button 4
      </button>
    </div>
  );
};

export default ButtonGrid;