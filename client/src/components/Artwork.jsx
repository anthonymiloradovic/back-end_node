import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Image, Badge } from '@chakra-ui/react';


const Artwork = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/artworks');
      setArtworks(result.data);
    };
    fetchData();
  }, []);

  return (
    <Box>
      {artworks.map((artwork) => (
        <Box
          key={artwork._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="4"
          mb="4"
        >
          <Image
            src={artwork.image}
            alt="Artwork"
            mb="4"
            className="artwork-image" // Ajout de la classe CSS
          />
          <Text fontSize="xl" fontWeight="bold">
            {artwork.title}
          </Text>
          <Text mb="2">{artwork.artist}</Text>
          <Text mb="2">{artwork.content}</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Badge colorScheme="green" mb="2">
              {artwork.price} €
            </Badge>
            <Text fontSize="sm" color="gray.500">
              {artwork.category}
            </Text>
          </Flex>
        </Box>
      ))}
    </Box>
  );
};

export default Artwork;
