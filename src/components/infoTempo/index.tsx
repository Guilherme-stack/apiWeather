import { Flex, Box, Heading, Text } from '@chakra-ui/react';
import { Stack, HStack, VStack, Image, Link } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useUserConfig } from '../../context/UserConfig';
type ClimaType = {
  main: {
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: { description: string; icon: string }[];
  name: string;
  wind: {
    speed: number;
  };
};
type WikiType = {
  extract: string;
  description: string;
};

type InfoTempoProps = {
  dados: ClimaType | null;
  wikipedia: WikiType | null;
};

type SizePage = {
  sizeFont: string;
  sizeBlock: string;
  sizeImage: string;
  sizeIcons: string;
  sizeTitle: string;
};

export const InfoTempo = ({ dados, wikipedia }: InfoTempoProps) => {
  const [hora, setHora] = useState<string>();
  const [size, setSize] = useState<SizePage | null>(null);
  const { userConfig } = useUserConfig();
  useEffect(() => {
    setTimeout(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
  });

  const layoutSize = () => {
    switch (userConfig?.size) {
      case 'sm':
        setSize({
          sizeFont: '10px',
          sizeBlock: '350px',
          sizeImage: '70px',
          sizeIcons: '25px',
          sizeTitle: '30px',
        });
        break;
      case 'md':
        setSize({
          sizeFont: '15px',
          sizeBlock: '450px',
          sizeImage: '100px',
          sizeIcons: '30px',
          sizeTitle: '35px',
        });
        break;
      case 'lg':
        setSize({
          sizeFont: '20px',
          sizeBlock: '500px',
          sizeImage: '120px',
          sizeIcons: '50px',
          sizeTitle: '40px',
        });
        break;

      default:
        setSize({
          sizeFont: '15px',
          sizeBlock: '450px',
          sizeImage: '100px',
          sizeIcons: '30px',
          sizeTitle: '40px',
        });
        break;
    }
  };

  useEffect(() => {
    layoutSize();
  }, [userConfig?.size]);

  console.log(userConfig?.size);

  return (
    <>
      <Flex marginTop="30px" justifyContent="space-between" alignItems="center">
        <Flex direction="column" position="relative">
          <Box className="animation">
            <Image
              width={size?.sizeImage}
              src={`https://openweathermap.org/img/wn/${dados?.weather[0].icon}@2x.png`}
              alt=""
            />
          </Box>

          <Heading as="h4" ml="30px" mt="-15px">
            {dados?.main?.temp.toFixed(0)}°
          </Heading>
        </Flex>

        <Flex direction="column" alignItems="end">
          <Box display="flex" alignItems="center">
            <Text fontWeight="700" fontSize={size?.sizeFont}>
              {dados?.weather[0].description[0].toUpperCase()}
              {dados?.weather[0].description.substr(1)}{' '}
            </Text>
            <Image
              width={size?.sizeIcons}
              src={`https://openweathermap.org/img/wn/${dados?.weather[0].icon}@2x.png`}
              alt=""
            />
          </Box>

          <Box display="flex" alignItems="center">
            <Text fontWeight="700" fontSize={size?.sizeFont}>
              Humidade {dados?.main.humidity}%
            </Text>
            <Image
              width={size?.sizeIcons}
              ml="5px"
              src="https://cdn-icons-png.flaticon.com/512/578/578135.png"
              mr="9px"
              alt=""
            />
          </Box>
          <Box display="flex" alignItems="center" mt="10px">
            <Text fontWeight="700" fontSize={size?.sizeFont}>
              Ventos a {dados?.wind.speed} Km/h
            </Text>
            <Image
              width={size?.sizeIcons}
              ml="5px"
              src="https://cdn-icons-png.flaticon.com/512/615/615486.png"
              mr="9px"
              alt=""
            />
          </Box>
          <Box display="flex" alignItems="center" marginTop="10px">
            <Text fontWeight="700" fontSize={size?.sizeFont}>
              {hora}
            </Text>
            <Image
              width={size?.sizeIcons}
              marginRight="9px"
              ml="7px"
              src="https://cdn-user-icons.flaticon.com/23382/23382987/1634416404123.svg?token=exp=1634417309~hmac=f505babe80ac935dae13780f6e50f90d"
              alt=""
            />
          </Box>
        </Flex>
      </Flex>
      {wikipedia?.extract && (
        <Flex direction="column" marginTop="25px">
          <Box display="flex" alignItems="center" mb="15px">
            <Image
              alt=""
              width={size?.sizeIcons}
              mr="7px"
              ml="5px"
              src="https://cdn-icons.flaticon.com/png/512/2204/premium/2204030.png?token=exp=1634416413~hmac=14566d7e299a187c9fac00471aa3a7a5"
            />
            <Text fontWeight="700" fontSize={size?.sizeFont} textAlign="center">
              {dados?.name}{' '}
            </Text>
          </Box>
          <Text fontSize={size?.sizeFont}>
            {wikipedia?.extract ? wikipedia?.extract.substr(0, 100) : wikipedia?.description}... <br />
            <Link href={`https://pt.wikipedia.org/wiki/${dados?.name}`} isExternal color="#15616D">
              descubra mais sobre {dados?.name}
            </Link>
          </Text>
        </Flex>
      )}
    </>
  );
};
