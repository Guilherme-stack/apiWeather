import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { InfoTempo } from '../infoTempo';
import { InputComponent } from '../InputComponent';
import { useUserConfig } from '../../context/UserConfig';
export const Container = () => {
  const { userConfig } = useUserConfig();
  const [sizeBlock, setSizeBlock] = useState<string>();

  useEffect(() => {
    if (userConfig?.size === 'sm') {
      setSizeBlock('400px');
    }
    if (userConfig?.size === 'md') {
      setSizeBlock('450px');
    }
    if (userConfig?.size === 'lg') {
      setSizeBlock('500px');
    }
  }, [userConfig?.size]);
  console.log(userConfig?.size);
  return (
    <>
      <Flex
        direction="column"
        padding="55px 40px 30px 40px"
        width={userConfig?.size ? sizeBlock : '450px'}
        boxShadow="2px 2px 10px #6c6c6c59"
        borderRadius="15px"
      >
        <InputComponent />
      </Flex>
    </>
  );
};
