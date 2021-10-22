import { Button } from '@chakra-ui/button';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  Text,
  HStack,
  VStack,
  Box,
  Heading,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  ModalCloseButton,
  IconButton,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import router from 'next/router';
import { useUserConfig } from '../../context/UserConfig';
import { setCookie } from 'nookies';
type WikiType = {
  extract: string;
  description: string;
};

type UserConfig = {
  name: string;
  size: string;
};

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

export const InputComponent = () => {
  const [cidade, setCidade] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  /* const [userConfig, setUserConfig] = useState<UserConfig>({
    name: '',
    size: '',
  }); */
  const [userConfigName, setUserConfigName] = useState<string>('');
  const [userConfigSize, setUserConfigSize] = useState<string>('');
  const [userConfigEmail, setUserConfigEmail] = useState<string>('');
  const [sizeTittle, setSizeTittle] = useState<string>();
  const { userConfig, setUserConfig } = useUserConfig();

  const saveUserConfig = () => {
    setIsOpen(false);
    setCookie(null, 'email', `${userConfigEmail}`, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    setCookie(null, 'size', `${userConfigSize}`, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    setUserConfig({ name: userConfigName, size: userConfigSize });
  };

  /*  const buscaCidade = () => {
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=5a2f164bb6f65997c456f4e9b36dfccf&units=metric&lang=pt_br`,
      )
      .then(response => {
        const data = response.data as any;
        const main = data as ClimaType;
        setClima(main);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }; */

  /*  useEffect(() => {
    axios
      .get(`https://pt.wikipedia.org/api/rest_v1/page/summary/${clima?.name}`)
      .then(response => {
        const w = response.data as any;
        const wi = w as WikiType;
        setWiki(wi);
        console.log(wiki);
        setShowTempo(true);
      })
      .catch(erro => {
        console.log(erro);
      });
  }, [clima?.name]); */

  const goToRotaCidade = (ev: React.FormEvent<HTMLDivElement>) => {
    setLoading(true);
    ev.preventDefault();
    router.push(`/${cidade}`);
    setLoading(false);
  };

  useEffect(() => {
    if (userConfig?.size === 'sm') {
      setSizeTittle('30px');
    }
    if (userConfig?.size === 'md') {
      setSizeTittle('35px');
    }
    if (userConfig?.size === 'lg') {
      setSizeTittle('40px');
    }
  }, [userConfig?.size]);

  return (
    <>
      <IconButton
        aria-label="Icone de usuário"
        position="fixed"
        onClick={() => {
          setIsOpen(true);
        }}
        top="50px"
        right="50px"
        fontSize="30px"
        variant="ghost"
        icon={<CgProfile />}
      />

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton onClick={() => {}} />
          <ModalBody pb={6}>
            <FormControl onSubmit={() => console.log('olá')}>
              <FormLabel>Seu nome</FormLabel>
              <Input
                placeholder="Seu nome"
                onChange={ev => {
                  setUserConfigName(ev.target.value);
                }}
              />
              <FormLabel mt="12px">Seu email</FormLabel>
              <Input
                placeholder="Seu email"
                onChange={ev => {
                  setUserConfigEmail(ev.target.value);
                }}
              />

              <FormLabel mt={4}>Tamanho da tela</FormLabel>
              <RadioGroup value={userConfigSize} onChange={setUserConfigSize}>
                <HStack spacing="40px">
                  <Radio value="sm">SM</Radio>
                  <Radio value="md">MD</Radio>
                  <Radio value="lg">LG</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                saveUserConfig();
              }}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex direction="column" alignItems="center">
        <Heading mb="30px" color="#A6A6A6" fontSize={userConfig?.size ? sizeTittle : '35px'}>
          React Weather API
        </Heading>
        <VStack spacing={2} width="100%">
          <FormControl as="form" onSubmit={goToRotaCidade}>
            <Box width="100%" textAlign="center" marginBottom="0px" mb="7px">
              <Input
                value={cidade}
                placeholder="Sua cidade"
                textAlign="center"
                onChange={ev => setCidade(ev.target.value)}
              />
            </Box>
            <Button width="100%" type="submit" isLoading={loading ? true : false}>
              Buscar cidade
            </Button>
          </FormControl>
        </VStack>
        {/*  <Text>Olá: {userConfig.name}</Text>
        <Text>Tamanho: {userConfig.size}</Text> */}
      </Flex>
    </>
  );
};
