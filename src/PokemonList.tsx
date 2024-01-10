import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<{ name: string, url: string}[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6">Pokémon List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2">Name</th>
            <th className="py-2">Type</th>
            <th className="py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index} className={(index % 2 === 0) ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-2">{pokemon.name}</td>
              <td className="py-2">Fetching types...</td>
              <td className="py-2">
                <Link to={`/pokemon/${pokemon.name}`} className="text-blue-500 hover:underline">
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
