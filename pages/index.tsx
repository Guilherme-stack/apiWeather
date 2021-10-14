import { Flex } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Container } from '../src/components/Container'
 
const Home: NextPage = () => {
  
  return (
    <div >
      <Flex justifyContent="center" height="80vh" alignItems="center">
        <Container />
      </Flex>
    </div>
  )
}

export default Home
