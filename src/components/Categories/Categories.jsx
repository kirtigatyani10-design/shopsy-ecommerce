import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
      {categories.map(cat => (
        <div
          key={cat._id}
          onClick={() => navigate(`/categories/${cat.slug}`)}
          className={`p-4 rounded-lg shadow-md cursor-pointer ${cat.color}`}
        >
          <img src={cat.image} className="w-full rounded-lg" />
          <h3 className="font-bold mt-2">{cat.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Categories;