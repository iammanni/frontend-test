/* This example requires Tailwind CSS v2.0+ */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Example() {
  const { data: session } = useSession();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    getCarsData();
  }, []);

  const getCarsData = () => {
    axios
      .get("http://3.109.133.121:8000/app/car/?format=json")
      .then(({ data }) => {
        setCars(data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  if (session) {
    return (
      <>
        <div className="my-10 text-center">
          <p className="text-lg">
            Signed in as <span className="font-bold">{session.user.name}</span>
          </p>
        </div>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {cars
            .filter((car) => car.engine.maker == "BMW")
            .map((car) => (
              <li
                key={car.id}
                className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">
                        {car.car_name + " (" + car.engine.maker + ")"}
                      </h3>
                      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                        {car.engine.displacement}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">
                      {"Price: " + car.price.price}
                    </p>
                  </div>
                  <a
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full"
                    href={`/view/${car.key?.id}`}
                  >
                    View
                  </a>
                </div>
              </li>
            ))}
        </ul>
        <div className="mt-5 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="mt-10 text-center">
      <p className="text-lg font-bold">Not signed in</p>
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
