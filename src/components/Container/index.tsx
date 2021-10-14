import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { InfoTempo } from '../infoTempo'
import { InputComponent } from '../InputComponent'


export const Container = () => {
    return (
        <>
            <Flex direction="column"  >
                <InputComponent />
                <InfoTempo />
            </Flex>
        </>
    )
}