import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const HandleCarList = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    id: "",
    plate: "",
    manufacture: "",
    model: "",
    image: "",
    rentPerDay: 0,
    capacity: 0,
    description: "",
    availableAt: "",
    transmission: "",
    available: false,
    type: "",
    year: 0,
    options: [],
    specs: []
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("http://localhost:8000/cars");
      const data = await res.json();
      setCars(data);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("fetch aborted.");
      }
    }
  };

  const createCar = async () => {
    try {
      const carWithId = { ...newCar, id: uuidv4() };
      await fetch("http://localhost:8000/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(carWithId)
      });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCar = async (id) => {
    try {
      await fetch(`http://localhost:8000/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCar)
      });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCar = async (id) => {
    try {
      await fetch(`http://localhost:8000/cars/${id}`, {
        method: "DELETE"
      });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleEdit = (car) => {
    setNewCar(car);
    setIsEditing(true);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isEditing) {
            updateCar(newCar.id);
          } else {
            createCar();
          }
          setNewCar({
            id: "",
            plate: "",
            manufacture: "",
            model: "",
            image: "",
            rentPerDay: 0,
            capacity: 0,
            description: "",
            availableAt: "",
            transmission: "",
            available: false,
            type: "",
            year: 0,
            options: [],
            specs: []
          });
          setIsEditing(false);
        }}
      >
        <input type="text" name="plate" value={newCar.plate} onChange={handleChange} placeholder="Plate" /><br />
        <input type="text" name="manufacture" value={newCar.manufacture} onChange={handleChange} placeholder="Manufacture" /><br />
        <input type="text" name="model" value={newCar.model} onChange={handleChange} placeholder="Model" /><br />
        <input type="text" name="image" value={newCar.image} onChange={handleChange} placeholder="Image URL" /><br />
        <input type="number" name="rentPerDay" value={newCar.rentPerDay} onChange={handleChange} placeholder="Rent per Day" /><br />
        <input type="number" name="capacity" value={newCar.capacity} onChange={handleChange} placeholder="Capacity" /><br />
        <textarea name="description" value={newCar.description} onChange={handleChange} placeholder="Description"></textarea><br />
        <input type="datetime-local" name="availableAt" value={newCar.availableAt} onChange={handleChange} placeholder="Available At" /><br />
        <input type="text" name="transmission" value={newCar.transmission} onChange={handleChange} placeholder="Transmission" /><br />
        <label>Available</label>
        <input type="checkbox" name="available" checked={newCar.available} onChange={() => setNewCar((prevCar) => ({ ...prevCar, available: !prevCar.available }))} /><br />
        
        <input type="text" name="type" value={newCar.type} onChange={handleChange} placeholder="Type" /><br />
        <input type="number" name="year" value={newCar.year} onChange={handleChange} placeholder="Year" /><br /><br />
        <button type="submit">{isEditing ? "Update Car" : "Create Car"}</button>
      </form>

      <ul id="car-list">
        {cars.map((car) => (
          <div key={car.id}>
            <img src={car.image} alt={car.model} />
            <h1>Manufacture: {car.manufacture}</h1>
            <h1>Model: {car.model}</h1>
            <h1>Rent Per Day: {car.rentPerDay}</h1>
            <h1>Capacity: {car.capacity}</h1>
            <h1>Available At: {car.availableAt}</h1>
            <button onClick={() => handleEdit(car)}>Edit</button>
            <button onClick={() => deleteCar(car.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HandleCarList;
