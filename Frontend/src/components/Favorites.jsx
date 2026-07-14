import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { get } from "../utils/httpClient";
function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    if (!user) return;

    const favorites = await get(`/Favorites/${user.id}`);
    setFavorites(favorites);
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  return (
    <div className="flex flex-col w-full">
      <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mx-15 my-20">
        <table class="w-full text-sm text-left rtl:text-right text-body">
          <thead class="text-[18px] text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" class="px-6 py-3 font-medium">
                نام هتل
              </th>
              <th scope="col" class="px-6 py-3 font-medium">
                شهر
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <tr class="text-[14px] bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {favorite.name}
                </th>
                <td class="px-6 py-4">{favorite.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Favorites;
