import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import router from 'next/router';
import { Flex, Heading } from '@chakra-ui/layout';
import { InfoTempo } from '../../src/components/infoTempo';
import { Button, Icon, Text } from '@chakra-ui/react';
import { useUserConfig } from '../../src/context/UserConfig';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { parseCookies, destroyCookie } from 'nookies';

import axios from 'axios';

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
type CookieType = {
  email: string;
};
type SizePage = {
  sizeBlock: string;

  sizeTitle: string;
};

export default function City() {
  const [showTempo, setShowTempo] = useState<boolean>(false);
  const [clima, setClima] = useState<ClimaType | null>(null);
  const [sizeBlock, setSizeBlock] = useState<SizePage | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [wiki, setWiki] = useState<WikiType | null>(null);
  const [cookie, setCookie] = useState<any>(null);

  const router = useRouter();

  const { userConfig, setUserConfig } = useUserConfig();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${router.query.cities}&appid=5a2f164bb6f65997c456f4e9b36dfccf&units=metric&lang=pt_br`,
      )
      .then(response => {
        const data = response.data as any;
        const main = data as ClimaType;
        setClima(main);
        setLoading(false);
        // console.log(clima);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [router.query.cities]);
  useEffect(() => {
    axios
      .get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${router.query.cities}`)
      .then(response => {
        const w = response.data as any;
        const wi = w as WikiType;
        setWiki(wi);
        // console.log(wiki);
        setShowTempo(true);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, [router.query.cities]);

  const goToBack = () => {
    router.push('/');
  };

  useEffect(() => {
    setCookie(parseCookies().email);
  }, [cookie]);

  const logOut = () => {
    destroyCookie(null, 'email');
    setUserConfig({ ...userConfig, size: '' });
    router.push('/');
  };

  useEffect(() => {
    if (userConfig?.size === 'sm') {
      setSizeBlock({
        sizeBlock: '400px',
        sizeTitle: '30px',
      });
    }
    if (userConfig?.size === 'md') {
      setSizeBlock({
        sizeBlock: '450px',
        sizeTitle: '35px',
      });
    }
    if (userConfig?.size === 'lg') {
      setSizeBlock({
        sizeBlock: '500px',
        sizeTitle: '40px',
      });
    }
  }, [userConfig?.size]);

  /*   switch (userConfig?.size) {
    case 'sm':
      setSize({});
      break;
    case 'md':
      setSize(userConfig.size);
      break;
    default:
      break;
  } */

  console.log(userConfig?.size);
  return (
    <>
      {cookie && (
        <Text position="fixed" right="50px" top="30px">
          Olá,{' '}
          <Text d="inline" fontWeight="700" mr="10px">
            {cookie}
          </Text>
          <Button onClick={() => logOut()}>Sair</Button>
        </Text>
      )}
      <Flex
        padding="35px 40px 30px 40px"
        width={userConfig?.size ? sizeBlock?.sizeBlock : '450px'}
        boxShadow="2px 2px 10px #6c6c6c59"
        borderRadius="15px"
        direction="column"
        margin="100px auto"
      >
        <ArrowBackIcon mb="20px" fontSize="20px" cursor="pointer" color="#A6A6A6" onClick={() => goToBack()} />

        <Heading
          textAlign="center"
          fontSize={userConfig?.size ? sizeBlock?.sizeTitle : '35px'}
          mb="30px"
          color="#48484a"
          margin="0px !important"
        >
          React Weather API
        </Heading>
        <InfoTempo dados={clima} wikipedia={wiki} />
      </Flex>
    </>
  );
}
