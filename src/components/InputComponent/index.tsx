import { Button } from "@chakra-ui/button";
import { Flex, Input, Text, VStack, Box,Heading } from "@chakra-ui/react"
 
import React from "react";

export const InputComponent = () => {
    return (
        <>
            <Flex direction="column" alignItems="center" >
                <VStack spacing={4}>
                    <Heading>React Weather API</Heading>
                    <Box width="100%" textAlign="center">
                        <Text fontWeight="700" fontSize="20px">Sua cidade:</Text>
                        <Input />
                    </Box>
                    <Button width="100%">Buscar cidade</Button>
                </VStack>
            </Flex>
        </>
    )
}