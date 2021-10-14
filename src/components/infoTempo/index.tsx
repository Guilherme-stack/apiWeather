import { Flex, Box, Heading, Text } from '@chakra-ui/react'
import { Stack, HStack, VStack,Image  } from "@chakra-ui/react"
import React from 'react'
import temp from "../../../temp.json"
export const InfoTempo = () => {
    console.log(temp)
    return (
        <>
            <Box marginTop="30px">

                <VStack >
                    <Image width="50px" src="https://cdn-icons.flaticon.com/png/512/1888/premium/1888282.png?token=exp=1634242877~hmac=7319e5ce451e758546addcae0dead169" alt="" />
                    <Heading as="h4" textAlign="center">
                        {temp.main.temp}°
                    </Heading>
                    <Text fontWeight="700" textAlign="center">{temp.name}</Text>
                </VStack>

            </Box>

            <Flex justifyContent="space-between" marginBottom="20px" width="400px" marginTop="20px">
                <Box display="flex">
                    <Image width="30px" src="https://cdn-icons-png.flaticon.com/512/4015/4015433.png" alt="" />
                    <Text fontWeight="700" fontSize="20px">Humidade: {temp.main.humidity}%</Text>
                </Box>
                <Box display="flex">
                    
                    <Text fontWeight="700" fontSize="20px">{temp.weather[0].description}</Text>
                    <Image width="30px" src="https://cdn-icons.flaticon.com/png/512/3653/premium/3653255.png?token=exp=1634244023~hmac=dcaa064c299e2a9ae1cf246c2d4151c7" alt="" />
                </Box>
            </Flex>
            <Flex justifyContent="space-between">
                <Box display="flex">
                <Image width="30px" marginRight="5px" src="https://cdn-icons-png.flaticon.com/512/2426/2426702.png" alt="" />
                    <Text fontWeight="700" fontSize="20px">Máxima: {temp.main.temp_max}</Text>
                   
                </Box>
                <Box display="flex">
                    
                    <Text fontWeight="700" fontSize="20px">
                        Mínima: {temp.main.temp_min}
                    </Text>
                    <Image width="30px" src="https://cdn-icons-png.flaticon.com/512/2426/2426702.png" alt="" />
                </Box>
            </Flex>

        </>
    )
}